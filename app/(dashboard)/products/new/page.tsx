import React from 'react'
import LargeSizeLayout from '@/components/layout/LargeScreenContainer'
import { ProductForm } from './_component/ProductForm'
const CreateProduct = () => {
  return (
    <LargeSizeLayout>
    <div className="">
      <div className="text-4xl overflow-hidden">Create product</div>
      <hr className="mt-4 mb-8 border-2 border-black" />
      <div className="form">
       <ProductForm/>
      </div>
    </div>
  </LargeSizeLayout>
  )
}

export default CreateProduct