"use client"

import { useState } from "react"
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Email validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return "Email is required"
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address"
    }
    return ""
  }

  // Password validation
  const validatePassword = (password: string) => {
    if (!password) {
      return "Password is required"
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters"
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/(?=.*\d)/.test(password)) {
      return "Password must contain at least one number"
    }
    if (!/(?=.*[@$!%*?&#])/.test(password)) {
      return "Password must contain at least one special character (@$!%*?&#)"
    }
    return ""
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailTouched) {
      setEmailError(validateEmail(value))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (passwordTouched) {
      setPasswordError(validatePassword(value))
    }
  }

  const handleEmailBlur = () => {
    if (email) {
      setEmailTouched(true)
      setEmailError(validateEmail(email))
    }
  }

  const handlePasswordBlur = () => {
    if (password) {
      setPasswordTouched(true)
      setPasswordError(validatePassword(password))
    }
  }

  const handleLogin = async () => {
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)
    
    setEmailError(emailErr)
    setPasswordError(passwordErr)
    setEmailTouched(true)
    setPasswordTouched(true)
    setLoginError("")

    if (!emailErr && !passwordErr) {
      setIsLoading(true)
      
      try {
        // Simulate backend authentication API call
        // Replace this with your actual authentication endpoint
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        
        if (!response.ok) {
          const data = await response.json()
          
          // Handle different error types from backend
          if (response.status === 401) {
            setLoginError("Invalid email or password")
          } else if (response.status === 404) {
            setLoginError("No account found with this email address")
          } else if (response.status === 403) {
            setLoginError("Your account has been suspended. Please contact support")
          } else {
            setLoginError("Unable to login. Please try again later")
          }
          setIsLoading(false)
          return
        }
        
        const data = await response.json()
        console.log("Login successful:", data)
        
        // Handle successful login (e.g., store token, redirect)
        // localStorage.setItem('token', data.token) // NOT AVAILABLE in artifacts
        // window.location.href = '/dashboard'
        
        setIsLoading(false)
      } catch (error) {
        // Network error or API unavailable
        console.error("Login error:", error)
        setLoginError("Unable to connect. Please check your internet connection and try again")
        setIsLoading(false)
      }
    }
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
          {/* Login Error Message */}
          {loginError && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-[10px] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
              <p className="text-[13px] text-red-400">{loginError}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-[15px] font-medium text-white mb-1">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                placeholder="your@email.com"
                className={`w-full px-4 py-1 bg-[#1c1c1c] border rounded-[10px] text-white text-[15px] placeholder-gray-500 focus:outline-none transition pr-10 ${
                  emailError && emailTouched && email
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-[#2a2a2a] focus:border-[#3b82f6]"
                }`}
              />
              {emailTouched && emailError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AlertCircle className="h-[18px] w-[18px] text-red-500" />
                </div>
              )}
            </div>
            {emailError && emailTouched && email && (
              <p className="mt-1.5 text-[13px] text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {emailError}
              </p>
            )}
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
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                placeholder="••••••••••"
                className={`w-full px-4 py-1 bg-[#1c1c1c] border rounded-[10px] text-white text-[15px] placeholder-gray-400 focus:outline-none transition pr-12 ${
                  passwordError && passwordTouched && password
                    ? "border-red-500/50 focus:border-red-500/50"
                    : "border-[#2a2a2a] focus:border-[#3b82f6]"
                }`}
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
            {passwordError && passwordTouched && password && (
              <p className="mt-1.5 text-[13px] text-red-400 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {passwordError}
              </p>
            )}
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
            disabled={!email || !password || !!emailError || !!passwordError || isLoading}
            className={`w-full py-2.5 text-[15px] font-medium rounded-[10px] transition mt-3 flex items-center justify-center gap-2 ${
              !email || !password || emailError || passwordError || isLoading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              "Login"
            )}
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