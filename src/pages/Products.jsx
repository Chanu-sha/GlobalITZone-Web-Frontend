import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import appicon from "../assets/Global-IT-Zone.png";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const PLAY_STORE_URL =
  import.meta.env.VITE_PLAY_STORE_URL || "https://play.google.com/store";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Search state
  const [search, setSearch] = useState("");
  const searchTimer = useRef(null);

  const categoryColors = {
    Laptops: "bg-blue-500 hover:bg-blue-600",
    Desktops: "bg-green-500 hover:bg-green-600",
    Security: "bg-red-500 hover:bg-red-600",
    Accessories: "bg-purple-500 hover:bg-purple-600",
    Audio: "bg-pink-500 hover:bg-pink-600",
    Networking: "bg-indigo-500 hover:bg-indigo-600",
    Components: "bg-yellow-500 hover:bg-yellow-600",
    Monitors: "bg-teal-500 hover:bg-teal-600",
    Storage: "bg-orange-500 hover:bg-orange-600",
    Gaming: "bg-violet-500 hover:bg-violet-600",
  };

  const conditionColors = {
    New: "bg-green-100 text-green-800",
    Excellent: "bg-blue-100 text-blue-800",
    "Very Good": "bg-emerald-100 text-emerald-800",
    Good: "bg-yellow-100 text-yellow-800",
    Fair: "bg-orange-100 text-orange-800",
  };

  // fetch products
  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      setSearchLoading(true);
      try {
        const params = { page, limit, sort: "newest" };
        if (search && search.trim().length > 0) params.search = search.trim();

        const resp = await axios.get(`${API_BASE}/api/products`, {
          params,
          withCredentials: false,
        });

        if (!cancelled) {
          setProducts(
            Array.isArray(resp.data.products) ? resp.data.products : []
          );
          const pag = resp.data.pagination || {};
          setHasNextPage(Boolean(pag.hasNextPage));
          setHasPrevPage(Boolean(pag.hasPrevPage));
          setTotalPages(pag.totalPages || 1);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Fetch products error:", err);
          setProducts([]);
          setHasNextPage(false);
          setHasPrevPage(false);
          setTotalPages(1);
          setError(
            err.response?.data?.message ||
              "Unable to fetch products. Check your API connection."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setSearchLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [page, limit, search]);

  // handle search input with debounce
  const onSearchChange = (val) => {
    setSearch(val);
    setPage(1);

    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      // debounce
    }, 300);
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const handleBuyNow = (product) => {
    window.open(PLAY_STORE_URL, "_blank");
  };

  const fallbackImg =
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header + search - Fixed Layout */}
        <div className="mb-8 space-y-6">
          {/* Title Section */}
          <div className="mt-20" >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-red-400 to-white">
              Our Tech Products
            </h1>
            <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-300 max-w-3xl">
              Quality second-hand laptops, desktops, CCTV systems, accessories
              and spare parts
            </p>
          </div>

          {/* Search Section - Improved for all devices */}
          <div className="w-full max-w-2xl">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>

            <div className="relative">
              {/* left icon */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg
                  className={`h-5 w-5 text-white/60 transition-transform ${
                    searchLoading ? "animate-pulse" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products, e.g. Dell, i5, CCTV..."
                className="w-full pl-12 pr-24 py-3.5 rounded-full bg-white/8 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent focus:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Search products by name"
              />

              {/* clear or spinner */}
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
                {search && (
                  <button
                    onClick={clearSearch}
                    aria-label="Clear search"
                    title="Clear search"
                    className="p-2 rounded-full text-white/90 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {searchLoading && (
                  <svg
                    className="animate-spin h-5 w-5 text-red-400"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
              <span className="hidden sm:inline">
                💡 Tip: Type part of product name or model
              </span>
              <span className="sm:hidden">💡 Search by name or model</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/8 rounded-full text-white/80 text-[11px] border border-white/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="11"
                    cy="11"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Search
              </span>
            </div>
          </div>
        </div>

        {/* Loading/error/no results */}
        {loading && (
          <div className="text-center text-gray-300 py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-400 mb-4"></div>
            <p>Loading products...</p>
          </div>
        )}
        {error && (
          <div className="text-center py-6">
            <div className="inline-block px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400">
              {error}
            </div>
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-300 py-12">
            <svg
              className="mx-auto h-16 w-16 text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg">No products found</p>
            {search && (
              <p className="text-sm mt-2">Try a different search term</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {!loading &&
            products.map((product, index) => (
              <ProductCard
                key={product._id || index}
                product={product}
                fallbackImg={fallbackImg}
                categoryColors={categoryColors}
                conditionColors={conditionColors}
                onBuy={() => handleBuyNow(product)}
              />
            ))}
        </div>

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrevPage}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                hasPrevPage
                  ? "bg-white text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <div className="px-4 py-2 bg-white/10 text-white rounded-full font-medium border border-white/20">
              Page {page} of {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                hasNextPage
                  ? "bg-white text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg"
                  : "bg-white/10 text-gray-500 cursor-not-allowed"
              }`}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <FloatingInstallCTA fallbackImg={fallbackImg} />
    </div>
  );
}

