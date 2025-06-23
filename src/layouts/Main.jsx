import React from 'react';
import PropTypes from 'prop-types';
import '../styles/main.scss';

const Main = ({ children }) => {
    return <main>{children}</main>;
};

Main.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Main;