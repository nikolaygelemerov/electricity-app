/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/*.test.{ts,tsx}', '**/styled.{ts,tsx}'],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  server: process.env.NETLIFY || process.env.NETLIFY_LOCAL ? './server.js' : undefined,
  serverBuildPath: '.netlify/functions-internal/server.js',
  serverDependenciesToBundle: [
    '@apollo/client',
    '@graphql-typed-document-node/core',
    '@wry/context',
    '@wry/equality',
    '@wry/trie',
    'graphql-tag',
    'optimism',
    'response-iterator',
    'symbol-observable',
    'ts-invariant',
    'tslib',
    'zen-observable-ts'
  ]
  // publicPath: "/build/",
};
