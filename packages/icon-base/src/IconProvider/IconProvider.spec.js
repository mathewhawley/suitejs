import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import IconProvider from './IconProvider';
import PropTypes from 'prop-types';

describe('<IconProvider />', () => {
  it('should enforce a single child', () => {
    // Ignore propTypes warnings
    var propTypes = IconProvider.propTypes;
    IconProvider.propTypes = {};

    try {
      expect(() =>
        TestUtils.renderIntoDocument(
          <IconProvider>
            <div />
          </IconProvider>
        )
      ).not.toThrow();

      expect(() => TestUtils.renderIntoDocument(<IconProvider />)).toThrow(
        /a single React element child/
      );

      expect(() =>
        TestUtils.renderIntoDocument(
          <IconProvider>
            <div />
            <div />
          </IconProvider>
        )
      ).toThrow(/a single React element child/);
    } finally {
      IconProvider.propTypes = propTypes;
    }
  });

  it('should add given props to child context', () => {
    function Child() {
      return <div />;
    }

    Child.contextTypes = {
      iconBase: PropTypes.object,
    };

    var props = {
      fill: '#ffffff',
      style: {
        verticalAlign: 'middle',
      },
    };
    var wrapper = mount(
      <IconProvider {...props}>
        <Child />
      </IconProvider>
    );

    expect(wrapper.find(Child).node.context).toEqual({ iconBase: props });
  });
});
