/* eslint-disable func-names */
const defaultLang = 'it'
const languages = ['it', 'en']

exports.createPages = async function ({ actions }) {
  languages.forEach(lang => {
    if (lang !== defaultLang) {
      actions.createPage({
        path: `/${lang}`,
        component: require.resolve(`./src/templates/Home.jsx`),
        context: {
          lang,
        },
      })
    }
  })
}
