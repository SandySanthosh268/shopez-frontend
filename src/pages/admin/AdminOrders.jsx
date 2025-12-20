import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, markOrderDelivered } from '../../features/admin/adminOrderSlice';

const AdminOrders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>

      {loading && <p>Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Paid</th>
              <th className="border p-2">Delivered</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border p-2 text-xs">{order._id}</td>
                <td className="border p-2">{order.user?.name || 'N/A'}</td>
                <td className="border p-2">₹{order.totalPrice}</td>
                <td className="border p-2">{order.isPaid ? 'Yes' : 'No'}</td>
                <td className="border p-2">{order.isDelivered ? 'Yes' : 'No'}</td>
                <td className="border p-2">
                  {!order.isDelivered && (
                    <button
                      onClick={() => dispatch(markOrderDelivered(order._id))}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
