/* eslint-disable func-names */
const defaultLang = 'it'
const languages = ['it', 'en']

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(/* GraphQL */ `
    query Pages {
      chiSiamoPage: wpPage(id: { eq: "cG9zdDo0MjY=" }) {
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
      const path = `/${lang}`

      actions.createPage({
        path,
        component: require.resolve(`./src/templates/Home.jsx`),
        context: {
          location: { pathname: path },
          lang,
        },
      })
    }
  })

  // Chi Siamo
  languages.forEach(lang => {
    const path =
      lang === defaultLang
        ? data.chiSiamoPage.uri
        : data.chiSiamoPage.chiSiamoData.url[lang].replace(' ', '-')

    actions.createPage({
      path,
      component: require.resolve(`./src/templates/ChiSiamo.jsx`),
      context: {
        lang,
        location: { pathname: path },
      },
    })
  })

  // Servizi
  languages.forEach(lang => {
    const path =
      lang === defaultLang
        ? data.chiSiamoPage.uri
        : data.chiSiamoPage.chiSiamoData.url[lang].replace(' ', '-')

    actions.createPage({
      path,
      component: require.resolve(`./src/templates/ChiSiamo.jsx`),
      context: {
        lang,
        location: { pathname: path },
      },
    })
  })
}
