import React from 'react';
import IconBase from '@suitejs/icon-base';

function BatteryCharging20(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <g>
        <path d="M22 40v-6h-8v7.33A2.67 2.67 0 0 0 16.67 44h14.67a2.67 2.67 0 0 0 2.67-2.67V34h-8.8L22 40z" />
        <path
          fillOpacity=".3"
          d="M31.33 8H28V4h-8v4h-3.33C15.19 8 14 9.19 14 10.67V34h8v-5h-4l8-15v11h4l-4.8 9H34V10.67C34 9.19 32.81 8 31.33 8z"
        />
      </g>
    </IconBase>
  );
}

export default BatteryCharging20;
