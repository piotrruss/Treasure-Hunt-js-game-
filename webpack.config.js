const path = require("path")
module.exports = {
  entry: "./js/app.js",
  output: { filename: "out.js", path: path.resolve(__dirname, "build") },
  mode: "development", watch: true,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/, 
        exclude: /node_modules/,
        loader: 'file-loader?name=./images/[name].[ext]' 
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["es2015", "stage-2"]
          }
        }
      }
    ]
  }
};


