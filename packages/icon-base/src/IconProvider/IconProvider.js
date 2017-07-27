import { Component, Children } from 'react';
import PropTypes from 'prop-types';

var propTypes = {
  children: PropTypes.element.isRequired,
};

var childContextTypes = {
  iconBase: PropTypes.object,
};

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

IconProvider.propTypes = propTypes;
IconProvider.childContextTypes = childContextTypes;

export default IconProvider;
