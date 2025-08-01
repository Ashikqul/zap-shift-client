import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const TrackParcels = () => {
  const [trackingId, setTrackingId] = useState('');
  const [parcel, setParcel] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingId) {
      Swal.fire('Warning', 'Please enter a Tracking ID', 'warning');
      return;
    }

    try {
      const res = await axiosSecure.get(`/parcels/track/${trackingId}`);
      setParcel(res.data);
    } catch (error) {
      Swal.fire('Not Found', 'No parcel found with that Tracking ID', 'error');
      setParcel(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-[#03373D]">📦 Track Your Parcel</h2>

      <form onSubmit={handleTrack} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="btn bg-[#03373D] text-white hover:bg-[#022d32] px-4"
        >
          Track
        </button>
      </form>

      {parcel && (
        <div className="border p-4 rounded bg-gray-50">
          <p><strong>📦 Title:</strong> {parcel.title}</p>
          <p><strong>💰 Cost:</strong> ৳{parcel.cost}</p>
          <p><strong>🚚 Status:</strong> {parcel.status}</p>
          <p><strong>📍 Current Location:</strong> {parcel.currentLocation || 'N/A'}</p>
          <p><strong>🕒 Estimated Delivery:</strong> {parcel.estimatedDelivery || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default TrackParcels;
