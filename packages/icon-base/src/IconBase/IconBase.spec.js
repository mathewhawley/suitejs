import React from 'react';
import { shallow } from 'enzyme';
import IconBase from './IconBase';

describe('<IconBase />', () => {
  describe('settings via props', () => {
    var wrapper;
    var defaultAttrs = {
      fill: 'currentColor',
      size: '1em',
    };
    var defaultStyle = {
      verticalAlign: 'text-bottom',
    };

    beforeEach(() => {
      wrapper = shallow(
        <IconBase>
          <title>an icon</title>
          <path d="M170 44.1L155.9" />
        </IconBase>
      );
    });

    it('should correctly set default attributes', () => {
      var expected = {
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        fill: defaultAttrs.fill,
        height: defaultAttrs.size,
        style: defaultStyle,
        width: defaultAttrs.size,
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

    it('should customise fill', () => {
      wrapper.setProps({ fill: '#ffffff' });
      expect(wrapper.prop('fill')).toBe('#ffffff');
    });

    it('should customise width', () => {
      wrapper.setProps({ width: '1.5em' });
      expect(wrapper.prop('width')).toBe('1.5em');
      wrapper.setProps({ width: 40 });
      expect(wrapper.prop('width')).toBe(40);
    });

    it('should customise height', () => {
      wrapper.setProps({ height: '2em' });
      expect(wrapper.prop('height')).toBe('2em');
      wrapper.setProps({ height: 24 });
      expect(wrapper.prop('height')).toBe(24);
    });

    it('should customise style', () => {
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

    it('should customise rest', () => {
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

  describe('settings via context', () => {
    var wrapper;

    beforeEach(() => {
      wrapper = shallow(
        <IconBase>
          <title>an icon</title>
          <path d="M170 44.1L155.9" />
        </IconBase>,
        { context: {} }
      );
    });

    it('should customise fill', () => {
      wrapper.setContext({
        sjsIconBase: {
          fill: '#cccccc',
        },
      });
      expect(wrapper.prop('fill')).toBe('#cccccc');

      // it can be overriden by props
      wrapper.setProps({
        fill: '#eeeeee',
      });
      expect(wrapper.prop('fill')).toBe('#eeeeee');
    });

    it('should customise width and height via size', () => {
      wrapper.setContext({
        sjsIconBase: {
          size: '1.5em',
        },
      });
      expect(wrapper.prop('width')).toBe('1.5em');
      expect(wrapper.prop('height')).toBe('1.5em');

      // it can be overriden by props
      wrapper.setProps({
        size: '14px',
      });
      expect(wrapper.prop('width')).toBe('14px');
      expect(wrapper.prop('height')).toBe('14px');
    });

    it('should customise height', () => {
      wrapper.setContext({
        sjsIconBase: {
          size: '14px',
          height: 2,
        },
      });
      expect(wrapper.prop('height')).toBe(2);

      // it can be overriden by props
      wrapper.setProps({
        size: '12px',
      });
      expect(wrapper.prop('height')).toBe('12px');
    });

    it('should customise width', () => {
      wrapper.setContext({
        sjsIconBase: {
          size: 20,
          width: '1.15em',
        },
      });
      expect(wrapper.prop('width')).toBe('1.15em');

      // it can be overriden by props
      wrapper.setProps({
        size: '10px',
      });
      expect(wrapper.prop('width')).toBe('10px');
    });

    it('should customise style', () => {
      wrapper.setContext({
        sjsIconBase: {
          style: {
            verticalAlign: 'text-top',
            backgroundColor: '#cccccc',
          },
        },
      });
      expect(wrapper.prop('style')).toEqual({
        verticalAlign: 'text-top',
        backgroundColor: '#cccccc',
      });

      // it can be overriden by props
      wrapper.setProps({
        style: {
          backgroundColor: '#000000',
        },
      });
      expect(wrapper.prop('style')).toEqual({
        verticalAlign: 'text-top',
        backgroundColor: '#000000',
      });
    });

    it('should customise rest', () => {
      wrapper.setContext({
        sjsIconBase: {
          'data-icon': true,
          className: 'icon',
          'aria-hidden': false,
        },
      });
      expect(wrapper.prop('data-icon')).toBe(true);
      expect(wrapper.prop('className')).toBe('icon');
      expect(wrapper.prop('aria-hidden')).toBe(false);

      // it can be overriden by props
      wrapper.setProps({
        className: 'cool-icon',
        'aria-hidden': true,
      });
      expect(wrapper.prop('className')).toBe('cool-icon');
      expect(wrapper.prop('aria-hidden')).toBe(true);
    });
  });
});
