export default function (prefix) {
  return ({ types: t }) => {
    let prefixString = null
    let exportDefaultName = ''

    function getNewName(name) {
      return name.replace(prefixString, "")
    }

    function checkName(name) {
      return name.indexOf(prefixString) === 0
    }

    function createNewReturn (newReturnBody, path) {
      const properties = []
      for (const key of newReturnBody.values()) {
        properties.push(t.objectProperty(t.identifier(key), t.identifier(key)))
      }
      path.pushContainer("body", t.returnStatement(t.objectExpression(properties)));
    }

    return {
      visitor: {
        Program (path, state) {
          prefixString = state.opts.prefix || prefix
          path.traverse({
            ExportDefaultDeclaration (_path) {
              exportDefaultName = _path.get('declaration.name').node
            }
          })
        },
        BlockStatement(path) {
          const rootNode = path.parentPath.parentPath.parent
          const rootNodeName = rootNode.id && rootNode.id.name
          if (!t.isExportDefaultDeclaration(rootNode) && rootNodeName !== exportDefaultName) {
            return
          }
          const parentNode = path.parent;
          if (parentNode.type !== "ObjectMethod" || parentNode.key.name !== "setup") {
            return;
          }
          const newReturnBody = new Set();
          path.traverse({
            VariableDeclarator(innerPath) {
              const name = innerPath.get('id.name').node;
              if (!checkName(name)) {
                return;
              }
              newReturnBody.add(getNewName(name));
            },
            Identifier(identifierPath) {
              const name = identifierPath.get("name").node;
              if (!checkName(name)) {
                return;
              }
              identifierPath.node.name = getNewName(name);
            }
          });
          const body = path.get("body");
          const lastNode = body[body.length - 1];
          if (!t.isReturnStatement(lastNode) || lastNode.get("argument").node === null) {
            if (lastNode.get("argument").node === null) {
              lastNode.remove()
            }
            createNewReturn(newReturnBody, path);
            return
          }
          const argumentType = lastNode.get("argument.type").node
          if (argumentType === 'ObjectExpression') {
            lastNode.get("argument").traverse({
              ObjectProperty(proPath) {
                const name = proPath.get("key.name").node
                if (!checkName(name)) {
                  newReturnBody.add(name);
                  return
                }
                newReturnBody.add(getNewName(name));
              }
            });
            lastNode.remove()
            createNewReturn(newReturnBody, path)
          }
        }
      }
    }
  }
}