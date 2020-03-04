import React from 'react';
import Layout from "../../components/Layout";
import {Show} from "../../components/event";

const ShowEventPage = props => {
  return (
    <Layout {...props}>
      <Show {...props}/>
    </Layout>
  )
};

export default ShowEventPage;
