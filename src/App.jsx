import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Layout */
import Header from './components/Header';
import Footer from './components/Footer';

/* Pages */
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';

/* Admin Pages */
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

/* Route Guards */
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Register from './pages/Register';
import AdminCreateProduct from './pages/admin/AdminCreateProduct';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <BrowserRouter>
      {/* Global Layout */}
      <Header />

      <main className="min-h-screen">
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ================= USER PROTECTED ================= */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>

          {/* ================= ADMIN PROTECTED ================= */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/products/create" element={<AdminCreateProduct />} />
            <Route path="/admin/products/:id/edit" element={<AdminEditProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
