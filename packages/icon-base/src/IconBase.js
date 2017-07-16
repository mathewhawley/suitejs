import React from 'react';
import PropTypes from 'prop-types';

function IconBase({ children, fill, height, size, style, width, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height || size}
      style={{
        verticalAlign: 'middle',
        ...style,
      }}
      width={width || size}
      aria-hidden
      {...rest}
    >
      {children}
    </svg>
  );
}

IconBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
  fill: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

IconBase.defaultProps = {
  fill: 'currentColor',
  size: '1em',
};

export default IconBase;
