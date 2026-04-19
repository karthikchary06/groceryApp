import React, { useState, useEffect } from 'react'

const banners = [
  {
    id: 1,
    title: 'Stock up on daily essentials',
    subtitle: 'Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more',
    cta: 'Shop Now',
    bg: 'linear-gradient(135deg, #1a6b2a 0%, #2d9e3f 50%, #8bc34a 100%)',
    emoji: '🥦',
    pattern: 'fruits',
  },
  {
    id: 2,
    title: 'Midnight hunger? We\'ve got you',
    subtitle: 'Order snacks, drinks & munchies — delivered in under 10 minutes',
    cta: 'Order Now',
    bg: 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
    emoji: '🍕',
    pattern: 'night',
  },
  {
    id: 3,
    title: 'Fresh dairy, every morning',
    subtitle: 'Milk, eggs, paneer, curd & more — delivered fresh to your doorstep',
    cta: 'Shop Dairy',
    bg: 'linear-gradient(135deg, #e65100 0%, #f57c00 50%, #ffa726 100%)',
    emoji: '🥛',
    pattern: 'dairy',
  },
]

export default function HeroBanner() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % banners.length), 4000)
    return () => clearInterval(t)
  }, [])

  const banner = banners[active]

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ background: banner.bg, transition: 'background 0.8s ease' }}>
      <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-10 min-h-[200px] md:min-h-[240px]">
        {/* Text */}
        <div className="flex-1 text-white">
          <h1 className="text-2xl md:text-4xl font-black leading-tight mb-3 drop-shadow-sm" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
            {banner.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-5 max-w-md leading-relaxed">{banner.subtitle}</p>
          <button className="bg-white text-gray-900 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-100 active:scale-95 transition-all duration-150 shadow-lg">
            {banner.cta}
          </button>
        </div>

        {/* Emoji visual */}
        <div className="hidden md:flex items-center justify-center w-48 h-48 text-9xl opacity-30 absolute right-8 top-1/2 -translate-y-1/2 select-none">
          {banner.emoji}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${i === active ? 'bg-white w-6 h-2' : 'bg-white/40 w-2 h-2'}`}
          />
        ))}
      </div>
    </div>
  )
}
