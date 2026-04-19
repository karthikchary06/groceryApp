// frontend/src/pages/OrdersPage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ChevronRight,
  Clock,
  MapPin,
  CheckCircle,
  Package,
} from "lucide-react";
import { fetchOrders } from "../store/slices/ordersSlice";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.orders);
  const { user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="mb-4 text-6xl">🔒</div>
        <h2 className="mb-2 text-xl font-bold text-gray-800">
          Please login to view orders
        </h2>
        <Link
          to="/login"
          className="mt-4 bg-blinkit-green text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
        <div className="flex items-center justify-center w-24 h-24 mb-5 bg-gray-100 rounded-full">
          <ShoppingBag size={36} className="text-gray-300" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-800">No orders yet</h2>
        <p className="mb-6 text-sm text-gray-500">
          Your placed orders will appear here
        </p>
        <Link
          to="/"
          className="bg-blinkit-green text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 bg-blinkit-green rounded-xl">
          <Package size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">My Orders</h1>
          <p className="text-sm text-gray-500">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-green-50">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-blinkit-green" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.placedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold text-white bg-green-600 rounded-full">
                  ✓ Delivered
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={11} /> {order.deliveredIn}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-5 py-4">
              <div className="flex flex-wrap gap-3 mb-4">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-10 h-10 rounded-lg"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 max-w-[120px] truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        x{item.quantity} · ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <MapPin size={12} className="text-gray-400" />
                  <span className="truncate max-w-[200px]">
                    {order.address}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total paid</p>
                  <p className="text-base font-black text-gray-900">
                    ₹{order.total}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
