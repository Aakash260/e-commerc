'use client'
import LargeSizeLayout from '@/components/layout/LargeScreenContainer'
import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProductForm } from '../new/_component/ProductForm'
interface Params{
    productDetails:string
  }
  
const page = ({params}:{params:Params}) => {
    console.log(params)
    const getSingleProduct=async()=>{
        const {data}=await axios.get(`/api/products/${params.productDetails}`)
        
        return data
    }
        const {data,isPending} = useQuery({ queryKey: ['getSingleProduct'], 
        queryFn: getSingleProduct
    })

  return (
    <LargeSizeLayout>
    <div className="">
      <div className="text-4xl overflow-hidden">Edit product</div>
      <hr className="mt-4 mb-8 border-2 border-black" />
      <div className="form">
        {
             data &&  <ProductForm initialData={data}/>
        }
       
      </div>
    </div>
  </LargeSizeLayout>
  )
}

export default page