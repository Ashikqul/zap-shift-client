import React, { useState } from "react";

const reviews = [
  {
    id: 1,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Excellent service and quick response. Highly recommend!",
    name: "John Doe",
    customerImage: "https://randomuser.me/api/portraits/men/1.jpg",
    position: "Project Manager"
  },
  {
    id: 2,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Very satisfied with the quality and professionalism.",
    name: "Emma Watson",
    customerImage: "https://randomuser.me/api/portraits/women/2.jpg",
    position: "Marketing Specialist"
  },
  {
    id: 3,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Great experience from start to finish.",
    name: "Michael Smith",
    customerImage: "https://randomuser.me/api/portraits/men/3.jpg",
    position: "Software Engineer"
  },
  {
    id: 4,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Friendly staff and reliable support.",
    name: "Sophia Lee",
    customerImage: "https://randomuser.me/api/portraits/women/4.jpg",
    position: "HR Manager"
  },
  {
    id: 5,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "The team exceeded my expectations.",
    name: "David Johnson",
    customerImage: "https://randomuser.me/api/portraits/men/5.jpg",
    position: "Business Analyst"
  },
  {
    id: 6,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Quality work delivered on time.",
    name: "Olivia Brown",
    customerImage: "https://randomuser.me/api/portraits/women/6.jpg",
    position: "Content Creator"
  },
  {
    id: 7,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Professional and efficient service.",
    name: "James Wilson",
    customerImage: "https://randomuser.me/api/portraits/men/7.jpg",
    position: "Consultant"
  },
  {
    id: 8,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "I appreciate their attention to detail.",
    name: "Isabella Martinez",
    customerImage: "https://randomuser.me/api/portraits/women/8.jpg",
    position: "Graphic Designer"
  },
  {
    id: 9,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Highly professional team with great communication.",
    name: "William Garcia",
    customerImage: "https://randomuser.me/api/portraits/men/9.jpg",
    position: "Sales Manager"
  },
  {
    id: 10,
    quoteImage: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
    review: "Outstanding support and excellent results.",
    name: "Mia Davis",
    customerImage: "https://randomuser.me/api/portraits/women/10.jpg",
    position: "Product Owner"
  }
];

const mainColor = "#CAEB66";

const ReviewClient = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  };

  const next = () => {
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const { quoteImage, review, name, customerImage, position } = reviews[currentIndex];

  return (
    <div
      className="w-full p-6 min-h-screen flex flex-col items-center justify-center rounded-4xl mt-4"
      style={{ background: "linear-gradient(135deg, #f0f8cc 0%, #e6f3a7 100%)" }}
    >
      <h2
        className="text-4xl font-extrabold mb-12 tracking-wide text-center w-full max-w-6xl drop-shadow-md"
       
      >
What our customers are sayings</h2>
<p className="text-2xl font-semibold mb-12 tracking-wide text-center w-full max-w-6xl drop-shadow-md">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-6xl
                   hover:scale-[1.02] transform transition-transform duration-300 ease-in-out"
        style={{ border: `4px solid ${mainColor}` }}
      >
        <img
          src={quoteImage}
          alt="quote"
          className="w-12 absolute top-6 left-6 opacity-20"
          style={{ filter: `drop-shadow(0 0 2px ${mainColor})` }}
        />
        <p
          className="italic text-xl mb-10 leading-relaxed tracking-wide"
          style={{ color: "#455a13" }}
        >
          “{review}”
        </p>

        <div className="flex items-center gap-6">
          <img
            src={customerImage}
            alt={name}
            className="w-20 h-20 rounded-full shadow-lg object-cover"
            style={{ border: `4px solid ${mainColor}` }}
          />
          <div>
            <h3
              className="text-2xl font-semibold"
              style={{ color: mainColor }}
            >
              {name}
            </h3>
            <p
              className="text-sm tracking-wide"
              style={{ color: "#748c2a" }}
            >
              {position}
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-8 mt-14">
        <button
          onClick={prev}
          className="rounded-full px-8 py-3 font-semibold  bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md"
          style={{
            backgroundColor: mainColor,
            color: "#333",
            boxShadow: `0 4px 10px ${mainColor}AA`,
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b7d147")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = mainColor)}
          aria-label="Previous Review"
        >
          Previous
        </button>
        <button
          onClick={next}
          className="rounded-full px-8 py-3 font-semibold bg-gradient-to-r from-[#CBEC68] to-[#F9F871] hover:from-[#f9f871] hover:to-[#CBEC68] transition-all duration-300 shadow-md"
          style={{
            backgroundColor: mainColor,
            color: "#333",
            boxShadow: `0 4px 10px ${mainColor}AA`,
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b7d147")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = mainColor)}
          aria-label="Next Review"
        >
          Next
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex mt-10 space-x-4 justify-center">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className="w-5 h-5 rounded-full shadow-md transition-colors"
            aria-label={`Go to review ${index + 1}`}
            style={{
              backgroundColor: index === currentIndex ? mainColor : "#d9e7a0",
              boxShadow: index === currentIndex ? `0 0 8px ${mainColor}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewClient;
