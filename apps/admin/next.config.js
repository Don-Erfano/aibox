//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const path = require('path');

const nextConfig = {
  transpilePackages: ['nuqs', '@aibox/ui'],
  serverExternalPackages: [],
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@aibox/ui'] = path.resolve(
      __dirname,
      '../../libs/ui/src'
    );
    return config;
  },
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.fileshare.nextaibox.com',
        port: '',
        pathname: '/media/pictures/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'dev.fileshare.nextaibox.com',
        port: '',
        pathname: '/media/pictures/**',
        search: '',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
