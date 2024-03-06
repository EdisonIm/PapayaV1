const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const {
    resolver: {sourceExts, assetExts},
  } = defaultConfig;

  return mergeConfig(defaultConfig, {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [
        ...sourceExts,
        'svg',
        'js',
        'json',
        'jsx',
        'mjs',
        'ts',
        'tsx',
      ],
    },
  });
})();
