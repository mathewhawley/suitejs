import React from 'react';
import { shallow } from 'enzyme';
import IconBase from './IconBase';

describe('<IconBase />', () => {
  var wrapper;
  var defaultProps = {
    fill: 'currentColor',
    size: '1em',
  };
  var defaultStyle = {
    verticalAlign: 'text-bottom',
  };

  beforeEach(() => {
    wrapper = shallow(
      <IconBase>
        <title key="title">an icon</title>
        <path d="M170 44.1L155.9" key="path" />
      </IconBase>
    );
  });

  it('should correctly set default attributes', () => {
    var expected = {
      xmlns: 'http://www.w3.org/2000/svg',
      fill: defaultProps.fill,
      height: defaultProps.size,
      style: defaultStyle,
      width: defaultProps.size,
      'aria-hidden': true,
    };
    var actual = wrapper.props();

    Object.keys(expected).forEach(function validateProp(prop) {
      if (
        typeof expected[prop] === 'object' &&
        expected[prop].constructor === Object
      ) {
        expect(actual[prop]).toEqual(expected[prop]);
      } else {
        expect(actual[prop]).toBe(expected[prop]);
      }
    });
  });

  describe('customisable attributes', () => {
    it('fill', () => {
      wrapper.setProps({ fill: '#ffffff' });
      expect(wrapper.prop('fill')).toBe('#ffffff');
    });

    it('width', () => {
      wrapper.setProps({ width: '1.5em' });
      expect(wrapper.prop('width')).toBe('1.5em');
      wrapper.setProps({ width: 40 });
      expect(wrapper.prop('width')).toBe(40);
    });

    it('height', () => {
      wrapper.setProps({ height: '2em' });
      expect(wrapper.prop('height')).toBe('2em');
      wrapper.setProps({ height: 24 });
      expect(wrapper.prop('height')).toBe(24);
    });

    it('style', () => {
      wrapper.setProps({
        style: {
          border: '1px solid #cccccc',
        },
      });
      expect(wrapper.prop('style')).toEqual({
        ...defaultStyle,
        border: '1px solid #cccccc',
      });

      wrapper.setProps({
        style: {
          borderRadius: '1px',
          verticalAlign: 'bottom',
        },
      });
      expect(wrapper.prop('style')).toEqual({
        borderRadius: '1px',
        verticalAlign: 'bottom',
      });
    });

    it('rest', () => {
      wrapper.setProps({
        className: 'icon-base',
        'data-icon': true,
        preserveAspectRatio: 'xMidYMin meet',
      });
      expect(wrapper.prop('className')).toBe('icon-base');
      expect(wrapper.prop('data-icon')).toBe(true);
      expect(wrapper.prop('preserveAspectRatio')).toBe('xMidYMin meet');
    });
  });
});
