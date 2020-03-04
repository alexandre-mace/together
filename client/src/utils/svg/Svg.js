import React from 'react';

const Svg = ({ svg }) => {
  return (
    <span className="d-flex justify-content-center" dangerouslySetInnerHTML={{
      __html: "\n" +
        svg
    }}/>
    )
};
export default Svg
