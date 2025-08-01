import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hook/useAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handlePay = (parcel) => {
    if (parcel.payment?.status === 'paid') {
      Swal.fire({
        icon: 'info',
        title: 'Already Paid',
        text: 'This parcel has already been paid for.',
      });
    } else {
      navigate(`/dashboard/payment/${parcel._id}`);
    }
  };

  const handleDelete = (parcel) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete parcel: ${parcel.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/parcels/${parcel._id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Parcel deleted.', 'success');
          refetch();
        }
      }
    });
  };

  const handleView = (parcel) => setSelectedParcel(parcel);
  const closeModal = () => setSelectedParcel(null);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-[#03373D]">📦 My Parcels</h2>
      <table className="table w-full border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-[#03373D] text-white">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Title</th>
            <th>Tracking ID</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id} className="hover:bg-gray-50">
              <td>{index + 1}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{parcel.title}</td>
              <td>{parcel.trackingId}</td>
              <td>{parcel.creation_date}</td>
              <td>৳{parcel.cost}</td>
              <td>
                {parcel.payment?.status === 'paid' ? (
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                    Paid
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                    Unpaid
                  </span>
                )}
              </td>
              <td className="flex space-x-2 items-center justify-center">
                <button onClick={() => handleView(parcel)} className="btn btn-xs bg-blue-500 text-white">
                  View
                </button>
                <button
                  onClick={() => handlePay(parcel)}
                  disabled={parcel.payment?.status === 'paid'}
                  className={`btn btn-xs text-white ${
                    parcel.payment?.status === 'paid'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {parcel.payment?.status === 'paid' ? 'Paid' : 'Pay'}
                </button>
                <button onClick={() => handleDelete(parcel)} className="btn btn-xs bg-red-500 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedParcel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600">
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Parcel Details</h3>
            <p><strong>Title:</strong> {selectedParcel.title}</p>
            <p><strong>Type:</strong> {selectedParcel.type}</p>
            <p><strong>Tracking ID:</strong> {selectedParcel.trackingId}</p>
            <p><strong>Sender:</strong> {selectedParcel.senderName}</p>
            <p><strong>Receiver:</strong> {selectedParcel.receiverName}</p>
            <p><strong>Cost:</strong> ৳{selectedParcel.cost}</p>
            <p><strong>Status:</strong> {selectedParcel.payment?.status || 'Unpaid'}</p>
            <p><strong>Created:</strong> {selectedParcel.creation_date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
