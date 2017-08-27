import React from 'react';
import IconBase from '@suitejs/icon-base';

function Person(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <path d="M24 24c-4.42 0-8-3.59-8-8 0-4.42 3.58-8 8-8s8 3.58 8 8c0 4.41-3.58 8-8 8zm0 4c5.33 0 16 2.67 16 8v4H8v-4c0-5.33 10.67-8 16-8z" />
    </IconBase>
  );
}

export default Person;
