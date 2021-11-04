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
      news: allWpPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            id
            slug
            newsData {
              tradotta
              en {
                url
              }
            }
          }
        }
      }
      clients: wpPage(id: { eq: "cG9zdDo0MjE=" }) {
        id
        slug
        clientiData {
          uri {
            en
          }
        }
      }
      contatti: wpPage(id: { eq: "cG9zdDo2MTM=" }) {
        id
        slug
        title
        contattiData {
          tittolo {
            it
            en
          }
          iuerrelle {
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
        : data.chiSiamoPage.chiSiamoData.url[lang].replaceAll(' ', '-')

    actions.createPage({
      path,
      component: require.resolve(`./src/templates/ChiSiamo.jsx`),
      context: {
        lang,
        location: { pathname: path },
      },
    })
  })

  const servicesPath = lang => {
    const paths = {
      it: data.serviziPage.uri,
      en: data.serviziPage.serviziData.url[lang] && data.serviziPage.serviziData.url[lang].replaceAll(' ', '-'),
    }

    return paths[lang]
  }

  // Servizi
  languages.forEach(lang => {
    actions.createPage({
      path: servicesPath(lang),
      component: require.resolve(`./src/templates/Servizi.jsx`),
      context: {
        lang,
        location: { pathname: servicesPath(lang) },
        parentUrl: servicesPath(lang),
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
        parentUrl: servicesPath(lang),
      },
    })

    // Progetti divisi per area di lavoro
    Object.keys(paroleChiave).forEach(area => {
      const path = `${parentPath}/${paroleChiave[area][lang]
        .toLowerCase()
        .replaceAll(' ', '-')}`

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
          parentUrl: servicesPath(lang),
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
          parentUrl: servicesPath(lang),
        },
      })

      // Progetti divisi per area di lavoro
      Object.keys(paroleChiave).forEach(area => {
        const path = `${parentPath}/${paroleChiave[area][lang]
          .toLowerCase()
          .replaceAll(' ', '-')}`

        actions.createPage({
          path,
          component: require.resolve(`./src/templates/Projects.jsx`),
          context: {
            lang,
            location: { pathname: path },
            area,
            status: 'chiuso',
            title: projectCategories.chiusi.primaDel2015[lang],
            startYear: 2009,
            endYear: 2014,
            parentUrl: servicesPath(lang),
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
          parentUrl: servicesPath(lang),
        },
      })

      // Progetti divisi per area di lavoro
      Object.keys(paroleChiave).forEach(area => {
        const path = `${parentPath}/${paroleChiave[area][lang]
          .toLowerCase()
          .replaceAll(' ', '-')}`

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
            parentUrl: servicesPath(lang),
          },
        })
      })
    }

    createAfter2015()
  })

  const newsPath = lang => {
    const paths = {
      it: '/news',
      en: `/${lang}/news`,
    }
    return paths[lang]
  }

  // News
  languages.forEach(lang => {
    actions.createPage({
      path: newsPath(lang),
      component: require.resolve(`./src/templates/NewsListPage.jsx`),
      context: {
        lang,
        location: { pathname: newsPath(lang) },
        title: 'News',
        parentUrl: newsPath(lang),
      },
    })
  })

  // Single News
  languages.forEach(lang => {
    data.news.edges.map(newsEdge => {
      const { node: news } = newsEdge

      const path =
        lang === defaultLang
          ? `/${news.slug}`
          : news.newsData.url || `/en/${news.slug}`

      actions.createPage({
        path,
        component: require.resolve(`./src/templates/NewsPage.jsx`),
        context: {
          id: news.id,
          lang,
          parentUrl: newsPath(lang),
          location: { pathname: path },
        },
      })
    })
  })

  // Clients
  languages.forEach(lang => {
    const path = {
      it: data.clients.slug,
      en: data.clients.clientiData.uri.en,
    }

    actions.createPage({
      path: path[lang],
      component: require.resolve('./src/templates/Clients.jsx'),
      context: {
        id: data.clients.id,
        lang,
        location: { pathname: path[lang] },
        parentUrl: path[lang],
      },
    })
  })

  // Contacts
  languages.forEach(lang => {
    const path = {
      it: data.contatti.slug,
      en: data.contatti.contattiData.iuerrelle[lang],
    }

    actions.createPage({
      path: path[lang],
      component: require.resolve('./src/templates/Contatti.jsx'),
      context: {
        id: data.contatti.id,
        lang,
        location: { pathname: path[lang] },
        title: data.contatti.contattiData.tittolo[lang],
        parentUrl: path[lang],
      },
    })
  })
}
