import React from 'react';
import Layout from "../../components/Layout";
import OnBoarding from "../../components/onboarding/OnBoarding";

const OnBoardingPage = props => {
  return (
    <Layout {...props}>
      <OnBoarding/>
    </Layout>
  )
};
export default OnBoardingPage;
