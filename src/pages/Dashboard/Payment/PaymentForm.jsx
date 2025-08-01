import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);  // State to track payment status

  // Load parcel data
  const { data: parcel, isLoading, error } = useQuery({
    queryKey: ['parcel', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Check payment status after parcel is loaded
  useEffect(() => {
    if (parcel?.paymentStatus === 'paid') {
      setPaid(true);
    }
  }, [parcel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !parcel || paid) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      const conversionRate = 100; // 100 BDT = 1 USD
      const amountInCents = Math.round((parcel.cost / conversionRate) * 100); // cents

      // Step 1: Create Payment Intent
      const { data } = await axiosSecure.post('/create-payment-intent', {
        amount: amountInCents,
      });
      const clientSecret = data.clientSecret;

      // Step 2: Create Payment Method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (pmError) {
        Swal.fire('Error', pmError.message, 'error');
        setProcessing(false);
        return;
      }

      // Step 3: Confirm Payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        Swal.fire('Error', confirmError.message, 'error');
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Step 4: Save payment info to DB
        const paymentInfo = {
          transactionId: paymentIntent.id,
          amount: parcel.cost,
          currency: 'BDT',
          paymentMethod: paymentIntent.payment_method_types[0],
          paymentTime: paymentIntent.created,
          status: 'paid',
        };
        await axiosSecure.patch(`/parcels/${id}/pay`, paymentInfo);

        Swal.fire('✅ Success!', 'Payment completed successfully!', 'success');
        setPaid(true); // Update paid state
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }

    setProcessing(false);
  };

  if (isLoading) return <p>Loading parcel info...</p>;
  if (error) return <p>Error loading parcel data</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-center text-[#03373D]">💳 Complete Your Payment</h2>

      <div className="mb-4 text-sm text-gray-700">
        <p><strong>📦 Title:</strong> {parcel.title}</p>
        <p><strong>💰 Amount:</strong> ৳{parcel.cost}</p>
        <p><strong>📌 Status:</strong> {parcel.paymentStatus}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border border-gray-300 rounded-md p-4">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing || paid}
          className="btn bg-[#03373D] text-white w-full hover:bg-[#022d32] disabled:opacity-50"
        >
          {processing ? 'Processing...' : paid ? 'Paid' : `Pay ৳${parcel.cost}`}
        </button>
      </form>

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-gray-800 rounded">
        <h4 className="font-semibold text-yellow-700 mb-1">🧪 Test Card Info</h4>
        <p><strong>Card:</strong> 4242 4242 4242 4242</p>
        <p><strong>Date:</strong> Any future date</p>
        <p><strong>CVC:</strong> Any 3 digits</p>
        <p><strong>ZIP:</strong> Any 5 digits</p>
      </div>
    </div>
  );
};

export default PaymentForm;
