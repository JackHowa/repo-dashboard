import React from 'react';
import PropTypes from 'prop-types';

const RepoCardStat = ({ title, value }) => (
  <p>
    {title}: {value}
  </p>
);

RepoCardStat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default RepoCardStat;
