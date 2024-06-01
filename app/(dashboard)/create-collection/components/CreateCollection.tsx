"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImages from "./UploadImages";
import {useMutation,useQuery} from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"; 
  
const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z
    .string()
    .min(40, {
      message: "Description must be at least 40 characters.",
    })
    .max(1000, {
      message: "Description must not exceeds 1000 characters.",
    }),
  image: z.string(),
});

interface ErrorResponse {
  response?: {
    data: string
  };
}


  // 1. Define your form.
  type FormData = z.infer<typeof formSchema>;

// Define the initial data type (can be optional fields)
type InitialData = Partial<FormData>  & { id: string };;
 



export function CreateCollection({initialData}:{initialData?:InitialData|null}) {
console.log(initialData?.id)
  
  const { toast } = useToast()
  


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData ?initialData: {
      title: "",
      description: "",
      image: "",
    },
  });

  // 2. Define a submit handler.

  const onSubmit = (values: z.infer<typeof formSchema>) => {
   
    mutate(values);
  };

  const postCollection=async (newCollection: z.infer<typeof formSchema>) => {
    
    const url= initialData?`/api/collections/${initialData?.id}`:"/api/collections"
    const response = await axios.post(url, newCollection);
    return response.data;
  }

  const { mutate, isPending,reset } = useMutation({
    mutationFn: postCollection,
    onSuccess: (data) => {
      toast({
        title: data?.response?.data,
        description:initialData?"Collection updated successfully":"Collection created successfully.",
        
      })  
    
      console.log("Collection created successfully:", data);
      router.push('/collections')
    },
    onError: (error:ErrorResponse) => {
      toast({
        title:error?.response?.data ,
        description: "There was an error creating collection",
        variant:"destructive"
      })   
    
          console.log("Error creating collection:", error);
    },
  });
  
 const router=useRouter()

 
  return (
    <div>
      {isPending ? (
        <div className="grid place-content-center inset-0">
          <Progress value={33} className=" w-[30vw]" />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your collection title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} rows={5} />
                  </FormControl>
                  <FormDescription>This is your description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImages
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload collection image here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-10">
              <Button type="submit">Submit</Button>
              <Button>Discard</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
