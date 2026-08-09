import { ArrowLeftIcon, Code2Icon, DownloadIcon, ExternalLinkIcon, EyeIcon, GlobeIcon, Loader2Icon } from 'lucide-react'
import React from 'react'

const BuilderHeader = ({
    projectName,
    version,
    showCode,
    publishing,
    onToggleShowCode,
    onOpenPreview,
    onPublish,
    onDownload,
    onBack,
    onLogout,
}) => {
  return (
    <header className="h-12 shrink-0 flex items-center justify-between px-3 border-b border-[#7582B8] bg-[#0B0D17]">
        <div className="flex items-center gap-2">
            <button onClick={onBack} className='p-1.5 rounded-md text-[#7582B8] hover:text-[#FFFFFF] hover:bg-[#1C2135] cursor-pointer transition'>
                <ArrowLeftIcon size={16} />
            </button>
            <img src="/logo.svg" alt="Logo" className="size-5 cursor-pointer" onClick={() => { window.dispatchEvent(new Event('show-splash')); onBack(); }}/>
            <span className="text-sm truncate max-w-[200px] md:max-w-[400px] text-[#FFFFFF]">
                <span className="text-[#7582B8] font-normal mr-1">Projects /</span> 
                <span className="font-bold">{projectName}</span>
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1C2135] text-[#FF9E5E] font-bold">v{version}</span>
        </div>

        <div className="flex items-center gap-1.5">
            <button onClick={onToggleShowCode}
            className={`inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-[#676F9D] text-[#FFFFFF] hover:bg-[#1C2135] hover:border-[#FF9E5E] text-xs font-bold rounded-lg cursor-pointer bg-[#1C2135]/40 backdrop-blur-sm transition ${showCode ? "bg-[#1C2135] border-[#FF9E5E] text-[#FF9E5E]" : ""}`}>
                {showCode ? (
                    <>
                    <EyeIcon size={13}/> Preview
                    </>
                ) : (
                    <>
                    <Code2Icon size={13}/> Code
                    </>
                )}
            </button>
            <button onClick={onOpenPreview}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-[#676F9D] text-[#FFFFFF] hover:bg-[#1C2135] hover:border-[#FF9E5E] text-xs font-bold rounded-lg cursor-pointer bg-[#1C2135]/40 backdrop-blur-sm transition'>
                <ExternalLinkIcon size={13} /> Open Preview
            </button>

            <button onClick={onPublish} disabled={publishing} 
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-transparent text-[#0B0D17] hover:bg-[#fbd1b4] hover:scale-105 text-xs font-bold rounded-lg cursor-pointer bg-[#F9B17A] transition shadow-md'>
                {publishing ? <Loader2Icon size={13} className="animate-spin"/> : <GlobeIcon size={13}/>} Publish
            </button>

            <button onClick={onDownload}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-[#676F9D] text-[#FFFFFF] hover:bg-[#1C2135] hover:border-[#FF9E5E] text-xs font-bold rounded-lg cursor-pointer bg-[#1C2135]/40 backdrop-blur-sm transition'>
                <DownloadIcon size={13} /> Export
            </button>

            <button onClick={onLogout}
            className='inline-flex items-center justify-center gap-1.5 py-1.5 px-3 border border-[#676F9D] text-[#FFFFFF] hover:bg-[#1C2135] hover:border-[#FF9E5E] text-xs font-bold rounded-lg cursor-pointer bg-[#1C2135]/40 backdrop-blur-sm transition'>
                Sign out
            </button>
        </div>
    </header>
  )
}

export default BuilderHeader