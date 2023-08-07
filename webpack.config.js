const path = require('path');

module.exports = {
	entry: './src/index.ts',
	// entry: './path/to/your/entry_file.ts', // Replace with the entry file of your TypeScript project
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.min.js',
		// filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
