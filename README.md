# babel-plugin-vue-setup-return

###### Babel plugin for Vue composition api

Automatic return statement injection through variable prefix for vue composition api setup

**!!!note: When the function name is setup, all the matching inside the function will be converted**

## Usage

```shell script
npm install babel-plugin-vue-setup-return --save-dev

yarn add babel-plugin-vue-setup-return --dev
```

In your babel.config.js:
``` javascript
plugins: [
  [
    'vue-setup-return', {
      prefix: '_RE_'  // prefix defult __RE__
    }
  ]
]
```

## example

Refer to this project test folder: index.test.js
