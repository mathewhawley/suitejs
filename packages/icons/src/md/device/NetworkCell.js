import React from 'react';
import IconBase from '@suitejs/icon-base';

function NetworkCell(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <g>
        <polygon fillOpacity=".3" points="4 44 44 44 44 4" />
        <polygon points="34 14 4 44 34 44" />
      </g>
    </IconBase>
  );
}

export default NetworkCell;
