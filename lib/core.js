module.exports = function core(prefix) {
  return ({ types: t }) => {
    let prefixString = null

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
        },
        BlockStatement(path) {
          const parentNode = path.parent;
          if (t.isObjectMethod(parentNode)) {
            const key = parentNode.key
            if (!t.isIdentifier(key, {name: 'setup'})) {
              return
            }
          } else if (t.isFunctionExpression(parentNode)) {
            const key = path.parentPath.parent.key
            if (!t.isIdentifier(key, {name: 'setup'})) {
              return
            }
          } else {
            return
          }

          const newReturnBody = new Set();
          path.traverse({
            VariableDeclarator(varPath) {
              const name = varPath.get('id.name').node;
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