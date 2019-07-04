const targetAddress = new URL(process.env.TARGET_ADDRESS || `https://www.techsprite.ca`);

console.log("---------------------Environment Variables STARTING---------------------")
console.log(process.env.TARGET_ADDRESS)
console.log(process.env.AWS_REGION)
console.log(process.env.TARGET_BUCKET_NAME)
console.log("---------------------Environment Variables ENDING---------------------")

module.exports = {
  pathPrefix: `/blog`,
  siteMetadata: {
    title: `Gatsby Starter Blog`,
    author: `Kyle Mathews`,
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
     {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.TARGET_BUCKET_NAME || "www-techsprite-ca-blogging",
        region: process.env.AWS_REGION,
        protocol: targetAddress.protocol.slice(0, -1),
        hostname: targetAddress.hostname,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
        siteUrl: targetAddress.hostname,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
