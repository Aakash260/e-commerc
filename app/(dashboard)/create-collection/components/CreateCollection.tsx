"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from 'axios'
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
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z
    .string()
    .min(40, {
      message: "Description must be at least 40 characters.",
    })
    .max(400, {
      message: "Description must not exceeds 400 characters.",
    }),
  image: z.string(),
});

export function CreateCollection() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  // 2. Define a submit handler.

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    mutate(values);
  };

  const { mutate } = useMutation({
    mutationFn: async(newCollection:z.infer<typeof formSchema>) => {  
      console.log(newCollection)
      const response = await axios.post('/api/collections', newCollection);
      return response.data
    },
    onSuccess: (data) => {
      console.log('Collection created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating collection:', error);
    },
  });

  return (
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
              <FormDescription>This is your collection title</FormDescription>
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
              <FormDescription>Upload collection image here</FormDescription>
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
  );
}
