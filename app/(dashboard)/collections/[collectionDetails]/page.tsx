'use client'
import React from 'react'
import {
    useQuery,
 
  } from '@tanstack/react-query'
  import axios from 'axios'
import { CreateCollection } from '../../create-collection/components/CreateCollection'

  interface Params{
    collectionDetails:string
  }
import LargeSizeLayout from '@/components/layout/LargeScreenContainer'
const page = ({params}:{params:Params}) => {
  
const getSingleCollection=async()=>{
    const {data}=await axios.get(`/api/collections/${params.collectionDetails}`)
    return data
}
    const {data,isPending} = useQuery({ queryKey: ['getSingleCollection'], 
    queryFn: getSingleCollection
    

}
 
)
    
  return (
    <LargeSizeLayout>
    <div className="">
      <div className="text-4xl overflow-hidden">Edit collection</div>
      <hr className="mt-4 mb-8 border-2 border-black" />
      <div className="form">
        {
            data &&  <CreateCollection initialData={data}/>
        }
       
      </div>
    </div>
  </LargeSizeLayout>
  )
}

export default page