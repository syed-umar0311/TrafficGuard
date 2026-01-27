const nativewindBabel = require('nativewind/babel');

module.exports = function (api) {
  api.cache(true);
  const nativewindConfig = nativewindBabel();
  return {
    presets: ['babel-preset-expo'],
    plugins: nativewindConfig.plugins,
  };
};