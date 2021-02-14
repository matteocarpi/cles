/* eslint-disable no-undef */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const longSlug = createFilePath({ node, getNode, basePath: 'content/pages' });
    const slug = longSlug.split('/');
    createNodeField({
      node,
      name: 'slug',
      value: `/${slug[slug.length - 2]}/`,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile(filter: {relativeDirectory: {eq: "posts"}}) {
        edges {
          node {
            childMarkdownRemark {
              fields {
                slug
              }
            }
          }
        }
      }
    }
  `);
  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: node.childMarkdownRemark.fields.slug,
      component: path.resolve('./src/templates/post.js'),
      context: {
        slug: node.childMarkdownRemark.fields.slug,
      },
    });
  });
};