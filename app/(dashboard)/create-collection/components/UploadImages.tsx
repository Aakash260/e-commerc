import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


interface UploadImageProps {
    value:string[],
    onChange:(url:string)=>void
    onRemove:(url:string)=>void
}

const UploadImages = ({value,onChange,onRemove}:UploadImageProps) => {
    const onUpload=(result:any)=>{
        console.log(result?.info?.secure_url)
        onChange(result?.info?.secure_url)
    }

  return (

    <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} onSuccess={onUpload}>
  {({ open }) => {
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
      <button className="bg-[#D2DAFF] p-2 rounded-sm" onClick={() => open()}>
      +  Upload an Image
      </button>
        </div>
    );
  }}
</CldUploadWidget>
  )
}

export default UploadImages