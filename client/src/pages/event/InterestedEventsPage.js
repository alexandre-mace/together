import React from 'react';
import InterestedEvents from "../../components/event/organisms/InterestedEvents";
import Layout from "../../components/Layout";

const InterestedEventsPage = (props) => (
  <Layout {...props}>
    <InterestedEvents {...props}/>
  </Layout>
);

export default InterestedEventsPage;
