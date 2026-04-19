import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('blinkit_cart')
const initialItems = saved ? JSON.parse(saved) : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialItems,
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('blinkit_cart', JSON.stringify(state.items))
    },
    removeFromCart(state, action) {
      const existing = state.items.find(i => i.id === action.payload)
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
      localStorage.setItem('blinkit_cart', JSON.stringify(state.items))
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
      localStorage.setItem('blinkit_cart', JSON.stringify(state.items))
    },
    clearCart(state) {
      state.items = []
      localStorage.removeItem('blinkit_cart')
    },
    toggleCart(state) { state.isOpen = !state.isOpen },
    openCart(state) { state.isOpen = true },
    closeCart(state) { state.isOpen = false },
  }
})

export const { addToCart, removeFromCart, deleteFromCart, clearCart, toggleCart, openCart, closeCart } = cartSlice.actions
export default cartSlice.reducer
