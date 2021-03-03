/* eslint-disable no-undef */
// Get your list of languages from somewhere, env file, config.json, etc
// for sake of this snippet I am putting it here

const languages = ['it', 'en'] // English is currently the default so it isn't needed here.

const createLocalePage = (page, createPage) => {
  const { path, context, ...rest } = page

  createPage({
    ...rest,
    context: {
      ...context,
      locale: defaultLanguage,
    },
  })

  if (languages.length) {
    languages.forEach(code => {
      createPage({
        ...rest,
        path: `/${code}${path}`,
        // every page for each language gets the language code as a prefix
        // to its path: "/es/blog/<some-slug>" for example
        context: {
          ...context,
          locale: code,
        },
      })
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { data } = graphql(`
    
  `)
  const { createPage } = actions
  // generate your dynamic content here...
  const page = {
    path: 'some-page',
    component: path.resolve(`./src/templates/some-page.js`),
    context: {
      slug: 'some-page-slug',
    },
  }
  createLocalePage(page, createPage)
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  createLocalePage(page, createPage)
}
