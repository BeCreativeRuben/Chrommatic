/**
 * Hero section component
 */

import { IMAGE_PATHS } from "../../utils/imagePaths";

function Hero() {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center text-center">
      <img
        src={IMAGE_PATHS.logo}
        alt="Chromattic logo"
        className="w-72 h-auto mb-6"
        loading="eager"
      />
      <h1 className="text-5xl font-bold">CHROMATTIC</h1>
    </div>
  );
}

export default Hero;

