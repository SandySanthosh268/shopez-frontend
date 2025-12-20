import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createOrder, resetOrder } from '../features/order/orderSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiHome } from 'react-icons/fi';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.order);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate('/');
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* SHIPPING FORM */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiMapPin />
          Shipping Address
        </h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="space-y-3">
          <input
            placeholder="Address"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            placeholder="City"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            placeholder="Postal Code"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <input
            placeholder="Country"
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
      </div>

      {/* ORDER SUMMARY */}
      <div className="bg-white shadow rounded-lg p-6 h-fit">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiHome />
          Order Summary
        </h2>

        <div className="space-y-3 mb-6">
          {cartItems.map((item) => (
            <div key={item.product} className="flex justify-between text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={placeOrderHandler}
          disabled={loading || cartItems.length === 0}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
