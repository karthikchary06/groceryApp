import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Minus, Star } from "lucide-react";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const cartItem = cartItems.find((i) => i.id === product.id);
  const qty = cartItem?.quantity || 0;
  const [imgError, setImgError] = useState(false);

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div
      className="flex flex-col overflow-hidden bg-white border border-gray-100 cursor-pointer card-hover rounded-2xl group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image */}
      <div className="relative flex items-center justify-center p-3 pt-4 bg-gray-50 h-36">
        {product.badge && (
          <span
            className={`absolute top-2 left-2 text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none z-10
            ${
              product.badge === "FRESH"
                ? "bg-green-100 text-green-700"
                : product.badge === "BEST SELLER"
                  ? "bg-orange-100 text-orange-700"
                  : product.badge === "POPULAR"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 text-[10px] font-black bg-green-500 text-white px-1.5 py-0.5 rounded-md leading-none">
            {discount}% OFF
          </span>
        )}
        <img
          src={imgError ? "https://placehold.co/150" : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          className="object-cover w-full h-24 rounded-xl"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-3">
        <div className="flex items-center gap-1 mb-1">
          <Star size={10} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] text-gray-500 font-medium">
            {product.rating}
          </span>
        </div>
        <p className="text-xs font-semibold text-gray-900 leading-snug mb-0.5 line-clamp-2">
          {product.name}
        </p>
        <p className="text-[10px] text-gray-400 mb-2">{product.unit}</p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-sm font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-gray-400 line-through ml-1">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addToCart(product));
              }}
              className="btn-add border-2 border-blinkit-green text-blinkit-green rounded-lg px-3 py-1.5 text-xs font-bold hover:bg-blinkit-green hover:text-white transition-all duration-150 flex items-center gap-1"
            >
              <Plus size={12} />
              ADD
            </button>
          ) : (
            <div
              className="flex items-center overflow-hidden border-2 rounded-lg border-blinkit-green"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => dispatch(removeFromCart(product.id))}
                className="flex items-center justify-center font-bold transition-colors w-7 h-7 text-blinkit-green hover:bg-green-50"
              >
                <Minus size={12} />
              </button>
              <span className="w-6 text-sm font-bold text-center text-blinkit-green">
                {qty}
              </span>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="flex items-center justify-center font-bold transition-colors w-7 h-7 text-blinkit-green hover:bg-green-50"
              >
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
