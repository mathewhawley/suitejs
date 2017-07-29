import React from 'react';
import PropTypes from 'prop-types';

const XMLNS_SVG = 'http://www.w3.org/2000/svg';

var propTypes = {
  /**
   * React element(s) passed into the icon
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]).isRequired,
  /**
   * Defines the color of the interior
   */
  fill: PropTypes.string,
  /**
   * Height of the root SVG element. Takes precedence over 'size'
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Applied to the width and height attributes
   */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Added as inline styles to the root SVG element. Shallow merged with
   * default style object
   */
  style: PropTypes.object,
  /**
   * Width of the root SVG element. Takes precendence over 'size'
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

var contextTypes = {
  sjsIconBase: PropTypes.shape({
    fill: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

function IconBase(
  { children, fill, height, size, style = {}, width, ...rest },
  {
    sjsIconBase: {
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
