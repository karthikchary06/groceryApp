import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  MapPin,
  ShoppingCart,
  ChevronDown,
  User,
  LogOut,
  Package,
  X,
} from "lucide-react";
import { logout } from "../store/slices/authSlice";
import { toggleCart } from "../store/slices/cartSlice";
import { setSearchQuery } from "../store/slices/productSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);
  const { items } = useSelector((s) => s.cart);
  const { searchQuery } = useSelector((s) => s.products);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const profileRef = useRef(null);

  const searchSuggestions = [
    'Search "butter"',
    'Search "curd"',
    'Search "chocolate"',
    'Search "groceries"',
    'Search "milk"',
    'Search "bread"',
    'Search "fruits"',
    'Search "vegetables"',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => dispatch(setSearchQuery(e.target.value));

  return (
    <>
      {/* ── DESKTOP ≥1020px ── */}
      <nav
        className="sticky top-0 z-50 items-center justify-between hidden h-24 px-16 py-6 bg-white border-b border-gray-100 lg:flex"
        style={{ minWidth: 0 }}
      >
        {/* FAR LEFT — Logo */}
        <Link to="/" className="flex items-center flex-shrink-0 gap-1">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blinkit-yellow">
            <span className="text-base italic font-black text-white">b</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-blinkit-yellow">
            blinkit
          </span>
        </Link>

        {/* MIDDLE */}
        <div className="flex items-center flex-1 gap-4 mx-6">
          <div className="flex-shrink-0 w-px h-8 bg-gray-200" />
          <button className="flex flex-col flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-bold text-gray-900">
                Delivery in
              </span>
              <span className="text-[13px] font-extrabold text-blinkit-green">
                10 minutes
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-gray-400" />
              <span className="text-[11.5px] text-gray-500 max-w-[160px] truncate">
                169, Devamma Basthi, Jagathgir...
              </span>
              <ChevronDown size={11} className="text-gray-400" />
            </div>
          </button>
          <div className="flex-shrink-0 w-px h-8 bg-gray-200" />
          <div className="flex-1">
            <div
              className={`flex items-center bg-gray-100 rounded-xl px-4 py-3 gap-3 border-2 transition-colors ${searchFocused ? "border-blinkit-green bg-white" : "border-transparent"}`}
            >
              <Search size={15} className="flex-shrink-0 text-gray-400" />
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder=""
                  className="w-full text-[13.5px] text-gray-800 bg-transparent outline-none"
                />
                <div
                  className={`absolute inset-0 flex items-center text-gray-400 pointer-events-none transition-all duration-500 ease-in-out ${
                    isAnimating
                      ? "opacity-0 translate-y-2"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  <span className="text-[13.5px]">
                    {searchSuggestions[placeholderIndex]}
                  </span>
                </div>
              </div>
              {searchQuery && (
                <button onClick={() => dispatch(setSearchQuery(""))}>
                  <X size={13} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAR RIGHT */}
        <div className="flex items-center flex-shrink-0 gap-2">
          {/* Auth / Profile */}
          {user ? (
            <div className="relative flex-shrink-0" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 transition-colors rounded-xl hover:bg-gray-100"
              >
                <div className="flex items-center justify-center rounded-full w-7 h-7 bg-blinkit-green">
                  <span className="text-xs font-bold text-white">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800 hidden md:block max-w-[80px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className="hidden text-gray-500 md:block"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 overflow-hidden bg-white border border-gray-100 shadow-xl animate-slide-down top-full w-52 rounded-2xl">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <button
                      onClick={() => {
                        navigate("/orders");
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-sm text-gray-700 transition-colors"
                    >
                      <Package size={15} className="text-gray-400" /> My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm text-red-500 transition-colors"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex-shrink-0 hidden px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 rounded-xl sm:block"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="flex items-center gap-2.5 bg-blinkit-green text-white px-4 py-2 rounded-xl hover:bg-green-700 active:scale-95 transition-all h-[42px]"
          >
            <ShoppingCart size={17} />
            {totalItems > 0 ? (
              <div className="flex flex-col items-start leading-tight">
                <span className="text-[11px] font-semibold">
                  {totalItems} items
                </span>
                <span className="text-[13px] font-black">
                  ₹{totalPrice.toFixed(0)}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold">My Cart</span>
            )}
          </button>
        </div>
      </nav>

      {/* ── MOBILE <1020px ── */}
      <nav className="sticky top-0 z-50 flex items-center h-24 px-8 py-6 bg-white border-b border-gray-100 lg:hidden">
        {/* 2/3 — Delivery info */}
        <button className="flex flex-col flex-1 min-w-0 text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-bold text-gray-900">
              Delivery in
            </span>
            <span className="text-[13px] font-extrabold text-blinkit-green">
              10 minutes
            </span>
          </div>
          <div className="flex items-center gap-1 mt-0.5 min-w-0">
            <MapPin size={10} className="flex-shrink-0 text-gray-400" />
            <span className="text-[11px] text-gray-500 truncate">
              169, Devamma Basthi, Jagathgirigutta, Hyderabad, Telangana 500004,
              India
            </span>
            <ChevronDown size={11} className="flex-shrink-0 text-gray-400" />
          </div>
        </button>

        {/* 1/3 — Account icon */}
        <div className="flex-shrink-0 ml-3">
          <button className="flex items-center justify-center w-10 h-10 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200">
            <User size={18} className="text-gray-700" />
          </button>
        </div>
      </nav>
    </>
  );
}
