import React from 'react';
import PropTypes from 'prop-types'

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    path: {
      fill: props.color,
    },
  };

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox={`0 0 ${props.size} ${props.size}`}
    >
      <path
        style={styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: 24,
  color: '#999'
};

export default Icon;