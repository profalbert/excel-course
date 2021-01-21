module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        }
      }
    ],
  ]
  const plugins = [
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-proposal-class-properties',
  ]

  return {
    presets,
    plugins
  };
}