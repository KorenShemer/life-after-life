"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    console.log("Login attempt:", { email, password })
  }

  const handleGoogleLogin = () => {
    console.log("Google login")
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px]">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <img
              src="/life-after-life_logo.png"
              alt="Life After Life Logo"
              className="h-10 w-10"
            />
            <h1 className="text-[22px] font-semibold text-white tracking-tight">Life After Life</h1>
          </div>
          <p className="text-[15px] text-gray-400 font-normal">Login to Life After Life</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[15px] font-medium text-white mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-[10px] text-white text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#3b82f6] transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-[15px] font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full px-4 py-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-[10px] text-white text-[15px] placeholder-gray-400 focus:outline-none focus:border-[#3b82f6] transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition"
              >
                {showPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center justify-between text-[13px] pt-1">
            <button className="text-gray-400 hover:text-white transition">
              Forgot password?
            </button>
            <button className="text-gray-400 hover:text-white transition">
              Don't have an account?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-2.5 bg-white text-black text-[15px] font-medium rounded-[10px] hover:bg-gray-100 transition mt-3"
          >
            Login
          </button>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2.5 bg-[#1c1c1c] border border-[#2a2a2a] text-white text-[15px] font-medium rounded-[10px] hover:bg-[#232323] transition flex items-center justify-center gap-2.5 mt-1"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
              />
              <path
                fill="#34A853"
                d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
              />
              <path
                fill="#EA4335"
                d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}