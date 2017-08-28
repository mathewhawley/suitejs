import React from 'react';
import IconBase from '@suitejs/icon-base';

function PageView(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <path d="M23 18c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM40 8c2.21 0 4 1.79 4 4v24c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V12c0-2.21 1.79-4 4-4h32zm-6.41 28.41l2.83-2.84-5.82-5.8c.88-1.38 1.4-3.01 1.4-4.77a9 9 0 1 0-9 9c1.76 0 3.39-.52 4.78-1.4l5.81 5.81z" />
    </IconBase>
  );
}

export default PageView;
