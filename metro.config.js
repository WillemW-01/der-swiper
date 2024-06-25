const { getDefaultConfig } = require("expo/metro-config");
const defaultConfig = getDefaultConfig(__dirname);

// Add 'db' or 'sqlite' to the list of asset extensions
defaultConfig.resolver.assetExts.push("sqlite");
// defaultConfig.resolver.assetExts.push('sqlite');

module.exports = defaultConfig;
