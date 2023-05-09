"use client";

import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <div>
      <RotatingLines
        strokeColor="white"
        strokeWidth="3"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    </div>
  );
}

export default Loader;
