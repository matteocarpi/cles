import { useStaticQuery, graphql } from 'gatsby'

export default function useNavigation() {
  const data = useStaticQuery(graphql`
    query NavigationData {
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
      clients: wpPage(id: { eq: "cG9zdDo0MjE=" }) {
        id
        uri
        clientiData {
          uri {
            en
          }
        }
      }
      contatti: wpPage(id: { eq: "cG9zdDo2MTM=" }) {
        id
        uri
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

  const navigation = {
    pages: [
      {
        label: {
          it: 'Home',
          en: 'Home',
        },
        url: {
          it: '/',
          en: '/en',
        },
      },
      {
        label: {
          it: 'Chi Siamo',
          en: 'About',
        },
        url: {
          it: data.chiSiamoPage.uri,
          en: data.chiSiamoPage.chiSiamoData.url.en,
        },
      },
      {
        label: {
          it: 'Servizi',
          en: 'Services',
        },
        url: {
          it: data.serviziPage.uri,
          en: data.serviziPage.serviziData.url.en,
        },
      },
      {
        label: {
          it: 'Clienti',
          en: 'Clients',
        },
        url: {
          it: data.clients.uri,
          en: data.clients.clientiData.uri.en,
        },
      },
      {
        label: {
          it: 'News',
          en: 'News',
        },
        url: {
          it: '/news',
          en: '/en/news',
        },
      },
      {
        label: {
          it: 'Paolo Leon',
          en: 'Paolo Leon',
        },
        url: {
          it: '/paolo-leon',
          en: '/en/paolo-leon',
        },
      },
      {
        label: {
          it: 'Lavora con noi',
          en: 'Work with us',
        },
        url: {
          it: '/lavora-con-noi',
          en: '/work-with-us',
        },
      },
      {
        label: {
          it: 'Contatti',
          en: 'Contacts',
        },
        url: {
          it: data.contatti.uri,
          en: data.contatti.contattiData.iuerrelle.en,
        },
      },
    ],
    languages: {
      it: {
        label: 'EN',
        url: '/en',
      },
      en: {
        label: 'IT',
        url: '/',
      },
    },
  }

  const findLink = (italianLabel, lang) =>
    navigation.pages.find(p => p.label.it === italianLabel).url[lang]

  return { navigation, findLink }
}
