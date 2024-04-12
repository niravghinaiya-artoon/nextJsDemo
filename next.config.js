require('dotenv').config()
const webpack = require('webpack')

/** @type {import('next').NextConfig} */

const nextConfig = {
    output: "standalone",
    webpack: (config) => {
        config.plugins.push(
            new webpack.EnvironmentPlugin(process.env)
        )
        return config
    }
};

module.exports = nextConfig