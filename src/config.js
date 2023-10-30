window.config = {
  transpiler: 'plugin-babel',
  meta: {
    '*.vue': {
      loader: 'vue-loader',
    },
    '*.ts': {
      loader: 'demo-ts-loader',
    },
    '*.svg': {
      loader: 'svg-loader',
    },
    'devextreme/localization.js': {
      'esModule': true,
    },
  },
  paths: {
    'root:': '',
    'npm:': 'https://unpkg.com/',
  },
  map: {
    'vue': 'npm:vue@3.3.4/dist/vue.esm-browser.js',
    'vue-loader': 'npm:dx-systemjs-vue-browser@1.1.1/index.js',
    'demo-ts-loader': 'root:utils/demo-ts-loader.js',
    'svg-loader': 'root:utils/svg-loader.js',
    'mitt': 'npm:mitt/dist/mitt.umd.js',
    'rrule': 'npm:rrule@2.6.4/dist/es5/rrule.js',
    'luxon': 'npm:luxon@1.28.1/build/global/luxon.min.js',
    'es6-object-assign': 'npm:es6-object-assign@1.1.0',
    'devextreme': 'npm:devextreme@23.1.5/cjs',
    'devextreme-vue': 'npm:devextreme-vue@23.1.5',
    'jszip': 'npm:jszip@3.7.1/dist/jszip.min.js',
    'devextreme-quill': 'npm:devextreme-quill@1.6.2/dist/dx-quill.min.js',
    'devexpress-diagram': 'npm:devexpress-diagram@2.2.1/dist/dx-diagram.js',
    'devexpress-gantt': 'npm:devexpress-gantt@4.1.48/dist/dx-gantt.js',
    '@devextreme/runtime': 'npm:@devextreme/runtime@3.0.11',
    'inferno': 'npm:inferno@7.4.11/dist/inferno.min.js',
    'inferno-compat': 'npm:inferno-compat/dist/inferno-compat.min.js',
    'inferno-create-element': 'npm:inferno-create-element@7.4.11/dist/inferno-create-element.min.js',
    'inferno-dom': 'npm:inferno-dom/dist/inferno-dom.min.js',
    'inferno-hydrate': 'npm:inferno-hydrate@7.4.11/dist/inferno-hydrate.min.js',
    'inferno-clone-vnode': 'npm:inferno-clone-vnode/dist/inferno-clone-vnode.min.js',
    'inferno-create-class': 'npm:inferno-create-class/dist/inferno-create-class.min.js',
    'inferno-extras': 'npm:inferno-extras/dist/inferno-extras.min.js',
    'plugin-babel': 'npm:systemjs-plugin-babel@0.0.25/plugin-babel.js',
    'systemjs-babel-build': 'npm:systemjs-plugin-babel@0.0.25/systemjs-babel-browser.js',
    // Prettier
    'prettier/standalone': 'npm:prettier@2.8.4/standalone.js',
    'prettier/parser-html': 'npm:prettier@2.8.4/parser-html.js',
  },
  packages: {
    'devextreme-vue': {
      main: 'index.js',
    },
    'devextreme': {
      defaultExtension: 'js',
    },
    'devextreme/events/utils': {
      main: 'index',
    },
    'devextreme/events': {
      main: 'index',
    },
    'es6-object-assign': {
      main: './index.js',
      defaultExtension: 'js',
    },
  },
  packageConfigPaths: [
    'npm:@devextreme/*/package.json',
    'npm:@devextreme/runtime@3.0.11/inferno/package.json',
  ],
  babelOptions: {
    sourceMaps: false,
    stage0: true,
  },
};
System.config(window.config);
