import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import { homeTags } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon, ClockIcon, Trash2Icon, GlobeIcon, SearchIcon } from 'lucide-react'
import moment from "moment";
import { useState } from 'react';

const HomePage = () => {

  const navigate = useNavigate()

  const {user, projects, loadingProjects, generatingProject, loadProjects, handleGenerate, handleDelete, logout} = useAppContext()

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(()=>{
    loadProjects()
  },[loadProjects])

  const filteredProjects = projects.filter(p => {
    if (filter === "Recent") {
        return moment().diff(moment(p.updatedAt || p.createdAt), 'days') < 7;
    }
    return true;
  }).filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-screen overflow-y-scroll text-[#FFFFFF] font-sans bg-[#0B0D17]">
        {/* Nav */}
        <nav className="sticky top-0 z-10 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.dispatchEvent(new Event('show-splash'))}>
              <img src="/logo.svg" alt="logo" className='size-6'/>
              <span className='text-xl font-semibold tracking-tight'>Prompt IT</span>
          </div>
          <div className='flex items-center gap-4 text-sm font-medium text-[#FFFFFF]'>
            <span>{user?.name}</span>
            <button onClick={logout} className='py-1.5 px-3 border border-[#7582B8] text-[#FFFFFF] hover:bg-[#1C2135] hover:border-[#FF9E5E] text-xs rounded-md cursor-pointer bg-transparent transition'>
              Sign out
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 mt-8 xl:mt-28">
          <div className="w-full max-w-2xl flex flex-col items-center">
              {/* Promo Badge */}
              <div className='flex items-center gap-3 p-1 pr-4 bg-white/5 backdrop-blur-md rounded-full border border-[#FF9E5E]/40 text-[13px] text-[#FFFFFF] shadow-[0_0_15px_rgba(255,158,94,0.15)]'>
                <span className='px-3 py-1 text-[11px] bg-[#FF9E5E] text-[#0B0D17] rounded-full font-bold tracking-wider'>PROMO</span>
                <span className="font-medium text-white/90">Create your first project for free.</span>
              </div>

              {/* Title */}
              <h1 className='text-center text-4xl md:text-5xl lg:text-6xl font-bold mt-6 max-w-3xl text-[#FFFFFF] tracking-tight'>
                What are we building today?
              </h1>
              <p className='text-center text-sm md:text-base max-w-xl mt-4 text-[#7582B8] leading-relaxed'> 
                Describe your idea and watch AI design, structure and launch your website instantly. No coding required.
              </p>

              {/* Prompt input with glassmorphic variant */}
              <div className='w-full mt-6'>
                <PromptInput 
                onSubmit={handleGenerate}
                loading={generatingProject}
                placeholder='Create a portfolio website...'
                variant='glass'
                autoFocus/>
              </div>

              {/* Wrap grid tags */}
              <div className="w-full mt-6 max-w-3xl">
                  <div className="flex flex-wrap justify-center gap-3 px-4">
                      {homeTags.map((tag, i)=>(
                        <button key={i}
                        onClick={()=> handleGenerate(tag)}
                        disabled={generatingProject}
                        className='px-4 py-2 border rounded-full text-sm text-[#FFFFFF] bg-white/5 backdrop-blur-sm border-white/10 hover:bg-[#FF9E5E] hover:text-[#0B0D17] hover:border-[#FF9E5E] transition-all cursor-pointer font-medium hover:shadow-[0_4px_15px_rgba(255,158,94,0.3)]'>
                          {tag}
                        </button>
                      ))}
                  </div>
              </div>

              {/* All Projects */}
              {!loadingProjects && projects.length > 0 && (
                <div className="mt-16 w-full max-w-5xl">

                    <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-4">
                        <div className="flex items-center gap-3">
                            <p className='text-xs font-bold uppercase text-[#FFFFFF] tracking-widest'>All Projects</p>
                            <span className='text-xs text-[#7582B8] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5'>
                            {filteredProjects.length}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-56">
                                <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7582B8]"/>
                                <input 
                                    type="text" 
                                    placeholder="Search projects..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#1C2135] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-[#FFFFFF] placeholder-[#7582B8] focus:outline-none focus:border-[#FF9E5E] focus:ring-1 focus:ring-[#FF9E5E]/50 transition-all"
                                />
                            </div>
                            <div className="flex bg-[#1C2135] p-1 rounded-lg border border-white/10">
                                {["All", "Recent"].map(f => (
                                    <button key={f} 
                                        onClick={() => setFilter(f)}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === f ? 'bg-white/10 text-[#FFFFFF]' : 'text-[#7582B8] hover:text-[#FFFFFF]'}`}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredProjects.length === 0 ? (
                         <div className="py-12 text-center text-[#7582B8] text-sm">
                            No projects found matching your criteria.
                         </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[70vh] overflow-y-auto p-3 pb-10 -m-3">
                          {filteredProjects.map((p)=>(
                            <div key={p._id} className='bg-white/5 backdrop-blur-sm border-[1.5px] border-transparent hover:border-[#FF9E5E] rounded-2xl flex flex-col group hover:shadow-[0_8px_30px_rgba(255,158,94,0.15)] hover:scale-[1.02] cursor-pointer transition-all duration-300 overflow-hidden' 
                            onClick={()=> navigate(`/builder/${p._id}`)}>
                                
                                {/* Thumbnail */}
                                <div className="h-36 relative border-b border-white/5 overflow-hidden">
                                    {p.imageUrl ? (
                                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#1C2135] via-[#2A2F4C] to-[#1E2238] flex flex-col items-center justify-center">
                                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FF9E5E]/40 via-transparent to-transparent mix-blend-screen"></div>
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500 relative z-10">
                                                <span className="text-xl font-bold text-[#FF9E5E]">{p.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <button 
                                        onClick={(e)=>{
                                          e.stopPropagation();
                                          handleDelete(p._id)
                                        }}
                                        className='p-1.5 rounded-lg bg-[#0B0D17]/80 text-[#7582B8] hover:text-red-400 hover:bg-red-400/10 backdrop-blur-md transition-colors shadow-lg'>
                                          <Trash2Icon size={14}/>
                                        </button>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <p className="text-base font-semibold text-[#FFFFFF] truncate pr-2 tracking-tight">{p.name}</p>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[#FF9E5E] font-bold uppercase tracking-widest border border-[#FF9E5E]/20">v{p.version}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-1">
                                        <span className="text-xs text-[#7582B8] flex items-center gap-1.5 font-medium">
                                        <ClockIcon size={12}/>
                                        {moment(p.updatedAt || p.createdAt).fromNow() }
                                        </span>
                                        
                                        <div className="flex items-center text-xs font-bold text-[#FF9E5E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                                            Open <ArrowRightIcon size={14} className="ml-1"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          ))}
                        </div>
                    )}
                </div>
              )}
              

          </div>
        </div>
    </div>
  )
}

export default HomePage