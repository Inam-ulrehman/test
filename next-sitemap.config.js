module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },

      {
        userAgent: '*',
        // disallow: ['/dashboard', '/user', '/api'],
      },
    ],
  },
  exclude: ['/dashboard'],
  changefreq: ['weekly'],
}
