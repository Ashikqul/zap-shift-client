import React from 'react';

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description, bgColor, hoverColor } = service;

  return (
    <div
      className={`card ${bgColor} ${hoverColor} shadow-md border border-white/30 
      transition-all duration-300 hover:scale-[1.03] cursor-pointer 
      backdrop-blur-md`}
    >
      <div className="card-body items-center text-center">
        {Icon && (
          <Icon className="text-5xl text-primary drop-shadow-md mb-4 transition-transform duration-300" />
        )}
        <h2 className="card-title text-xl font-bold text-gray-800">{title}</h2>

        {/* ✅ Description is clearly visible now */}
        <p className="text-sm text-gray-800 mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
