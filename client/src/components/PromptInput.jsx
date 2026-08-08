import React, { useEffect, useRef, useState } from 'react'
import {ArrowRightIcon, CloudUploadIcon, Loader2Icon, MicIcon} from 'lucide-react'

const PromptInput = ({onSubmit, loading = false, placeholder = "Describe the website you want to build...", large = false, autoFocus = false, variant = "default"}) => {

    const [value, setValue] = useState("");
    const textareaRef = useRef(null)

    useEffect(()=>{
        if(autoFocus && textareaRef.current){
            textareaRef.current.focus();
        }
    },[autoFocus])

    const handleSubmit = (e)=>{
        if(e) e.preventDefault()
        const trimmed = value.trim()
        if(!trimmed || loading) return;
        onSubmit(trimmed)
        setValue("")
    }

    const handleKeyDown = (e)=>{
        if(e.key === "Enter" &&  !e.shiftKey){
            e.preventDefault();
            handleSubmit()
        }
    }

if(variant === "glass"){
    return (
        <form onSubmit={handleSubmit} className='max-w-2xl w-full bg-[#424769] rounded-xl border-l-[3px] border-transparent focus-within:border-l-[#FF9E5E] overflow-hidden mt-6 transition shadow-lg'>

            <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading}
                rows={3} className='w-full p-4 pb-2 resize-none placeholder:text-white/60 outline-none bg-transparent text-[#FFFFFF] text-base'/>

            <div className='flex items-center justify-between pb-3 px-3 gap-2'>
                <div className='flex items-center gap-2 pl-2'>
                    <label htmlFor="file" className="text-[#7582B8] hover:text-[#FFFFFF] p-1.5 rounded-full hover:bg-white/5 cursor-pointer flex items-center justify-center transition">
                        <input type="file" id='file' hidden/>
                        <CloudUploadIcon size={20}/>
                    </label>
                </div>
                <div className='flex items-center justify-end gap-2 pr-1'>
                    <button type='button' className="flex items-center justify-center p-1.5 rounded-full text-[#7582B8] hover:text-[#FFFFFF] hover:bg-white/5 cursor-pointer transition">
                        <MicIcon size={20}/>
                    </button>

                    <button type='submit' 
                    disabled={!value.trim() || loading}
                    className="flex items-center justify-center p-1.5 rounded-full bg-[#FF9E5E] text-[#0B0D17] hover:bg-[#ffbd8e] disabled:opacity-40 cursor-pointer transition">
                        {loading ? <Loader2Icon size={18} className="animate-spin"/> : <ArrowRightIcon size={18}/>}
                    </button>
                </div>
            </div>

        </form>
    )
}

  return (
    <div className={`bg-[#424769] border border-transparent border-l-[3px] focus-within:border-l-[#FF9E5E] rounded-xl flex items-end gap-2 transition shadow-md ${large ? "p-4" : "p-3"}`}>

        <textarea ref={textareaRef} 
        value={value} 
        onChange={(e)=>setValue(e.target.value)} 
        onKeyDown={handleKeyDown} 
        placeholder={placeholder} 
        disabled={loading}
        rows={large ? 5 : 1} 
        className={`flex-1 bg-transparent border-none outline-none resize-none text-[#FFFFFF] placeholder:text-white/60 ${large ? "text-base" : "text-sm"}`}/>

        <button
        onClick={()=> handleSubmit()}
        disabled={!value.trim() || loading}
        className='inline-flex items-center justify-center bg-[#FF9E5E] text-[#0B0D17] hover:bg-[#ffbd8e] disabled:opacity-40 cursor-pointer rounded-full shrink-0 transition'
        style={{
            width: large ? 36 : 24,
             height: large ? 36 : 24,
        }}>
            {loading ? <Loader2Icon size={large ? 20 : 15} className="animate-spin"/> : <ArrowRightIcon size={large ? 20 : 15}/>}
        </button>
    </div>
  )
}

export default PromptInput