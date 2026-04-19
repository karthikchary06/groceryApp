import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import {
  toggleCart,
  removeFromCart,
  addToCart,
  deleteFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import { placeOrder } from "../store/slices/ordersSlice";

export default function CartDrawer() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((s) => s.cart);
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleAdd = (item) => dispatch(addToCart(item));
  const handleDelete = (id) => dispatch(deleteFromCart(id));
  const handleClose = () => dispatch(toggleCart());

  const handleCheckout = async () => {
    console.log("Checkout clicked, items:", items.length, "user:", !!user);
    if (items.length === 0) return;

    if (!user) {
      console.log("User not logged in, redirecting to login");
      handleClose();
      navigate("/login");
      return;
    }

    try {
      console.log("Placing order...");
      const result = await dispatch(
        placeOrder({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            unit: item.unit,
          })),
          total: totalPrice,
        }),
      ).unwrap();

      console.log("Order placed successfully:", result);
      dispatch(clearCart());
      handleClose();
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order:", error);
      // You could show a toast message here
    }
  };

  const handleContinueShopping = () => {
    handleClose();
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-blinkit-green" />
              <h2 className="text-lg font-bold text-gray-900">My Cart</h2>
              <span className="px-2 py-1 text-xs font-semibold text-white bg-blinkit-green rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex items-center justify-center w-20 h-20 mb-4 bg-gray-100 rounded-full">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Add items to get started
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="bg-blinkit-green text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.quantity} · {item.unit}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-base font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} className="text-gray-600" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleAdd(item)}
                            className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors ml-2"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blinkit-green text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  Checkout · {totalItems} item{totalItems !== 1 ? "s" : ""}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
