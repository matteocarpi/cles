/* eslint-disable func-names */
const defaultLang = 'it'
const languages = ['it', 'en']

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(/* GraphQL */ `
    query ChiSiamo {
      chiSiamoPage: wpPage(id: { eq: "cG9zdDo3Ng==" }) {
        uri
        chiSiamoData {
          url {
            en
          }
        }
      }
    }
  `)

  // Home Page
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

  // Chi Siamo
  languages.forEach(lang => {
    actions.createPage({
      path:
        lang === defaultLang
          ? data.chiSiamoPage.uri
          : data.chiSiamoPage.chiSiamoData.url[lang].replace(' ', '-'),
      component: require.resolve(`./src/templates/ChiSiamo.jsx`),
      context: {
        lang,
      },
    })
  })
}
