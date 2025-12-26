import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import React, { useState } from 'react'
import logo from "../assets/logo.png"

const Promt = () => {
  const [inputValue,setInputValue]=useState("")
  const [typeMessage,setTypeMessage]=useState(" ")

  const handelSend=()=>{
    const trimmed = inputValue.trim();
    if(!trimmed) return;
    setTypeMessage(trimmed)
    setInputValue("") 
  }

  const handelKeyDown=(e)=>{
    if(e.key ==="Enter"){
      handelSend()
  }
}
  return (
    <div className="flex flex-col items-center justify-between flex-1 w-full px-4 pb-4 md:pb-8">
        {/* ➤ Greeting Section */}
      <div className="mt-8 md:mt-16 text-center">
        <div className="flex items-center justify-center gap-2">
          <img src={logo} alt="" className="h-8" />
          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Hi, I'm DeepSeek.
          </h1>
        </div>
        <p className="text-gray-400 text-base md:text-sm mt-2">
          💬 How can I help you today?
        </p>
      </div>

      {/* promt */}
      <div className="w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1">
        {typeMessage?.trim().length > 0 && (
          <div className='w-full flex justify-end '>
            <div className='bg-blue-700  text-white self-end max-w-[75%] rounded-2xl px-4 py-2'>
              {typeMessage}
            </div>
          </div>
        )} 
       </div>
       {/* input */}
       <div className="w-full max-w-4xl relative mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-4 md:px-6 py-6 md:py-8 shadow-md">
            <input   type="text" 
                     value={inputValue}
                     onChange={(e)=>setInputValue(e.target.value)}
                     onKeyDown={handelKeyDown}
                     placeholder='💬 Message DeepSeek '  
                     className="bg-transparent w-full text-white placeholder-gray-400 text-base md:text-lg outline-none"/>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
            <div className="flex gap-2 flex-wrap">
                    <button className="flex items-center gap-2 border border-gray-500 text-white text-sm 
                    md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition"> 
                    <Bot className="w-4 h-4" />
                    DeepThink (R1)
                    </button>
                    <button className="flex items-center gap-2 border border-gray-500 text-white text-sm 
                    md:text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                    <Globe className="w-4 h-4" />
                    Search
                    </button>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <button className="text-gray-400 hover:text-white transition">
                    <Paperclip className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={handelSend}
                        className="bg-gray-500 hover:bg-blue-600 p-2 rounded-full text-white transition">
                        <ArrowUp className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
       </div>
    </div>
  )
} 

export default Promt