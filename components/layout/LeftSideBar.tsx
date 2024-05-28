import React from 'react'
import Image from 'next/image'
import { MenuItems } from '@/lib/MenuItems'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const LeftSideBar = () => {

  return (
    <div className="min-h-[100vh] bg-[#D2DAFF] hidden lg:block w-[250px] p-4">
      <div>
        <div className="logo w-full p-4">
         <Image
         src="/logo.png"
         alt=""
         width={500}
         height={300}
         className='size-full'
         /> 
        </div>
        <div className="menuItems grid gap-4 mt-8">
{MenuItems.map((i,index)=>{
const {title,link,svg}=i
  return<div key={title} >
    <div className='flex items-center gap-2 cursor-pointer'>
      <div className="icon">
        {svg}
      </div>
     <Link href={link}>
      <div className="title text-2xl flex  hover:text-blue-600">
        {title}
      </div>
    </Link>
    </div>
  </div>
})}
        </div>
        <div className="edit  gap-2 mt-8 flex items-center">
          <UserButton />
          <div className='text-center text-2xl'>Edit Profile</div>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar