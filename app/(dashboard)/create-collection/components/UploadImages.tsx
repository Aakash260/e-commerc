import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


interface UploadImageProps {
    value:string[],
    onChange:(value:string)=>void
    onRemove:(value:string)=>void
}

const UploadImages = ({value,onChange,onRemove}:UploadImageProps) => {
    const onUpload=(result:any)=>{
        console.log(result?.info?.secure_url)
        onChange(result?.info?.secure_url)
    }

  return (

  
  
        <div className=''>
   <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-400 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
 
      <CldUploadWidget uploadPreset="gzcnwsjd" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button type="button" onClick={() => open()} className="bg-gray-400 text-white">
              {/* <Plus className="h-4 w-4 mr-2" /> */}
            +  Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
    );
}

export default UploadImages