// frontend/src/pages/HomePage.jsx  — REPLACE entire file
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeroBanner from "../components/HeroBanner";
import PromoBanners from "../components/PromoBanners";
import CategoryStrip from "../components/CategoryStrip";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ErrorBanner from "../components/ErrorBanner";
import Footer from "../components/Footer";
import { fetchProducts } from "../store/slices/productSlice";
import { Search } from "lucide-react";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
    searchQuery,
    activeCategory,
  } = useSelector((s) => s.products);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [products, searchQuery]);

  const handleRetry = () =>
    dispatch(fetchProducts(activeCategory === "all" ? null : activeCategory));

  return (
    <div>
      <CategoryStrip />

      <div className="px-4 py-5 mx-auto max-w-7xl">
        {!searchQuery && (
          <>
            <HeroBanner />
            <PromoBanners />
          </>
        )}

        {/* Products Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              {searchQuery ? (
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-gray-400" />
                  <h2 className="text-lg font-bold text-gray-900">
                    Results for{" "}
                    <span className="text-blinkit-green">"{searchQuery}"</span>
                  </h2>
                </div>
              ) : (
                <h2 className="text-xl font-black text-gray-900">
                  {activeCategory === "all"
                    ? "⚡ Fast Delivery Items"
                    : activeCategory === "dairy"
                      ? "🥛 Dairy, Bread & Eggs"
                      : activeCategory === "fruits"
                        ? "🥦 Fruits & Vegetables"
                        : activeCategory === "drinks"
                          ? "🥤 Cold Drinks & Juices"
                          : activeCategory === "snacks"
                            ? "🍿 Snacks & Munchies"
                            : activeCategory === "breakfast"
                              ? "🥣 Breakfast & Instant Food"
                              : activeCategory === "sweets"
                                ? "🍫 Sweet Tooth"
                                : activeCategory === "beverages"
                                  ? "☕ Tea & Coffee"
                                  : activeCategory === "staples"
                                    ? "🌾 Atta, Rice & Dal"
                                    : "🛍 Products"}
                </h2>
              )}
              {!loading && !error && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <ErrorBanner message={error} onRetry={handleRetry} />
          )}

          {/* Empty State */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-bold text-gray-800">
                No products found
              </h3>
              <p className="text-sm text-gray-500">
                Try searching for something else
              </p>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features strip */}
        {!searchQuery && !loading && !error && (
          <div className="grid grid-cols-2 gap-4 pb-8 mt-12 md:grid-cols-4">
            {[
              {
                icon: "⚡",
                title: "10 min delivery",
                desc: "Get your order in minutes",
              },
              {
                icon: "🛡",
                title: "Best prices",
                desc: "Guaranteed lowest rates",
              },
              {
                icon: "🌿",
                title: "Wide assortment",
                desc: "5000+ products available",
              },
              {
                icon: "↩️",
                title: "Easy returns",
                desc: "Hassle-free return policy",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-2xl"
              >
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{f.title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
