import React from "react";
import mainbg from "../../images/store.png";

const Banner = () => {
  // For dynamic backgroundImage with Tailwind CSS, you can still use inline styles for this specific property
  // or alternatively handle it through global styles or a CSS module where you define custom classes
  const backgroundStyle = {
    backgroundImage: `url(${mainbg})`,
  };

  return (
    <>
      <div
        className="h-[40vh]  md:h-screen  w-[100vw]  bg-cover bg-no-repeat bg-top relative flex  items-center justify-center flex-col"
        style={backgroundStyle}
      >
      </div>
    </>
  );
};

export default Banner;
