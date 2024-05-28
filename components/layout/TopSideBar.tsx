import React from 'react'
import Image from 'next/image'
import { MenuItems } from '@/lib/MenuItems'
import { UserButton } from '@clerk/nextjs'
const TopSideBar = () => {

  return (
    <div className="bg-[#D2DAFF] hidden md:block lg:hidden w-[100vw] sticky top-0 left-0 h-[100px]">
      <div className='flex justify-center items-baseline gap-2'>
        <div className="logo ">
         <Image
         src="/logo.png"
         alt=""
         width={100}
         height={100}
         className='size-full'
         /> 
        </div>
        <div className="menuItems flex gap-2 mt-4">
{MenuItems.map((i,index)=>{

  return <div key={i.title} className='flex items-center gap-2 cursor-pointer'>
    <div className="icon">
      {i.svg}
    </div>
    <div className="title text-xl  flex  hover:text-blue-600">
      {i.title}
    </div>
  </div>
})}
        <div className="edit  gap-1 ml-4 mt-4 grid place-content-center">
          <UserButton />
          <span className='text-center text-xl'>Edit</span>
        </div>
        </div>
      </div>
    </div>
  )
}

export default TopSideBar