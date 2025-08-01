import React from 'react';
import Marquee from 'react-fast-marquee';

// assets থেকে import করো
import client1 from '../../../assets/brands/amazon.png';
import client2 from '../../../assets/brands/amazon_vector.png';
import client3 from '../../../assets/brands/casio.png';
import client4 from '../../../assets/brands/moonstar.png';
import client5 from '../../../assets/brands/randstad.png';
import client6 from '../../../assets/brands/start-people 1.png';
import client7 from '../../../assets/brands/start.png';


const logos = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
];

const Clients = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">
          Trusted by Our Clients
        </h2>

       <Marquee
  gradient={false}
  speed={50}
  direction="right"
  pauseOnHover={true}
  className="space-x-12"
>
  {logos.map((logo, index) => (
    <img
      key={index}
      src={logo}
      alt={`Client ${index + 1}`}
      className="h-6 max-w-[120px] mx-25 opacity-90 hover:opacity-100 transition duration-300 object-contain"
    />
  ))}
</Marquee>
      </div>
    </section>
  );
};

export default Clients;
