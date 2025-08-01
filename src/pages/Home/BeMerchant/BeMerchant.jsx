import React from 'react';
import image from '../../../assets/location-merchant.png'
import merchantBg from '../../../assets/be-a-merchant-bg.png';

const BeMerchant = () => {
  return (
    <div 
      data-aos="zoom-in-up"
      className="bg-[#03373D] rounded-[2rem] bg-no-repeat bg-contain bg-top flex items-center justify-center px-6 h-auto md:h-[500px]"
      style={{ backgroundImage: `url(${merchantBg})` }}
    >
      <div className="hero-content flex-col lg:flex-row-reverse gap-6">
        <img
          src={image}
          className="max-w-sm rounded-lg shadow-2xl w-full sm:w-auto"
          alt="Merchant"
        />
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-6 text-white max-w-md">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center mt-6">
            <button className="btn bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md text-black font-semibold rounded-full px-6 w-full sm:w-auto">
              Become a Merchant
            </button>

            <button className="btn btn-outline rounded-full text-[#CAEB66] border-[#CAEB66] hover:bg-[#CAEB66] hover:text-white transition-all duration-300 font-semibold px-6 w-full sm:w-auto">
              Earn with Profast Courier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
