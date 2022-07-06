const path = require('path');
const root = path.resolve(__dirname, '..');

module.exports = {
  resolver: {
    sourceExts: [
	"js",
	"jsx",
	"ts",
	"tsx"
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  projectRoot : __dirname,
  watchFolders: [root],

}