import React from 'react';
import Layout from "../../components/Layout";
import {Update} from "../../components/user";

const UpdateUserPage = props => {
  return (
    <Layout {...props}>
      <Update {...props}/>
    </Layout>
  )
};

export default UpdateUserPage;
