import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowLeft, CheckCircle } from 'lucide-react'
import { registerUser, clearError } from '../store/slices/authSlice'

export default function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector(s => s.auth)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  useEffect(() => {
    if (user) navigate('/')
    return () => dispatch(clearError())
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(registerUser(form))
    if (!res.error) navigate('/')
  }

  const pwStrength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2 : 3

  const strengthLabels = ['', 'Weak', 'Good', 'Strong']
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500']

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blinkit-yellow to-yellow-400 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl">🛒</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900">Create Account</h1>
            <p className="text-yellow-800 text-sm mt-1 opacity-80">Join blinkit for super-fast delivery</p>
          </div>

          <div className="px-8 py-8">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to home
            </Link>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2 animate-slide-down">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blinkit-green focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blinkit-green focus:ring-2 focus:ring-green-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Min. 6 characters"
                    minLength={6}
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blinkit-green focus:ring-2 focus:ring-green-100 transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength indicator */}
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map(n => (
                        <div key={n} className={`h-1 flex-1 rounded-full transition-all duration-300 ${n <= pwStrength ? strengthColors[pwStrength] : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-semibold ${pwStrength === 1 ? 'text-red-500' : pwStrength === 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {strengthLabels[pwStrength]}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blinkit-green text-white py-3.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Creating account...</> : 'Create Account'}
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {['Fast 9-minute delivery', 'Exclusive member deals', 'Easy order tracking'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle size={13} className="text-blinkit-green flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-blinkit-green font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
