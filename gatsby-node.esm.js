/* eslint-disable func-names */
import { paroleChiave, projectCategories } from './src/const'

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
      serviziPage: wpPage(id: { eq: "cG9zdDo0NDg=" }) {
        uri
        serviziData: serviciosData {
          url: path {
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
        ? data.serviziPage.uri
        : data.serviziPage.serviziData.url[lang].replace(' ', '-')

    actions.createPage({
      path,
      component: require.resolve(`./src/templates/Servizi.jsx`),
      context: {
        lang,
        location: { pathname: path },
      },
    })
  })

  // Progetti Aperti
  languages.forEach(lang => {
    // Tutti i progetti
    const parentPath =
      lang === defaultLang ? '/progetti-in-corso' : '/ongoing-projects'

    actions.createPage({
      path: parentPath,
      component: require.resolve(`./src/templates/Projects.jsx`),
      context: {
        lang,
        location: { pathname: parentPath },
        area: Object.keys(paroleChiave),
        status: 'aperto',
        startYear: 0,
        endYear: 3000,
        title: projectCategories.aperti[lang],
      },
    })

    // Progetti divisi per area di lavoro
    Object.keys(paroleChiave).forEach(area => {
      const path = `${parentPath}/${paroleChiave[area][lang]
        .toLowerCase()
        .replace(' ', '-')}`

      actions.createPage({
        path,
        component: require.resolve(`./src/templates/Projects.jsx`),
        context: {
          lang,
          location: { pathname: path },
          area,
          status: 'aperto',
          title: projectCategories.aperti[lang],
          startYear: 0,
          endYear: 3000,
        },
      })
    })
  })

  // Progetti Chiusi
  languages.forEach(lang => {
    function createBefore2015() {
      const parentPath =
        lang === defaultLang
          ? '/progetti-chiusi-prima-del-2015'
          : '/closed-projects-before-2015'

      // Prima del 2015
      actions.createPage({
        path: parentPath,
        component: require.resolve(`./src/templates/Projects.jsx`),
        context: {
          lang,
          location: {
            pathname:
              lang === defaultLang
                ? '/progetti-chiusi-prima-del-2015'
                : '/closed-projects-before-2015',
          },
          area: Object.keys(paroleChiave),
          status: 'chiuso',
          startYear: 2009,
          endYear: 2014,
          title: projectCategories.chiusi.primaDel2015[lang],
        },
      })

      // Progetti divisi per area di lavoro
      Object.keys(paroleChiave).forEach(area => {
        const path = `${parentPath}/${paroleChiave[area][lang]
          .toLowerCase()
          .replace(' ', '-')}`

        actions.createPage({
          path,
          component: require.resolve(`./src/templates/Projects.jsx`),
          context: {
            lang,
            location: { pathname: path },
            area,
            status: 'chiuso',
            title: projectCategories.primaDel2015[lang],
            startYear: 2009,
            endYear: 2014,
          },
        })
      })
    }

    createBefore2015()

    function createAfter2015() {
      const parentPath =
        lang === defaultLang
          ? '/progetti-chiusi-dopo-il-2015'
          : '/closed-projects-after-2015'
      // Dopo il 2015
      actions.createPage({
        path: parentPath,
        component: require.resolve(`./src/templates/Projects.jsx`),
        context: {
          lang,
          location: {
            pathname:
              lang === defaultLang
                ? '/progetti-chiusi-dopo-il-2015'
                : '/closed-projects-after-2015',
          },
          area: Object.keys(paroleChiave),
          status: 'chiuso',
          startYear: 2015,
          endYear: 3000,
          title: projectCategories.chiusi.dopoIl2015[lang],
        },
      })

      // Progetti divisi per area di lavoro
      Object.keys(paroleChiave).forEach(area => {
        const path = `${parentPath}/${paroleChiave[area][lang]
          .toLowerCase()
          .replace(' ', '-')}`

        actions.createPage({
          path,
          component: require.resolve(`./src/templates/Projects.jsx`),
          context: {
            lang,
            location: { pathname: path },
            area,
            status: 'chiuso',
            title: projectCategories.chiusi.dopoIl2015[lang],
            startYear: 2015,
            endYear: 3000,
          },
        })
      })
    }

    createAfter2015()
  })
}
