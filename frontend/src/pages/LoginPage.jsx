import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react'
import { loginUser, clearError } from '../store/slices/authSlice'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector(s => s.auth)
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  useEffect(() => {
    if (user) navigate('/')
    return () => dispatch(clearError())
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(loginUser(form))
    if (!res.error) navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blinkit-green to-green-700 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-black text-blinkit-yellow">b</span>
            </div>
            <h1 className="text-2xl font-black text-white">Welcome back!</h1>
            <p className="text-green-200 text-sm mt-1">Sign in to your blinkit account</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to home
            </Link>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2 animate-slide-down">
                <span className="text-base">⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blinkit-green focus:ring-2 focus:ring-green-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blinkit-green text-white py-3.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-blinkit-green font-bold hover:underline">Create one</Link>
            </p>

            {/* Demo hint */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-center">
              <p className="text-xs text-yellow-700 font-medium">💡 Register first, then login with those credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
