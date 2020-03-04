import React from 'react';
import Layout from "../../components/Layout";
import DiscoverEvents from "../../components/event/organisms/DiscoverEvents";

const DiscoverEventsPage = (props) => (
  <Layout {...props}>
    <DiscoverEvents {...props}/>
  </Layout>
);

export default DiscoverEventsPage;
