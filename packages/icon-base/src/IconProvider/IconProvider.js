import { Component, Children } from 'react';
import PropTypes from 'prop-types';

class IconProvider extends Component {
  getChildContext() {
    var { children, ...rest } = this.props;
    return {
      iconBase: rest,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

IconProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

IconProvider.childContextTypes = {
  iconBase: PropTypes.shape({
    fill: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default IconProvider;
