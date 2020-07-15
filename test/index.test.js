const babel = require('@babel/core');
const vueSetupReturn = require('../lib');

it('example1', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup () {
        const __RE__name = ref('名字')
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example2', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup: function () {
        const __RE__name = ref('名字')
        
        return {
          __RE__name
        }
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example3', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup () {
        const __RE__name = ref('名字')
        
        return {
          name
        }
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example4', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup () {
        const __RE__name = ref('名字')
        
        return {}
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example5', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup () {
        const __RE__name = ref('名字')
        
        return
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example6', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      setup () {
        const __RE__name = ref('名字')
        
        return () => <div>{ __RE__name }</div>
      }
    }
  `;
  const { code } = babel.transform(example, {
    plugins: [
      '@babel/plugin-syntax-jsx',
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example7', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    
    export default {
      name: 'myComponent',
      filters: {
        setup (__RE__name) {
          console.log(__RE__name)
        }
      },
      setup () {
        const __RE__name = ref('0')
        const __RE__push = computed(() => __RE__name.value)
        const __RE__add = function() {
          __RE__name.value += 1
        }
        return function () {
          h('div', null, push)
        }
      }
    }
  `;
  const { code } = babel.transform(example, {
    filename: 'index.js',
    presets: [
      '@vue/app'
    ],
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example8', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    const options = {
      name: 'myComponent',
      filters: {
        setup (__RE__name) {
          console.log(__RE__name)
        }
      },
      setup () {
        const __RE__name = ref('名字')
        const __RE__push = computed(() => __RE__name.value)
      }
    }
    export default options
  `;
  const { code } = babel.transform(example, {
    plugins: [
      vueSetupReturn
    ]
  })
  expect(code).toMatchSnapshot();
});

it('example8', function() {
  var example = `
    import {ref} from '@vue/composition-api'
    const options = {
      name: 'myComponent',
      filters: {
        setup (_$$_name) {
          console.log(_$$_name)
        }
      },
      setup () {
        const _$$_name = ref('名字')
        const _$$_push = computed(() => _$$_name.value)
      }
    }
    export default options
  `;
  const { code } = babel.transform(example, {
    plugins: [
      [vueSetupReturn, {
        prefix: '_$$_'
      }]
    ]
  })
  expect(code).toMatchSnapshot();
});
