import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "../styles/Home.module.scss"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

const Home = () => {
  const data = useStaticQuery(graphql`
    query Home {
      allMarkdownRemark(filter: { frontmatter: { id: { eq: "home" } } }) {
        edges {
          node {
            id
            frontmatter {
              title_en
              title_it
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.content}>
        <h1>{data.site.siteMetadata.title}</h1>
      </div>
    </Layout>
  )
}

export default Home
