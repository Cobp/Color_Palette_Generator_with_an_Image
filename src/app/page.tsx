import ColoredBars from "@/components/ColoredBars";
import Navbar from "@/Components/Navbar/navbar.jsx";
import CircularSlider from "@/Components/CircularSlider.jsx";
import ImagenColorExtractor from "@/Components/ImagenColorExtractor/ImagenColorExtractor.jsx";
import { IconPickerColor, IconGithub, IconImagePicker, IconUser, IconEdit } from "@/Icons/mainIcons";

const Home = () => {
  return (
    <>
    <Navbar />
    <main className="overflow-hidden">
      <section id="Hero" className="relative w-full h-screen flex justify-center px-3 md:px-8">
        <ColoredBars />
        <div className="flex flex-col md:flex-row items-center justify-between max-w-[85rem] w-full z-30">
          <article className="flex items-center md:items-start justify-center flex-col w-full h-full mt-16 sm:mt-0 gap-3 sm:gap-8">
            <h1 className="text-center md:text-start font-semibold text-[32px] md:text-6xl">
              Instant
              <strong className="relative font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-yellow-500 to-violet-500 mx-2">
                Color
                <i className="text-[var(--Foreground-Colour)] absolute bottom-3/4 left-3/4 size-6 md:size-12">
                  <IconPickerColor />
                </i>
              </strong>
              Generator by Images
            </h1>

            <p className="text-lg text-center md:text-start">
              Innovative tool designed to extract harmonious color palettes from
              any image
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Get started
              </button>
              <button
                type="button"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 hover:border-emerald-600 hover:text-emerald-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-emerald-500 dark:hover:border-emerald-600"
              >
                <i className="w-5 h-5">
                  <IconGithub />
                </i>
                GitHub
              </button>
            </div>
          </article>
          <div className="fondo-slider items-end flex md:items-center justify-center md:justify-end w-full h-full">
            <CircularSlider />
          </div>
        </div>
      </section>
      <section id="Services" className="max-w-[85rem] grid py-24 grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 lg:py-28 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex ">
          <i className="shrink-0 size-12">
            <IconImagePicker/>
          </i>
          <div className="ms-6">
            <h2 className="font-semibold mb-1 dark:text-white">
              Your Hexadecimal Palette of Images
            </h2>
            <p className="text-gray-600 leading-normal dark:text-neutral-400">
            Upload your image and instantly get hexadecimal color codes. Perfect for designers and creatives.
            </p>
          </div>
        </div>
        <div className="flex ">
          <i className="shrink-0 size-12">
            <IconEdit/>
          </i>
          <div className="ms-6">
            <h2 className="font-semibold mb-1 dark:text-white">
              Customizable & Perfect Contrast
            </h2>
            <p className="text-gray-600 leading-normal dark:text-neutral-400">
            Upload your image, adjust the extracted colors, and apply them with perfect contrast to your components.
            </p>
          </div>
        </div>
        <div className="flex ">
        <i className="shrink-0 size-12">
            <IconUser/>
          </i>
          <div className="ms-6">
            <h2 className="font-semibold mb-1 dark:text-white">
              Save & Explore Colors
            </h2>
            <p className="text-gray-600 leading-normal dark:text-neutral-400">
              Upload your image, save your colors, and discover unique palettes from other users.
            </p>
          </div>
        </div>
      </section>
      <section id="Examples" className="max-w-[85rem] grid grid-cols-3">

      </section>
      <ImagenColorExtractor />
    </main>
    </>
  );
};
export default Home;
