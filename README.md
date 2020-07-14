# @babel/plugin-vue-setup-return

###### Babel plugin for Vue composition api

Automatic return statement injection through variable prefix for vue composition api setup

## Usage

```shell script
npm install @babel/plugin-vue-setup-return --save-dev

yarn @babel/plugin-vue-setup-return -dev
```

In your babel.config.js:
``` javascript
plugins: [
  [
    vueSetupReturn, {
      prefix: '_$$_'  // variable prefix, default: __RE__
    }
  ]
]
```

## example

Refer to this project test folder: index.test.js
