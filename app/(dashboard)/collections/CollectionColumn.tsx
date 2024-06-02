"use client"
 
import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import Delete from '../../../components/Delete'
import Link from 'next/link'
export const columns: ColumnDef<CollectionType>[] = [
 
    {
      accessorKey: "title",
      header: "Title",
      cell:({row})=><Link href={`/collections/${row.original.id}`}>
        <p>{row.original.title}</p>
      </Link>
    },
    {
      accessorKey: "products",
      header: "Products",
      cell:({row})=><p>{row.original?.productsId?.length ? row.original.productsId.length:0}</p>
    },
    {
      id:"actions",
      cell:({row})=><Delete item="collections" id={row.original.id}/>
    },
  ]