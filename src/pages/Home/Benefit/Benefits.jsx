import React from 'react';
import BenefitCard from '../../Home/Benefit/BenefitCard';

// 🖼️ Image imports (assets folder থেকে)
import fastDelivery from '../../../assets/benefits/Illustration.png';
import secureService from '../../../assets/benefits/live-tracking.png';
import support24 from '../../../assets/benefits/Group 4.png';

const benefits = [
  {
    image: fastDelivery,
    title: 'Fast & Reliable',
    description: 'We ensure quick delivery with real-time tracking for peace of mind.',
  },
  {
    image: secureService,
    title: 'Secure Service',
    description: 'Your parcels are safe with us. We handle them with utmost care.',
  },
  {
    image: support24,
    title: '24/7 Support',
    description: 'Our support team is always here to assist you—anytime, anywhere.',
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 space-y-6">
        {/* space-y-6 → কার্ডগুলোর মাঝে gap */}
        {benefits.map((item, idx) => (
          <BenefitCard
            key={idx}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Benefits;




// import React from 'react';
// import BenefitCard from '../../Home/Benefit/BenefitCard';

// // 🖼️ Image imports (assets folder থেকে)
// import fastDelivery from '../../../assets/benefits/Illustration.png';
// import secureService from '../../../assets/benefits/live-tracking.png';
// import support24 from '../../../assets/benefits/';
