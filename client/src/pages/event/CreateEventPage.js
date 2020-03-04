import React from 'react';
import Layout from "../../components/Layout";
import {Create} from "../../components/event";

const CreateEventPage = props => {
  return (
    <Layout {...props}>
      <Create/>
    </Layout>
    )
};

export default CreateEventPage
