import React, { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {GuestLayout, AuthLayout} from './pages/Layout'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'
import { Toaster } from 'react-hot-toast'
import PublishPage from './pages/PublishPage'

const Splash = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 500); // 500ms fade transition
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0D17] text-[#FFFFFF] transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <img src="/logo.svg" alt="Prompt IT" className="w-12 h-12 mb-4 animate-pulse" />
         <span className="text-2xl font-bold tracking-tight">Prompt IT</span>
    </div>
  );
}

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const handleShowSplash = () => {
      setShowSplash(true);
    };
    window.addEventListener('show-splash', handleShowSplash);
    return () => window.removeEventListener('show-splash', handleShowSplash);
  }, []);

  return (
    <>
    {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
    <Toaster />
    <Routes>
      {/* Login Routes */}
      <Route element={<GuestLayout/>}>
        <Route path='/login' element={<AuthPage mode="login"/>}/>
        <Route path='/register' element={<AuthPage mode="register"/>}/>
      </Route>

      {/* Protected Routes */}
      <Route element={<AuthLayout/>}>
        <Route path='/' element={<HomePage />}/>
        <Route path='/builder/:id' element={<BuilderPage />}/>
        <Route path='/preview/:id' element={<PreviewPage />}/>
      </Route>

      {/* Public Routes */}
      <Route path='/publish/:id' element={ <PublishPage />}/>


 {/* Catch-all */}
 <Route path='*' element={<Navigate to="/" replace />}/>

    </Routes>
    </>
    
  )
}

export default App