'use strict';

const modules = [require('babel-plugin-transform-es2015-modules-commonjs'), {
  strict: false,
}];

const defaultTargets = {
  android: 30,
  chrome: 35,
  edge: 14,
  explorer: 9,
  firefox: 52,
  safari: 8,
  ucandroid: 1,
};

function buildTargets(options) {
  return Object.assign({}, defaultTargets, options.additionalTargets);
}

module.exports = function buildAirbnbPreset(context, options) {
  const targets = (options && options.targets) || buildTargets(options);

  return {
    presets: [
      require('babel-preset-env').default(null, {
        debug: true,
        exclude: [
          'transform-async-to-generator',
          'transform-es2015-template-literals',
          'transform-regenerator',
        ],
        modules: false,
        targets,
      }),
      require('babel-preset-react'),
    ],
    plugins: [
      options && options.modules === false ? null : modules,
      [require('babel-plugin-transform-es2015-template-literals'), {
        spec: true,
      }],
      require('babel-plugin-transform-es3-member-expression-literals'),
      require('babel-plugin-transform-es3-property-literals'),
      require('babel-plugin-transform-jscript'),
      [require('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true,
      }],
    ].filter(Boolean),
  };
};
