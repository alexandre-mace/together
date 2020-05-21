import React from 'react';
import Layout from "../../components/Layout";
import MyDemands from "../../components/event/organisms/MyDemands";

const MyDemandsPage = (props) => (
  <Layout {...props}>
    <MyDemands {...props}/>
  </Layout>
);

export default MyDemandsPage;
