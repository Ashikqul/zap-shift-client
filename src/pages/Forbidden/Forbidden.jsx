import React from 'react';
import { Link } from 'react-router';
import Lottie from "lottie-react";
import forbiddenAnimation from '../../assets/Animation - 1751833050453.json'; // adjust path if needed

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <Lottie animationData={forbiddenAnimation} loop={true} className="w-64 h-64 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">403 - Access Forbidden</h1>
      <p className="text-gray-600 mb-4">
        You do not have permission to view this page.
      </p>
     <Link
  to="/"
  className="px-5 py-2 rounded-md font-semibold text-black bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md"
>
  Go to Homepage
</Link>
    </div>
  );
};

export default Forbidden;
