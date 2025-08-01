import React from 'react';

const BenefitCard = ({ image, title, description }) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
      
      {/* Image Section */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden  border-2  p-2 bg-white shadow-inner group-hover:rotate-6 transition-transform duration-300">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Text Section */}
   <div className="text-center md:text-left ">
  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#CBEB67] transition-colors duration-300">
    {title}
  </h3>
  <p className="text-sm text-gray-600">{description}</p>
</div>

    </div>
  );
};

export default BenefitCard;
