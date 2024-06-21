/* eslint-disable react/prop-types */
import { Parallax } from 'react-scroll-parallax';
import banner from '../assets/banner.jpg';

const Banner = ({ title, subtitle }) => {
  return (
    <section className="relative overflow-hidden h-96">
      <Parallax className="absolute inset-0" speed={-20} tagouter="figure">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      </Parallax>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 py-20 text-center">
          <Parallax speed={10}>
            <h1 className="text-4xl font-bold text-white">{title}</h1>
            <p className="text-xl font-bold text-white">{subtitle}</p>
          </Parallax>
        </div>
      </div>
    </section>
  );
};

export default Banner;
