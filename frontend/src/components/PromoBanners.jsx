import React from 'react'

const promos = [
  {
    title: 'Pharmacy at your doorstep!',
    subtitle: 'Cough syrups, pain relief sprays & more',
    cta: 'Order Now',
    bg: '#0099cc',
    emoji: '💊',
    accent: '#007ab3',
  },
  {
    title: 'Pet care supplies at your door',
    subtitle: 'Food, treats, toys & more',
    cta: 'Order Now',
    bg: '#f5a623',
    emoji: '🐾',
    accent: '#e09520',
  },
  {
    title: 'No time for a diaper run?',
    subtitle: 'Get baby care essentials',
    cta: 'Order Now',
    bg: '#f8f8f8',
    emoji: '👶',
    accent: '#eee',
    dark: true,
  },
]

export default function PromoBanners() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
      {promos.map((p, i) => (
        <div
          key={i}
          className="card-hover rounded-2xl overflow-hidden relative p-5 flex flex-col justify-between min-h-[140px]"
          style={{ background: p.bg }}
        >
          <div>
            <h3 className={`font-black text-base leading-tight mb-1 ${p.dark ? 'text-gray-900' : 'text-white'}`}
              style={{ textShadow: p.dark ? 'none' : '0 1px 4px rgba(0,0,0,0.15)' }}>
              {p.title}
            </h3>
            <p className={`text-xs leading-snug ${p.dark ? 'text-gray-600' : 'text-white/80'}`}>{p.subtitle}</p>
          </div>
          <button
            className={`mt-3 self-start px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95
              ${p.dark ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'}`}
          >
            {p.cta}
          </button>
          <span className="absolute right-4 bottom-4 text-5xl opacity-25 select-none">{p.emoji}</span>
        </div>
      ))}
    </div>
  )
}
