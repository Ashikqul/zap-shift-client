import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy from the date of purchase. Items must be unused and in original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping usually takes 5-7 business days depending on your location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and times vary based on destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with tracking details.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Orders can be changed or canceled within 24 hours of placing them. Please contact our support team ASAP.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div  className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg mt-4">
      <h2 className="text-3xl font-bold mb-6 text-center ">Frequently Asked Questions (FAQ)</h2>
      <p className="text-2xl font-semibold mb-6 text-center ">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-200 rounded-box"
            onClick={() => toggleFAQ(index)}
          >
            <input type="checkbox" checked={openIndex === index} readOnly />
            <div className="collapse-title text-lg font-medium cursor-pointer">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
         className="btn bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md text-black font-semibold rounded-full px-6"
          onClick={() => alert("Contact Support clicked!")}
        >
See More FAQ’s</button>
      </div>
    </div>
  );
};

export default FAQ;
