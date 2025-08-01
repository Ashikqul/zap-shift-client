import React from 'react';
import ServiceCard from '../../Home/Services/ServicesCard';
import {
  FaShippingFast,
  FaGlobe,
  FaStore,
  FaMoneyBillWave,
  FaHandshake,
  FaUndo,
} from 'react-icons/fa';

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: FaShippingFast,
    bgColor: "bg-blue-100",
    hoverColor: "hover:bg-blue-200",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: FaGlobe,
    bgColor: "bg-green-100",
    hoverColor: "hover:bg-green-200",
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: FaStore,
    bgColor: "bg-yellow-100",
    hoverColor: "hover:bg-yellow-200",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: FaMoneyBillWave,
    bgColor: "bg-pink-100",
    hoverColor: "hover:bg-pink-200",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: FaHandshake,
    bgColor: "bg-purple-100",
    hoverColor: "hover:bg-purple-200",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: FaUndo,
    bgColor: "bg-red-100",
    hoverColor: "hover:bg-red-200",
  },
];


const OurServices = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-600">
            Delivering speed, reliability, and convenience nationwide
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
