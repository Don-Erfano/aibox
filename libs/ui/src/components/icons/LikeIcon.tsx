import { FC, SVGProps } from "react";

interface LikeIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}

const LikeIcon: FC<LikeIconProps> = ({
  strokeColor = "#464C4C",
  fillColor = "none",
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
        d="M12.1173 8.42085H16.7282C18.8498 8.42085 16.0915 17.5 14.5715 17.5H4.13732C3.92617 17.5018 3.72295 17.4197 3.57232 17.2717C3.42169 17.1237 3.33596 16.922 3.33398 16.7108V8.89001C3.33398 8.60085 3.49482 8.33501 3.75232 8.19668C5.47065 7.27501 7.48648 6.52001 8.48398 4.75585L9.55065 2.86751C9.61424 2.75531 9.70661 2.66211 9.81823 2.59751C9.92985 2.53291 10.0567 2.49925 10.1857 2.50001C12.8357 2.50001 12.0498 6.35835 11.6898 7.89168C11.6753 7.95552 11.6755 8.02182 11.6903 8.08558C11.7051 8.14935 11.7342 8.20893 11.7753 8.25986C11.8165 8.31078 11.8686 8.35172 11.9278 8.3796C11.9871 8.40749 12.0519 8.42159 12.1173 8.42085Z"
        stroke={strokeColor}
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LikeIcon;
