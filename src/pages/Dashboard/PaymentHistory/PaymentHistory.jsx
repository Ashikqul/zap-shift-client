import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';
import { FaMoneyCheckAlt } from 'react-icons/fa';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ['payments', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Loading payment history...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error loading payments</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-[#03373D]">
        <FaMoneyCheckAlt className="text-[#03373D]" /> Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="table-auto w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Transaction ID</th>
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Currency</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{p.title}</td>
                  <td className="p-3 border">{p.payment.transactionId}</td>
                  <td className="p-3 border">৳{p.payment.amount}</td>
                  <td className="p-3 border">{p.payment.currency}</td>
                  <td className="p-3 border">
                    {new Date(p.payment.paymentTime).toLocaleString('en-BD', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
