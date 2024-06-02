"use client"
 
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import Delete from '@/components/Delete'
import Link from 'next/link'
export const columns: ColumnDef<ProductType>[] = [
 
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=><Link href={`/products/${row.original.id}`}>
        <p>{row.original.title}</p>
      </Link>
    },
    {
      accessorKey: "category",
      header: "Category",
      cell:({row})=><p>{row.original?.category}</p>
    },
    {
      accessorKey: "collections",
      header: "Collections",
      cell:({row})=><p>{row.original?.collections.map((coll)=>coll.title).join(',')}</p>
    },
    {
        accessorKey: "price",
        header: "Price ₹",
        cell:({row})=><p>{row.original?.price}</p>
      },
      {
        accessorKey: "expense",
        header: "Expense ₹",
        cell:({row})=><p>{row.original?.expense}</p>
      },
    {
      id:"actions",
      cell:({row})=><Delete item="products" id={row.original.id}/>
    },
  ]