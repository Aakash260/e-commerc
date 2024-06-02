"use client";
import React from "react";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast"
interface ErrorResponse {
  response?: {
    data: string;
  };
}

const Delete = ({ id,item }: { id: string,item:string }) => {

  const queryClient = useQueryClient()
  const { toast } = useToast()
  const deleteCollection = async (collectionId: string) => {
    const url= item==='products'?`/api/products/${collectionId}`:`/api/collections/${collectionId}`
    const response = await axios.delete(url);
    return response.data;
  };

  const { mutate, isPending, reset } = useMutation({
    mutationFn: deleteCollection,
    onSuccess: (data) => {
      console.log("Collection deleted successfully:", data);
      toast({
        title:data ,
        description: "Collection deleted successfully",
      })
      queryClient.invalidateQueries({ queryKey: ['showCollections'] })
    },
    onError: (error: ErrorResponse) => {
     
      console.log("Error creating collection:", error);
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="">
          <Trash />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
