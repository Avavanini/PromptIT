import React, { useState } from 'react'
import LoginLeft from '../components/LoginLeft';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthPage = ({mode}) => {

  const {login, register} = useAppContext()
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if(mode === "login"){
        await login(email, password)
      }else{
        await register(name, email, password)
      }
      navigate("/")
    } catch (err) {
      setError(err.message || (mode === "login" ? "Invalid email or password" : "Registration failed"));
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0D17] flex text-[#FFFFFF] font-sans">
      {/* Left Panel - Branding */}
      <LoginLeft />

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-tl from-[#0B0D17] to-[#121524]">
        <div className="w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#FFFFFF] mb-2">{isLogin ? "Sign in" : "Create an account"}</h1>
            <p className='text-sm text-[#7582B8]'>
              {isLogin ? "Enter your credentials to access Prompt IT." : "Get started by entering your registration details."}
            </p>
          </div>

        {error && <div className='mb-6 p-4 border border-red-500/50 bg-red-900/20 text-red-300 text-sm rounded-xl'>{error}</div>}

        <form className='space-y-5' onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-[#7582B8] uppercase tracking-widest mb-2 ml-1">
                Full Name
              </label>
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required className='w-full px-4 py-3 bg-white/5 border border-[#7582B8]/30 rounded-xl focus:outline-none focus:border-[#FF9E5E] focus:bg-white/10 focus:ring-1 focus:ring-[#FF9E5E]/50 text-sm text-[#FFFFFF] placeholder-[#7582B8]/70 transition-all' placeholder='John Doe'/>
            </div>
          )}
          <div>
              <label className="block text-xs font-bold text-[#7582B8] uppercase tracking-widest mb-2 ml-1">
                Email Address
              </label>
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className='w-full px-4 py-3 bg-white/5 border border-[#7582B8]/30 rounded-xl focus:outline-none focus:border-[#FF9E5E] focus:bg-white/10 focus:ring-1 focus:ring-[#FF9E5E]/50 text-sm text-[#FFFFFF] placeholder-[#7582B8]/70 transition-all' placeholder="you@example.com"/>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7582B8] uppercase tracking-widest mb-2 ml-1">
                Password
              </label>
              <div className='relative'>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=>setPassword(e.target.value)} required className='w-full px-4 py-3 bg-white/5 border border-[#7582B8]/30 rounded-xl focus:outline-none focus:border-[#FF9E5E] focus:bg-white/10 focus:ring-1 focus:ring-[#FF9E5E]/50 text-sm text-[#FFFFFF] placeholder-[#7582B8]/70 pr-10 transition-all' 
                 placeholder="••••••••"/>
                 <button type="button" onClick={()=> setShowPassword(!showPassword)}className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7582B8] hover:text-[#FFFFFF] flex items-center justify-center cursor-pointer transition-colors p-1">
                    {showPassword ? <EyeOffIcon size={16}/> : <EyeIcon size={16}/>}
                 </button>
              </div>
              
              {isLogin && (
                <div className="flex items-center justify-between mt-3 px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded-sm bg-white/10 border-[#7582B8]/30 text-[#FF9E5E] focus:ring-[#FF9E5E]/50 focus:ring-offset-0 cursor-pointer w-3.5 h-3.5 transition-colors" />
                    <span className="text-[13px] font-medium text-[#7582B8] group-hover:text-[#FFFFFF] transition-colors">Remember me</span>
                  </label>
                  <a href="#" className="text-[13px] font-semibold text-[#FF9E5E] hover:text-[#ffbd8e] transition-colors">Forgot password?</a>
                </div>
              )}
          </div>

          <button type="submit" disabled={loading} 
          className='w-full py-3.5 bg-[#FF9E5E] text-[#0B0D17] font-bold hover:bg-[#ffbd8e] hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center cursor-pointer mt-6 rounded-xl transition-all shadow-[0_4px_20px_rgba(255,158,94,0.25)] text-[15px]'>
            {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}
            {isLogin ? "Sign in" : "Create Account"}
          </button>
          
        </form>

      <p className='text-sm text-[#7582B8] mt-8 pt-6 border-t border-white/10 text-center'>
        {isLogin ? (
          <>
            New to Prompt IT?{" "}
            <Link to="/register" className="text-[#FF9E5E] font-semibold hover:underline" >
              Create an account
            </Link>
          </>
        ) : (
          <>
          Already have an account?{" "}
            <Link to="/login" className="text-[#FF9E5E] font-semibold hover:underline" >
             Sign in here
            </Link>
          </>
        )}
      </p>

        </div>
      </div>

    </div>
  )
}

export default AuthPage