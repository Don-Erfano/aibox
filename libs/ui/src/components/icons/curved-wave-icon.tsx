import React, { FC } from "react";
import { ISvgIconProps } from "./interface";

const CurvedWaveIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="235"
      height="50"
      viewBox="0 0 235 50"
      fill="none"
      {...props}
    >
      <path
        opacity="0.03"
        d="M0.306641 49.0921C84.7658 -5.70041 164.787 -2.87359 195.396 3.24715C229.904 10.1468 244.371 30.6875 227.212 48.5173L0.306641 49.0921Z"
        fill="url(#paint0_linear_16352_289943)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_16352_289943"
          x1="4.0323"
          y1="64.9338"
          x2="46.0734"
          y2="-105.264"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#267FE5" />
          <stop offset="0.559" stopColor="#4570D4" />
          <stop offset="0.669" stopColor="#386EDB" />
          <stop offset="0.869" stopColor="#1869EF" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CurvedWaveIcon;
