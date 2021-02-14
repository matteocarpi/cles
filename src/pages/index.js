import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import styles from '../styles/Home.module.scss';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

const Home = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <div className={styles.content}>
      <h1>{data.site.siteMetadata.title}</h1>
    </div>
  </Layout>
);

export default Home;

export const query = graphql`
query HomeQuery {
  site {
    siteMetadata {
      title
    }
  }
}`;

Home.propTypes = {
  data: PropTypes.node,
};