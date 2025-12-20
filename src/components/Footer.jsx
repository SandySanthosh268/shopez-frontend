const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Shopez</h2>
          <p className="text-sm">A modern MERN e-commerce platform for smart shopping.</p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Products</li>
            <li>My Orders</li>
            <li>Cart</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-2">Contact</h3>
          <p className="text-sm">Email: support@shopez.com</p>
          <p className="text-sm">Phone: +91 90000 00000</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} Shopez. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
