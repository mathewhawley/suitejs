import React from 'react';
import IconBase from '@suitejs/icon-base';

function DragHandle(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <path d="M40 18H8v4h32v-4zM8 30h32v-4H8v4z" />
    </IconBase>
  );
}

export default DragHandle;
