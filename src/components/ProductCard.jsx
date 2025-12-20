import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden">
      {/* IMAGE CONTAINER */}
      <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <img src={product.image} className="h-48 w-full object-contain bg-gray-100" />
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>

        <p className="text-lg font-bold text-red-500">₹{product.price}</p>

        <button
          onClick={addToCartHandler}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
