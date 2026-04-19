// frontend/src/store/slices/productSlice.js  — REPLACE entire file
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (category, { rejectWithValue }) => {
    try {
      const url =
        category && category !== "all"
          ? `${API}/products?category=${category}`
          : `${API}/products`;
      const res = await axios.get(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to load products. Please check your connection.",
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/categories`);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load categories.");
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    activeCategory: "all",
    searchQuery: "",
    loading: false,
    error: null,
  },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.items = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(fetchCategories.fulfilled, (s, a) => {
        s.categories = a.payload;
      });
  },
});

export const { setActiveCategory, setSearchQuery, clearError } =
  productSlice.actions;
export default productSlice.reducer;
