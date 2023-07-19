module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ['react-native-reanimated/plugin', {
    //   globals: ['__scanCodes']
    // }],
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          components: './src/components',
          utils: './src/utils',
          hooks: './src/hooks',
          types: './src/types',
          buttons: './src/components/buttons',
          src: './src',
          assets: './assets'
        }
      }
    ]
  ]
};
