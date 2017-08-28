import React from 'react';
import IconBase from '@suitejs/icon-base';

function BatteryCharging30(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <g>
        <path
          fillOpacity=".3"
          d="M31.33 8H28V4h-8v4h-3.33C15.19 8 14 9.19 14 10.67V29h4l8-15v11h4l-2.13 4H34V10.67C34 9.19 32.81 8 31.33 8z"
        />
        <path d="M22 40V29h-8v12.33A2.67 2.67 0 0 0 16.67 44h14.67a2.67 2.67 0 0 0 2.67-2.67V29h-6.13L22 40z" />
      </g>
    </IconBase>
  );
}

export default BatteryCharging30;
