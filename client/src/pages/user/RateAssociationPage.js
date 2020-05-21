import React from 'react';
import Layout from "../../components/Layout";
import RateAssociation from "../../components/user/RateAssociation";

const RateAssociationPage = props => {
  return (
    <Layout {...props}>
      <RateAssociation {...props}/>
    </Layout>
  )
};

export default RateAssociationPage;
