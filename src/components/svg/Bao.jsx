import React from 'react';

export default function Bao({
  themeColor,
  themeColorLight,
  ...rest
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 204.6 191.45"
      {...rest}
    >
      <defs>
        <radialGradient
          id="radial-gradient"
          cx="102.3"
          cy="95.73"
          fx="147.27119584881314"
          fy="71.69427501618595"
          r="99.07"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={themeColor} />
          <stop offset="0.78" stopColor={themeColorLight} />
        </radialGradient>
      </defs>
      <g id="Layer_2" data-name="Layer 2">
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            d="M46.05,53.15c-10.73,6-22.1,11.63-29.88,21.12a74.48,74.48,0,0,0-9,15.06,82.6,82.6,0,0,0-5.5,13.74c-5.87,21.07,4.4,45.53,23.55,56.1,6,3.29,13.18,5.92,15.82,12.19,2.22,5.28.36,11.61,3.55,16.69a7.32,7.32,0,0,0,2,2.13c4.86,3.47,10.39-.78,12.51-5.56s2.25-10.08,5.07-14.44a4.38,4.38,0,0,1,2.94-2c3.15-.5,4.79,3.06,5.54,6,1.32,5.08,2.66,10.54,7.34,13.56a7.59,7.59,0,0,0,8.28.22c6.18-4.13.36-15.32,6.52-18,3.77-1.66,7.6,2.39,9.1,6.23s2.59,8.49,6.34,10.2,9.33,2.7,12.19.33c5.37-4.43,5.29-12.41,8.37-18.43,3-3,11.88-3,13,2,.56,2.52-2.32,8.49-1.73,11,1.14,4.82,6.5,7.71,11.44,7.52s9.48-2.74,13.54-5.57c5.47-3.81,10.76-8.63,12.52-15.07.52-1.88.76-4,2-5.46a12.39,12.39,0,0,1,4.18-2.7c9.21-4.69,14.54-14.75,16.93-24.81,4.41-18.6.64-38.1-3.92-56.68-3.26-13.28-7.27-27.09-16.89-36.8-7.29-7.35-17.07-11.59-26.62-15.56Q124.52,13.32,93.31,1.91C88.48.15,80.24-1.91,76.81,3.41c-4.69,7.28,6,11.92,5.39,19C81.06,35.28,55.84,47.69,46.05,53.15Z"
            fill="url(#radial-gradient)"
          />
          <path
            d="M128.83,46.33a1.08,1.08,0,0,1,.24-.67c.48-.51,1.49-.21,2.12.18,3.87,2.42,5.59,6.43,6.57,10.29a13.34,13.34,0,0,1,.29,7.08c-.47,1.59-2.4,4.95-5,4.78-2.81-.18-2.9-3.89-3.3-5.61A46.65,46.65,0,0,1,128.83,46.33Z"
            fill="#fff5e9"
          />
          <path
            d="M155.13,44.27a1.4,1.4,0,0,0-.38-.6c-.51-.38-1.21.14-1.58.66-2.33,3.18-2.54,7.42-2.23,11.35a16.49,16.49,0,0,0,1.73,6.86c.81,1.42,3.22,4.22,5.17,3.49,2.12-.81,1.16-4.39,1-6.12A57.56,57.56,0,0,0,155.13,44.27Z"
            fill="#fff5e9"
          />
          <path
            d="M144.1,73.48c-.59,0-1.29,0-1.59.56a1.63,1.63,0,0,0,.08,1.44,7.09,7.09,0,0,0,4,4.19c1.89.63,4.32-.21,4.95-2.1a7.83,7.83,0,0,0,.26-1.26c.37-2.15.8-2.73-1.67-2.81C148.11,73.43,146.1,73.48,144.1,73.48Z"
            fill="#726d68"
          />
          <ellipse
            cx="107.52"
            cy="76"
            rx="21"
            ry="16"
            transform="translate(-4.25 6.41) rotate(-3.35)"
            fill="#fce9b4"
            opacity="0.25"
          />
          <ellipse
            cx="176.02"
            cy="75.85"
            rx="14.86"
            ry="19.5"
            transform="matrix(0.15, -0.99, 0.99, 0.15, 74.62, 238.5)"
            fill="#fce9b4"
            opacity="0.25"
          />
        </g>
      </g>
    </svg>
  );
}
