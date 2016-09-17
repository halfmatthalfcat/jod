module.exports = {
  entry: './app.tsx',
  output: {
    path: "../backend/public/",
    filename: "app.js"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'babel-loader!ts-loader'},
      {test: /\.json$/, loader: 'json-loader'}
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};