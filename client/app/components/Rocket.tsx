import React from "react";

// Define the types for the props
interface RocketIconProps {
  height?: string | number; // optional height prop (default: 51.06)
  fillColor?: string; // optional color for the fill (default: #0379d4)
}

const RocketIcon: React.FC<RocketIconProps> = ({
  height = "35.06",
  fillColor = "#0379d4",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30.72 51.06"
      id="rocket"
      height={height}
    >
      <g>
        <g>
          <path
            fill="#000000"
            d="M1.59 33.26 3.32 28l4.27-3.64S9.06 6.45 15.25 2c0 0 7.34 8.17 7.15 23 0 0 5.24 2.36 5.75 7l-5.56-1.92-.95 4.85H8.74l-2.3-4.59Z"
          ></path>
          <path
            fill={fillColor}
            d="M15.39 4.16A31.52 31.52 0 0 1 22 23.85v1.7l1.44.89a9.11 9.11 0 0 1 3.91 5 17.26 17.26 0 0 0-1.82-1.19l-3.84-2.19-.69 4.42a11.36 11.36 0 0 1-.24 1.16H10c-.16-.5-.29-1-.41-1.52l-.87-4-3.54 2a17.23 17.23 0 0 0-1.71 1.11 9.48 9.48 0 0 1 3.85-5l1.37-.89v-1.58a32.31 32.31 0 0 1 6.71-19.6m0-4.16a.93.93 0 0 0-.61.23l-.09.08a35.36 35.36 0 0 0-9 23.44A12.44 12.44 0 0 0 1 39a13.69 13.69 0 0 1 5.68-6.24 21.76 21.76 0 0 0 1 3.19.94.94 0 0 0 .9.7h13.88c.28 0 .56-.27.7-.69a13 13 0 0 0 .84-3.07 13.58 13.58 0 0 1 5.68 6.24A12.11 12.11 0 0 0 25 23.89 34.59 34.59 0 0 0 16.08.31a.93.93 0 0 0-.69-.31Z"
          ></path>
          <path
            fill={fillColor}
            d="M15.39 22.92A3.89 3.89 0 1 1 19.28 19a3.79 3.79 0 0 1-3.7 3.88.6.6 0 0 1-.19 0Z"
          ></path>
          <path
            fill="#5e60ca"
            d="M20.8 39.14A1.88 1.88 0 0 0 18.86 41v5.9a1.94 1.94 0 0 0 3.88 0v-5.82a1.88 1.88 0 0 0-1.85-1.94Z"
          ></path>
          <path
            fill="#5e60ca"
            d="M10 39.14A1.9 1.9 0 0 0 8 41v5.9a1.94 1.94 0 1 0 3.88 0v-5.82a1.88 1.88 0 0 0-1.85-1.94Z"
          ></path>
          <path
            fill="#5e60ca"
            d="M15.25 39.14A1.9 1.9 0 0 0 13.31 41v8.13a1.94 1.94 0 0 0 3.88 0v-8a1.88 1.88 0 0 0-1.85-1.94Z"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default RocketIcon;
