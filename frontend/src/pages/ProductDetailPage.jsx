// frontend/src/pages/ProductDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  Star,
  ShieldCheck,
  Clock,
  Tag,
  Package,
} from "lucide-react";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart.items);
  const cartItem = cartItems.find((i) => i.id === id);
  const qty = cartItem?.quantity || 0;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  // Multiple image views (simulate with same image for demo)
  const images = product
    ? [product.image, product.image, product.image, product.image]
    : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API}/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const discount =
    product && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  if (loading)
    return (
      <div className="max-w-6xl px-6 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="skeleton h-96 rounded-2xl" />
          <div className="space-y-4">
            <div className="w-2/3 h-6 rounded-full skeleton" />
            <div className="w-1/4 h-4 rounded-full skeleton" />
            <div className="w-1/3 h-8 rounded-full skeleton" />
            <div className="w-40 h-12 skeleton rounded-xl" />
          </div>
        </div>
      </div>
    );

  if (error || !product)
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="mb-4 text-6xl">😕</div>
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Product not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blinkit-green text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl px-6 py-6 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
          <Link to="/" className="transition-colors hover:text-blinkit-green">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="capitalize transition-colors cursor-pointer hover:text-blinkit-green">
            {product.category}
          </span>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-700">{product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2">
          {/* LEFT — Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="flex items-center justify-center overflow-hidden h-80 md:h-96">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="object-cover w-72 h-72 rounded-2xl"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveImg((p) => Math.max(0, p - 1))}
                className="flex items-center justify-center flex-shrink-0 w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={14} />
              </button>

              <div className="flex flex-1 gap-2 overflow-x-auto hide-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-16 rounded-xl border-2 overflow-hidden transition-all
                      ${activeImg === i ? "border-blinkit-green" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveImg((p) => Math.min(images.length - 1, p + 1))
                }
                className="flex items-center justify-center flex-shrink-0 w-8 h-8 transition-colors border border-gray-200 rounded-full hover:bg-gray-100"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT — Product Info */}
          <div className="flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              {product.badge && (
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-lg">
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-lg">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="mb-2 text-2xl font-black leading-tight text-gray-900">
              {product.name}
            </h1>

            {/* Unit & Rating */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-100 rounded-full">
                {product.unit}
              </span>
              <div className="flex items-center gap-1">
                <Star size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-400">(120 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-black text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <p className="mb-6 text-xs text-gray-400">
              (Inclusive of all taxes)
            </p>

            {/* Add to Cart */}
            {qty === 0 ? (
              <button
                onClick={() => dispatch(addToCart(product))}
                className="flex items-center justify-center gap-2 bg-blinkit-green text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-green-700 active:scale-[0.98] transition-all w-full md:w-auto md:self-end shadow-md"
              >
                <Plus size={18} /> Add to cart
              </button>
            ) : (
              <div className="flex items-center gap-0 overflow-hidden border-2 border-blinkit-green rounded-xl w-36 md:self-end">
                <button
                  onClick={() => dispatch(removeFromCart(product.id))}
                  className="flex items-center justify-center flex-1 py-3 font-bold transition-colors text-blinkit-green hover:bg-green-50"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 py-3 text-lg font-black text-center text-blinkit-green">
                  {qty}
                </span>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="flex items-center justify-center flex-1 py-3 font-bold transition-colors text-blinkit-green hover:bg-green-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {/* Why shop from blinkit */}
            <div className="p-5 mt-8 border border-gray-100 rounded-2xl">
              <h3 className="mb-4 text-base font-bold text-gray-900">
                Why shop from blinkit?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: "⏰",
                    title: "Round The Clock Delivery",
                    desc: "Get items delivered to your doorstep from dark stores near you, whenever you need them.",
                  },
                  {
                    icon: "💰",
                    title: "Best Prices & Offers",
                    desc: "Best price destination with offers directly from the manufacturers.",
                  },
                  {
                    icon: "🛒",
                    title: "Wide Assortment",
                    desc: "Choose from 30,000+ products across food, personal care, household & other categories.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 text-2xl bg-yellow-50 rounded-xl">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="pt-8 border-t border-gray-100">
          <h2 className="mb-5 text-xl font-black text-gray-900">
            Product Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { label: "Brand", value: product.name.split(" ")[0] },
              {
                label: "Category",
                value:
                  product.category.charAt(0).toUpperCase() +
                  product.category.slice(1),
              },
              { label: "Net Weight", value: product.unit },
              { label: "Rating", value: `${product.rating} / 5` },
              {
                label: "Shelf Life",
                value: "Best before 6 months from manufacture",
              },
              { label: "Storage", value: "Store in a cool, dry place" },
            ].map((row, i) => (
              <div key={i} className="flex gap-4 py-3 border-b border-gray-50">
                <span className="flex-shrink-0 w-32 text-sm text-gray-400">
                  {row.label}
                </span>
                <span className="text-sm font-semibold text-gray-800">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
