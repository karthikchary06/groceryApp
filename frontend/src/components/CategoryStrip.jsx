import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { setActiveCategory } from '../store/slices/productSlice'
import { fetchProducts } from '../store/slices/productSlice'

const FALLBACK_CATEGORIES = [
  { id: 'all', name: 'All', slug: 'all', emoji: '🛒', color: '#0c831f' },
  { id: '1', name: 'Paan Corner', slug: 'paan', emoji: '🌿', color: '#4CAF50' },
  { id: '2', name: 'Dairy, Bread & Eggs', slug: 'dairy', emoji: '🥛', color: '#2196F3' },
  { id: '3', name: 'Fruits & Vegetables', slug: 'fruits', emoji: '🥦', color: '#8BC34A' },
  { id: '4', name: 'Cold Drinks & Juices', slug: 'drinks', emoji: '🥤', color: '#F44336' },
  { id: '5', name: 'Snacks & Munchies', slug: 'snacks', emoji: '🍿', color: '#FF9800' },
  { id: '6', name: 'Breakfast & Instant Food', slug: 'breakfast', emoji: '🥣', color: '#9C27B0' },
  { id: '7', name: 'Sweet Tooth', slug: 'sweets', emoji: '🍫', color: '#795548' },
  { id: '8', name: 'Bakery & Biscuits', slug: 'bakery', emoji: '🍪', color: '#FF5722' },
  { id: '9', name: 'Tea, Coffee & Beverages', slug: 'beverages', emoji: '☕', color: '#607D8B' },
  { id: '10', name: 'Atta, Rice & Dal', slug: 'staples', emoji: '🌾', color: '#FFC107' },
]

export default function CategoryStrip() {
  const dispatch = useDispatch()
  const { categories, activeCategory } = useSelector(s => s.products)
  const stripRef = useRef(null)

  const allCats = [{ id: 'all', name: 'All', slug: 'all', emoji: '🛒', color: '#0c831f' }, ...(categories.length > 0 ? categories : FALLBACK_CATEGORIES.slice(1))]

  const scroll = (dir) => {
    if (stripRef.current) {
      stripRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
  }

  const handleSelect = (slug) => {
    dispatch(setActiveCategory(slug))
    dispatch(fetchProducts(slug === 'all' ? null : slug))
  }

  return (
    <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Scroll Buttons */}
        <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
        <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <ChevronRight size={16} className="text-gray-600" />
        </button>

        <div ref={stripRef} className="flex gap-1 overflow-x-auto hide-scrollbar py-3 px-6">
          {allCats.map(cat => {
            const active = activeCategory === cat.slug
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.slug)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-150 min-w-[68px]
                  ${active ? 'bg-green-50 border-2 border-blinkit-green' : 'border-2 border-transparent hover:bg-gray-50'}`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span className={`text-[10px] font-semibold text-center leading-tight line-clamp-2 ${active ? 'text-blinkit-green' : 'text-gray-600'}`}>
                  {cat.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
