import React from 'react'

import { graphql } from 'gatsby'

const Post = ({ data }) => (
  <div>
    <h1>{data.postData.frontmatter.title}</h1>
  </div>
)

export default Post

export const query = graphql`
  query PostData($slug: String!) {
    postData: markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
      }
    }
  }
`
