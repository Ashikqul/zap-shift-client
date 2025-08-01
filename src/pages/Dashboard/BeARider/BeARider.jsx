import React, { useState, useEffect } from 'react';
import riderImage from '../../../assets/agent-pending.png';
import useAuth from '../../../hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const districts = [
    "Bagerhat", "Bandarban", "Barguna", "Barisal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur",
    "Chapai Nawabganj", "Chattogram", "Chuadanga", "Comilla", "Cox's Bazar", "Dhaka", "Dinajpur",
    "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore",
    "Jhalokati", "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj", "Kurigram",
    "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj", "Meherpur",
    "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi",
    "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
    "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur",
    "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nid: '',
    age: '',
    district: '',
    bikeReg: '',
    whyRider: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { fullName, email, phone, nid, age, district, bikeReg } = formData;

    if (!fullName || !email || !phone || !nid || !age || !district || !bikeReg) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (+age < 18) {
      Swal.fire({
        title: 'Not Allowed!',
        text: 'You must be at least 18 years old to apply.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const newRider = {
      ...formData,
      status: 'pending', // ✅ status add
      appliedAt: new Date()
    };

    axiosSecure.post('/riders', newRider)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Your application is pending approval.',
            icon: 'success',
            confirmButtonText: 'OK'
          });

          setFormData({
            fullName: '',
            email: '',
            phone: '',
            nid: '',
            age: '',
            district: '',
            bikeReg: '',
            whyRider: ''
          });
        }
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#03373D] px-4 py-12 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 relative">

        {/* Light Effect */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-1/2 overflow-hidden rounded-r-3xl">
          <div className="light-effect" />
        </div>

        {/* Form */}
        <div className="p-8 md:p-12 z-10 text-black">
          <h2 className="text-3xl font-bold text-[#03373D] mb-6">🚴 Become a ProFast Rider</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold">Full Name</label>
              <input
                name="fullName"
                className="input input-bordered w-full"
                placeholder="Enter Your Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">NID Card Number</label>
                <input
                  name="nid"
                  className="input input-bordered w-full"
                  placeholder="10/17 digit NID"
                  value={formData.nid}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  min="18"
                  className="input input-bordered w-full"
                  placeholder="18+"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">District</label>
                <select
                  name="district"
                  className="select select-bordered w-full"
                  value={formData.district}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Choose your district</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="font-semibold">Bike Registration Number</label>
                <input
                  name="bikeReg"
                  className="input input-bordered w-full"
                  placeholder="DHAKA-METRO-HA-123456"
                  value={formData.bikeReg}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Why do you want to be a rider?</label>
              <textarea
                name="whyRider"
                rows="3"
                className="textarea textarea-bordered w-full"
                placeholder="Write here..."
                value={formData.whyRider}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#CBEC68] text-black hover:bg-[#aade82] px-8"
            >
              Apply Now
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="hidden md:flex items-center justify-center p-8 z-10">
          <img
            src={riderImage}
            alt="Rider"
            className="max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