function FloatingInstallCTA({ fallbackImg }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="fixed z-50 right-4 bottom-4 sm:right-6 sm:bottom-6">
      <div className="w-72 sm:w-80 md:w-96 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 overflow-hidden relative">
        <button
          onClick={() => setHidden(true)}
          aria-label="Close promo"
          className="absolute right-2 top-2 text-white/90 rounded-md p-1 hover:bg-white/10"
          title="Close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>

        <div className="flex items-center gap-3 p-3">
          <div className="bg-gray-100 p-[5px] rounded-md" >
            <img
              src={appicon}
              alt="app"
              className="w-12 h-12 rounded-md flex-shrink-0 object-cover"
              onError={(e) => (e.currentTarget.src = fallbackImg)}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">
              Install our app to prebook
            </div>
            <div className="text-xs text-white/90 mt-1">
              Book this product and get{" "}
              <span className="font-bold">5%–15% discount</span> when you
              install from Play Store.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-black/10">
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center py-2 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
            aria-label="Open Play Store to install"
          >
            Install from Play Store
          </a>
        </div>
      </div>
    </div>
  );
}

function calculatePrices(basePrice) {
  if (!basePrice || basePrice <= 0) {
    return { strikePrice: 0, sellingPrice: 0, discountPercentage: 0 };
  }
  const strikeExact = basePrice * 1.16;
  const sellExact = basePrice * 1.08;
  const strikePrice = Math.round(strikeExact);
  const sellingPrice = Math.round(sellExact);
  let discountPercentage = Math.round(
    ((strikeExact - sellExact) / (strikeExact || 1)) * 100
  );
  if (isNaN(discountPercentage) || discountPercentage < 0)
    discountPercentage = 0;
  return { strikePrice, sellingPrice, discountPercentage };
}

function ProductCard({
  product,
  fallbackImg,
  categoryColors,
  conditionColors,
  onBuy,
}) {
  const rawImages = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];
  const normalized = rawImages.filter(Boolean).map(String);
  const sliced = normalized.slice(0, 5);
  while (sliced.length < 2) sliced.push(fallbackImg);
  const images = sliced;

  const [idx, setIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef(null);

  const productCategory = product.category || "Accessories";
  const productCondition = product.condition || "Good";
  const features =
    product.features && product.features.length
      ? product.features.slice(0, 4)
      : ["No details available"];
  const imgSrc = images[idx] || fallbackImg;

  const { strikePrice, sellingPrice, discountPercentage } = calculatePrices(
    product.price || 0
  );

  const goTo = (i) => setIdx(i);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e) => {
    const t = e.touches && e.touches[0];
    if (t) touchStartX.current = t.clientX;
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches && e.changedTouches[0];
    if (!t || touchStartX.current == null) return;
    const dx = t.clientX - touchStartX.current;
    const threshold = 40;
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
    touchStartX.current = null;
  };

  return (
    <article
      className="group relative bg-white/6 backdrop-blur-md rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 duration-300 overflow-hidden border border-white/10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <div
          className="w-full"
          style={{ aspectRatio: "16 / 9", position: "relative" }}
        >
          <img
            src={imgSrc}
            alt={product.name}
            onError={(e) => (e.currentTarget.src = fallbackImg)}
            className="w-full h-full object-cover"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          />

          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white hidden md:inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white hidden md:inline-flex"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="absolute top-3 left-3 z-30">
            <span
              className={`px-3 py-1.5 ${
                categoryColors[productCategory] || "bg-gray-600"
              } text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20`}
            >
              {productCategory}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-30">
            <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {product.type || "Second Hand"}
            </span>
          </div>

          <div className="absolute bottom-4 left-3 z-30">
            <span
              className={`px-2.5 py-1 ${
                conditionColors[productCondition] ||
                "bg-yellow-100 text-yellow-800"
              } text-xs font-semibold rounded-full shadow-md`}
            >
              {productCondition}
            </span>
          </div>

          <div className="absolute bottom-4 right-3 z-30">
            <span className="px-2.5 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-md">
              ✅ {product.availability || "Available"}
            </span>
          </div>

          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent ${
              isHovering ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          ></div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 mt-3 overflow-x-auto z-40">
          {images.map((thumb, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-none w-14 h-10 rounded-lg overflow-hidden border ${
                i === idx ? "ring-2 ring-red-400" : "border-white/10"
              } focus:outline-none`}
            >
              <img
                src={thumb}
                alt={`${product.name} thumb ${i + 1}`}
                onError={(e) => (e.currentTarget.src = fallbackImg)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-300 mb-3 line-clamp-2 leading-relaxed text-sm">
          {product.description || "No description available"}
        </p>

        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-200 mb-2">
            Key Features:
          </h4>
          <div className="space-y-1">
            {features.map((feature, idx2) => (
              <div
                key={idx2}
                className="flex items-center text-xs text-gray-300"
              >
                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-2 p-3 bg-gradient-to-r from-red-500/8 to-pink-500/8 rounded-xl border border-red-500/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex-1 w-full">
            {sellingPrice > 0 ? (
              <>
                <div className="text-sm text-gray-400 line-through">
                  ₹{strikePrice?.toLocaleString("en-IN")}
                </div>
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap mt-1">
                  <div className="text-white font-bold text-xl sm:text-2xl leading-none">
                    ₹{sellingPrice?.toLocaleString("en-IN")}
                  </div>
                  {strikePrice > sellingPrice && discountPercentage > 0 && (
                    <div className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center whitespace-nowrap">
                      {Math.round(discountPercentage)}% OFF
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-white font-bold text-lg">
                Contact for Price
              </div>
            )}
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={onBuy}
              className="w-full sm:inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 text-white text-sm font-bold rounded-full hover:from-yellow-500 hover:to-red-500 transition-transform duration-200 shadow-md"
              aria-label={`Prebook ${product.name} via app`}
            >
              Prebook via App
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 delay-200"></div>
    </article>
  );
}
