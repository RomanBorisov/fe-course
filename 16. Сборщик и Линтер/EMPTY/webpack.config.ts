import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration } from 'webpack';
import 'webpack-dev-server';

enum Mode {
    Prod = 'production',
    Dev = 'development'
}

interface IEnvVariables {
    mode: Mode;
    port: number;
}

export default (env: IEnvVariables) => {
    const isDev = env.mode === Mode.Dev;

    const config: Configuration = {
        mode: env.mode ?? Mode.Dev,
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
            isDev && new webpack.ProgressPlugin(),
        ].filter(Boolean),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        devtool: isDev ? 'inline-source-map' : false,
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        devServer: isDev
            ? {
                port: env.port ?? 5000,
                open: true,
                static: {
                    directory: path.resolve(__dirname, 'dist'),
                },
            }
            : undefined,
    };

    return config;
};
