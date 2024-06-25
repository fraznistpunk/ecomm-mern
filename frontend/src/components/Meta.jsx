import React from 'react'
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
    title : "E-comm, 1 stop shop to get best deals.",
    description : "Get best deals on electronics.",
    keywords : "electronics, buy electronics, cheap electronics, best deals"
};
export default Meta;