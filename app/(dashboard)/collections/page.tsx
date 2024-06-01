'use client'
import React from 'react'
import LargeSizeLayout from "../../../components/layout/LargeScreenContainer";
import {  useQuery} from '@tanstack/react-query'
import axios from 'axios' 
 import { DataTable } from '@/components/DataTable';
 import { columns } from './CollectionColumn';
import { Input } from '@/components/ui/input';
const Collections = () => {

  const { isPending, error, data,isError } = useQuery({
    queryKey: ['showCollections'],
    queryFn: async() => {
      const data=await axios.get('/api/collections')
      console.log(data)
      return data.data
    }, 
  })
 
  return (
    <LargeSizeLayout>
{isPending?<div>loading...</div>:
     <div>
       <div className="overflow-hidden flex justify-between">
       
        <div className='bg-blue-500 p-2 text-xl rounded-md cursor-pointer'>+ Create Collection</div>
        </div>
          <hr className="mt-4 mb-8 border-2 border-black" />
          <div>
             
         {(data && data.length )&& <DataTable columns={columns} data={data} />}
          </div>
     </div>}
      </LargeSizeLayout>
  )
}

export default Collections