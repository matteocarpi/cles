/* eslint-disable func-names */

const languages = ['it', 'en']

exports.createPages = async function ({ actions }) {
  languages.forEach(lang => {
    actions.createPage({
      path: `/${lang}`,
      component: require.resolve(`./src/templates/Home.jsx`),
      context: {
        lang,
      },
    })
  })
}
