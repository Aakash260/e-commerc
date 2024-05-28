'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react'
import { MenuItems } from '@/lib/MenuItems';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
const MobileSideBar = () => {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='md:hidden bg-[#D2DAFF] z-[100] w-[100vw] sticky top-0 left-0 min-h-14'>
         <div className='flex items-center justify-between px-2'>
             <div className="logo w-[150px]">
             <Image
             src="/logo.png"
             alt="logo"
             width={100}
             height={100}
             className='size-full'
             /> 
                     </div>
                     <div className='flex justify-end items-center cursor-pointer mt-2'>
                     <div className='flex items-center gap-2'>
                         <div className="edit  gap-2 flex items-center">
                                   <UserButton />
                                
                                 </div>
                                            <div onClick={()=>setOpen(!open)}>
                                      
                                            { !open? <Menu size={38}/>:<X />}
                                            </div>
                     </div>
                     </div>
         </div>
        
        {open && <div className='bg-inherit p-4'>
        <div className="menuItems grid gap-4 mt-8">
{MenuItems.map((i,index)=>{

  return <div key={i.title} className='flex items-center gap-2 cursor-pointer'>
    <div className="icon">
      {i.svg}
    </div>
    <div className="title text-2xl flex  hover:text-blue-600">
      {i.title}
    </div>
  </div>
})}
        </div>
       
                      </div>}
    </div>
  )
}

export default MobileSideBar