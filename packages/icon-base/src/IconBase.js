import React from 'react';
import PropTypes from 'prop-types';

const XMLNS_SVG = 'http://www.w3.org/2000/svg';

var propTypes = {
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

var contextTypes = {
  iconBase: PropTypes.shape({
    fill: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

function IconBase(
  { children, fill, height, size, style, width, ...rest },
  {
    iconBase: {
      fill: ctxFill = 'currentColor',
      height: ctxHeight,
      size: ctxSize = '1em',
      style: ctxStyle = {},
      width: ctxWidth,
      ...ctxRest
    } = {},
  }
) {
  return (
    <svg
      version="1.1"
      xmlns={XMLNS_SVG}
      fill={fill || ctxFill}
      height={height || size || ctxHeight || ctxSize}
      style={{
        verticalAlign: 'text-bottom',
        ...ctxStyle,
        ...style,
      }}
      width={width || size || ctxWidth || ctxSize}
      aria-hidden
      {...ctxRest}
      {...rest}
    >
      {children}
    </svg>
  );
}

IconBase.propTypes = propTypes;
IconBase.contextTypes = contextTypes;

export default IconBase;
