import React from 'react'

const LoginLeft = () => {
  return (
    <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#1E2238] via-[#2A2F4C] to-[#1E2238] relative overflow-hidden flex-col justify-between p-12 shrink-0 select-none border-r border-white/10 z-0">
        
        {/* Abstract Floating Shapes */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-[#FF9E5E] rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/3 -right-10 w-72 h-72 bg-[#7582B8] rounded-full mix-blend-screen filter blur-[80px] opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#1C2135] rounded-full mix-blend-screen filter blur-[80px] opacity-30 pointer-events-none"></div>

        {/* Glassmorphic Card Preview */}
        <div className="absolute right-[-40px] top-[25%] w-72 h-[22rem] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl rotate-12 flex flex-col p-5 opacity-80 pointer-events-none z-10 transition-transform duration-1000 hover:rotate-6">
            <div className="flex gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
            </div>
            <div className="w-3/4 h-4 rounded bg-white/20 mb-4"></div>
            <div className="w-full h-2 rounded bg-white/10 mb-3"></div>
            <div className="w-5/6 h-2 rounded bg-white/10 mb-3"></div>
            <div className="w-full flex-1 rounded bg-white/5 mt-6 border border-white/10 flex flex-col gap-2 p-3">
                <div className="w-full h-8 rounded bg-white/10"></div>
                <div className="w-1/2 h-8 rounded bg-white/10"></div>
            </div>
        </div>

        <div className='flex items-center gap-3 relative z-20 cursor-pointer' onClick={() => window.dispatchEvent(new Event('show-splash'))}>
           <img src="/logo.svg" alt="Logo" className="size-9.5"/>
           <span className="text-4xl font-bold text-[#FFFFFF]">Prompt IT</span>
        </div>
        <div className="relative z-20">
            <h2 className='text-4xl text-[#FFFFFF] font-bold leading-tight mb-5 tracking-tight'>
                Your dream website is just a <span className="text-[#FF9E5E]">prompt away.</span>
            </h2>
            <p className="text-[#7582B8] text-lg leading-relaxed max-w-md">
                Describe what you need, preview instantly, and customize your site in real-time. React with clean JSX, verified layouts, and instant code exports.
            </p>
            <p className='text-[#676F9D] text-sm mt-12'>~ made by avani&lt;3</p>
        </div>
    </div>
  )
}

export default LoginLeft