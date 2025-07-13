const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Set the EXPO_ROUTER_APP_ROOT environment variable
process.env.EXPO_ROUTER_APP_ROOT = './app';

// Find the project and workspace directories
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

// Start with the default config for this specific project
const config = getDefaultConfig(projectRoot);

// Explicitly set the project root to ensure asset resolution works correctly
config.projectRoot = projectRoot;

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages, but prioritize mobile's node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  // Remove the workspace root node_modules to avoid version conflicts
];

// 3. Ensure we use the correct Metro version and resolver
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// 4. Fix asset resolution to use mobile app assets directory
config.resolver.assetExts = [...(config.resolver.assetExts || []), 'png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'];
config.resolver.alias = {
  '../../App': path.resolve(projectRoot, 'App.tsx'),
  '../../App.js': path.resolve(projectRoot, 'App.tsx'),
};

// 5. Configure asset resolver to look in the correct directory
config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  minifierConfig: {
    ...config.transformer?.minifierConfig,
    keep_fnames: true,
  },
};

// 6. Set the project root properly for asset resolution
config.projectRoot = projectRoot;

module.exports = config;
