// src/pages/SendParcel/SendParcel.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useNavigate } from 'react-router';

const divisions = {
  Dhaka: ["Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail"],
  Chattogram: ["Bandarban", "Brahmanbaria", "Chandpur", "Chattogram", "Cumilla", "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali", "Rangamati"],
  Khulna: ["Bagerhat", "Chuadanga", "Jashore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"],
  Barisal: ["Barisal", "Barguna", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"],
  Rajshahi: ["Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj"],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
  Rangpur: ["Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon"],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"]
};

// 🔢 Tracking ID generator
const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

// 📦 Cost Calculator
const calcCost = ({ type, region, weight }) => {
  const w = parseFloat(weight || 0);
  let base = 0;
  let extra = 0;
  let extraNote = '';

  if (type === 'document') {
    base = region === 'Inside City' ? 60 : 80;
  } else if (type === 'non-document') {
    if (w <= 3) {
      base = region === 'Inside City' ? 110 : 150;
    } else {
      const extraWeight = w - 3;
      extra = Math.ceil(extraWeight) * 40;
      base = region === 'Inside City' ? 110 : 150 + 40;
      extraNote = `${Math.ceil(extraWeight)} kg x ৳40`;
    }
  }

  return {
    base,
    extra,
    total: base + extra,
    extraNote,
    weight: w
  };
};

const SendParcel = () => {
  const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

const navigate = useNavigate()


  const type = watch('type');
  const senderDivision = watch('senderDivision');
  const receiverDivision = watch('receiverDivision');

  const onSubmit = (data) => {
    if (!user || !user.email) {
      return Swal.fire({
        icon: 'warning',
        title: 'Please login first',
        text: 'You need to be logged in to send a parcel.'
      });
    }

    const { base, extra, total, extraNote, weight } = calcCost({
      type: data.type,
      region: data.receiverRegion,
      weight: data.weight
    });

    const isNonDoc = data.type === 'non-document';

    const breakdownHTML = `
      <div style="text-align: left; font-size: 14px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td><strong>Parcel Type</strong></td><td>${data.type.replace('-', ' ')}</td></tr>
          <tr><td><strong>Delivery To</strong></td><td>${data.receiverRegion}</td></tr>
          ${isNonDoc ? `<tr><td><strong>Weight</strong></td><td>${weight} kg</td></tr>` : ''}
          <tr><td><strong>Base Cost</strong></td><td>৳${base}</td></tr>
          ${extra > 0 ? `<tr><td><strong>Additional Charges</strong></td><td>৳${extra} <small>(${extraNote})</small></td></tr>` : ''}
          <tr style="border-top: 1px solid #ccc;"><td><strong style="font-size: 16px;">Total</strong></td><td><strong style="color: green; font-size: 18px;">৳${total}</strong></td></tr>
        </table>
      </div>
    `;

    Swal.fire({
      icon: 'info',
      title: '📦 Delivery Cost Breakdown',
      html: breakdownHTML,
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#F59E0B',
      confirmButtonText: '✅ Proceed to Payment',
      cancelButtonText: '✏️ Edit Again'
    }).then((res) => {
      if (res.isConfirmed) {
        const parcelData = {
          ...data,
          email: user.email,
          trackingId: generateTrackingID(),
          cost: total,
          creation_date: moment().format('YYYY-MM-DD HH:mm:ss'),
          creation_time: moment().format('hh:mm A')
        };

       axiosSecure.post('/parcels', parcelData)
  .then(response => {
    if (response.data.insertedId) {
      console.log('✅ Parcel inserted with ID:', response.data.insertedId);

// TODO: redirect to a payment page 

      Swal.fire({
        icon: 'success',
        title: '✅ Success!',
        text: `Tracking ID: ${parcelData.trackingId}`,
        timer: 2000,
        showConfirmButton: false
      });

      reset();

            navigate('/dashboard/myParcels')

    } else {
      throw new Error('No insertedId returned!');
    }


  })
  .catch(error => {
    console.error('❌ Failed to save parcel:', error);
    Swal.fire({
      icon: 'error',
      title: 'Failed!',
      text: 'Could not save your parcel. Please try again.'
    });
  });

      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[#03373D]">📦 Send Parcel</h2>
      <p className="text-center text-gray-500 mb-8">Fill out the form to book your delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="bg-base-100 p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-[#03373D]">Parcel Info</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-4">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-[#CBEC68]"
                />
                <span className="ml-2">Document</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  value="non-document"
                  {...register("type", { required: true })}
                  className="radio checked:bg-[#CBEC68]"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
            <input
              {...register('title', { required: true })}
              className="input input-bordered w-full"
              placeholder="Parcel Title"
            />
           
            <input
              type="number"
              step="0.1"
              className="input input-bordered w-full"
              placeholder="Weight (kg)"
              {...register('weight')}
              disabled={type === 'document'}
            />
          </div>
          {errors.type && <p className="text-red-500 text-sm mt-2">Parcel type is required</p>}
          {errors.title && <p className="text-red-500 text-sm">Parcel title is required</p>}
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4 text-[#03373D]">Sender Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                {...register('senderName', { required: true })}
                className="input input-bordered w-full"
                placeholder="Sender Name"
                defaultValue="Ashik"
              />
              <input
                {...register('senderContact', { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact Number"
              />

              {/* Division */}
              <select
                {...register('senderDivision', { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Division</option>
                {Object.keys(divisions).map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              {/* District */}
              <select
                {...register('senderRegion', { required: true })}
                className="select select-bordered w-full"
                disabled={!senderDivision}
              >
                <option value="">
                  {senderDivision ? 'Select District' : 'Select Division First'}
                </option>
                {senderDivision &&
                  divisions[senderDivision].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>

              <input
                {...register('senderCenter', { required: true })}
                className="input input-bordered w-full"
                placeholder="Select Service Center"
              />
              <textarea
                {...register('senderAddress', { required: true })}
                rows={2}
                className="textarea textarea-bordered w-full sm:col-span-2"
                placeholder="Sender Address"
              />
              <textarea
                {...register('pickupInstruction', { required: true })}
                rows={2}
                className="textarea textarea-bordered w-full sm:col-span-2"
                placeholder="Pick-up Instruction"
              />
            </div>
          </div>

          {/* Receiver */}
          <div className="bg-base-100 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4 text-[#03373D]">Receiver Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                {...register('receiverName', { required: true })}
                className="input input-bordered w-full"
                placeholder="Receiver Name"
              />
              <input
                {...register('receiverContact', { required: true })}
                className="input input-bordered w-full"
                placeholder="Contact Number"
              />

              {/* Division */}
              <select
                {...register('receiverDivision', { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Division</option>
                {Object.keys(divisions).map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>

              {/* District */}
              <select
                {...register('receiverRegion', { required: true })}
                className="select select-bordered w-full"
                disabled={!receiverDivision}
              >
                <option value="">
                  {receiverDivision ? 'Select District' : 'Select Division First'}
                </option>
                {receiverDivision &&
                  divisions[receiverDivision].map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
              </select>

              <input
                {...register('receiverCenter', { required: true })}
                className="input input-bordered w-full"
                placeholder="Select Service Center"
              />
              <textarea
                {...register('receiverAddress', { required: true })}
                rows={2}
                className="textarea textarea-bordered w-full sm:col-span-2"
                placeholder="Receiver Address"
              />
              <textarea
                {...register('deliveryInstruction', { required: true })}
                rows={2}
                className="textarea textarea-bordered w-full sm:col-span-2"
                placeholder="Delivery Instruction"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-[#CBEC68] text-black font-bold w-full"
        >
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
