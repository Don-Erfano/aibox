import { FC, SVGProps } from 'react';

interface DislikeIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}

const DislikeIcon: FC<DislikeIconProps> = ({
  strokeColor = '#464C4C',
  fillColor = 'none',
  size = 20,
  ...svgProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      {...svgProps}
    >
      <path
        d="M5.88268 9.57915L1.27185 9.57915C-0.849817 9.57915 1.90852 0.499988 3.42852 0.499988L13.8627 0.499988C14.0738 0.498211 14.277 0.580333 14.4277 0.728308C14.5783 0.876284 14.664 1.07801 14.666 1.28915L14.666 9.10999C14.666 9.39915 14.5052 9.66499 14.2477 9.80332C12.5293 10.725 10.5135 11.48 9.51602 13.2442L8.44935 15.1325C8.38576 15.2447 8.29339 15.3379 8.18177 15.4025C8.07015 15.4671 7.94331 15.5007 7.81435 15.5C5.16435 15.5 5.95018 11.6417 6.31018 10.1083C6.32466 10.0445 6.32449 9.97818 6.30968 9.91442C6.29487 9.85065 6.2658 9.79107 6.22466 9.74014C6.18352 9.68922 6.13138 9.64828 6.07215 9.6204C6.01292 9.59251 5.94814 9.57841 5.88268 9.57915Z"
        stroke={strokeColor}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DislikeIcon;
