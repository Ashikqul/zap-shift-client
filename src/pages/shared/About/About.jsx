import { FaBullhorn, FaLaptopCode, FaChartLine } from "react-icons/fa";
import profileImage from '../../../assets/image.jpg';

const About = () => {
  return (
    <div className="w-11/12 mx-auto py-10 text-gray-800 dark:text-gray-200">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">
          About Me
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          I’m Ashikqul Islam, a passionate <span className="font-semibold text-blue-500">Digital Marketing Expert</span> and <span className="font-semibold text-green-500">Web Developer</span>. I help businesses grow online through targeted marketing strategies and modern web solutions.
        </p>
      </div>

      {/* Profile Image + Intro */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <img
          src={profileImage }
          alt="Ashikqul Islam"
          className="w-48 h-48 rounded-full object-cover border-4 border-primary shadow-lg"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Hi, I'm Ashikqul!</h2>
          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
            With over 6 years of experience in digital marketing and web development, I’ve worked with multiple brands and agencies to craft compelling campaigns and build fast, responsive websites. From SEO to Social Media Marketing, and React to Firebase – I build solutions that bring real results.
          </p>
        </div>
      </div>
{/* card */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-4 md:px-0">
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300 h-64 w-full flex flex-col justify-center">
        <FaBullhorn className="text-5xl mx-auto text-white mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Digital Marketing</h3>
        <p className="text-sm text-gray-200">
          SEO, SMM, YouTube SEO, Paid Ads, and more. I can help boost your online
          visibility and engagement.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300 h-64 w-full flex flex-col justify-center">
        <FaLaptopCode className="text-5xl mx-auto text-white mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Web Development</h3>
        <p className="text-sm text-gray-200">
          Modern, responsive websites using React, Tailwind CSS, Firebase,
          MongoDB, and Express.js.
        </p>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform duration-300 h-64 w-full flex flex-col justify-center">
        <FaChartLine className="text-5xl mx-auto text-white mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Strategy & Growth</h3>
        <p className="text-sm text-gray-200">
          Data-driven strategies to optimize performance, drive traffic, and increase
          ROI for businesses.
        </p>
      </div>
    </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Let’s work together!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Whether you're looking to grow your brand or build a stunning website, I’m here to help.
        </p>
       <a
  href="https://wa.me/+8801777629360"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-200"
>
  Contact Me
</a>
      </div>
    </div>
  );
};

export default About;
