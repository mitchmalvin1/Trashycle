const { getDefaultConfig } = require('expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
module.exports = defaultConfig;

// module.exports = (async () => {
//     const {
//       resolver: { sourceExts, assetExts },
//     } = await getDefaultConfig(__dirname);
  
//     return {
//       transformer: {
//         babelTransformerPath: require.resolve('react-native-svg-transformer'),
//         getTransformOptions: async () => ({
//           transform: {
//             experimentalImportSupport: false,
//             inlineRequires: false,
//           },
//         }),
//       },
//       resolver: {
//         assetExts: assetExts.filter(ext => ext !== 'svg'),
//         sourceExts: [...sourceExts, 'svg'],
//       },
//     };
//   })();