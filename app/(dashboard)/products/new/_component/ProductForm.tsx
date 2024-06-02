"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import MultiText from "@/components/MultiText";
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
import UploadImages from "@/app/(dashboard)/create-collection/components/UploadImages";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Collections from "@/app/(dashboard)/collections/page";
import MultiSelect from "./MultiSelect";

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
  media: z.array(z.string()),
  category: z.string(),
  collectionsId: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(2),
  expense: z.coerce.number().min(1),
});

interface ErrorResponse {
  response?: {
    data: string;
  };
}

// 1. Define your form.
type FormData = z.infer<typeof formSchema>;

// Define the initial data type (can be optional fields)
type InitialData = Partial<FormData> & { id: string };

export function ProductForm({
  initialData,
}: {
  initialData?: InitialData | null;
}) {
  console.log(initialData);

  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collectionsId: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 2,
          expense: 1,
        },
  });

  // 2. Define a submit handler.

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate(values);
  };

  const postCollection = async (newCollection: z.infer<typeof formSchema>) => {
    const url = initialData
      ? `/api/products/${initialData?.id}`
      : "/api/products";
    const response = await axios.post(url, newCollection);
    console.log(response)
    return response.data;
  };

  const { mutate, isPending, reset } = useMutation({
    mutationFn: postCollection,
    onSuccess: (data) => {
      toast({
        title: data?.response?.data,
        description: initialData
          ? "Products updated successfully"
          : "Products created successfully.",
      });

      console.log("Products created successfully:", data);
        router.push("/products");
    },
    onError: (error: ErrorResponse) => {
      toast({
        title: error?.response?.data,
        description: "There was an error creating products",
        variant: "destructive",
      });

      console.log("Error creating products:", error);
    },
  });

  const router = useRouter();

  const {
    error,
    data: collections,
    isError,
  } = useQuery({
    queryKey: ["showCollections"],
    queryFn: async () => {
      const data = await axios.get("/api/collections");
      console.log(data);
      return data.data;
    },
  });

  console.log(collections);
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
              name="media"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <UploadImages
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange([
                          ...field.value.filter((image) => image !== url),
                        ])
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Upload collection image here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="md:grid md:grid-cols-3 gap-6 relative">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={2}
                        placeholder="Price"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense (₹)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Expense"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Tags"
                        value={field.value}
                        onChange={(tag) =>
                          field.onChange([...field.value, tag])
                        }
                        onRemove={(url) =>
                          field.onChange([
                            ...field.value.filter((tag) => tag !== url),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {collections && collections.length > 0 && (
                <FormField
                  control={form.control}
                  name="collectionsId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collections</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Collections"
                          collections={collections}
                          value={field.value}
                          onChange={(id) =>
                            field.onChange([...field.value, id])
                          }
                          onRemove={(idToRemove) =>
                            field.onChange([
                              ...field.value.filter(
                                (collectionId) => collectionId !== idToRemove
                              ),
                            ])
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-1" />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Colors"
                        value={field.value}
                        onChange={(color) =>
                          field.onChange([...field.value, color])
                        }
                        onRemove={(colorToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (color) => color !== colorToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes(small|medium|large)</FormLabel>
                    <FormControl>
                      <MultiText
                        placeholder="Sizes"
                        value={field.value}
                        onChange={(size) =>
                          field.onChange([...field.value, size])
                        }
                        onRemove={(sizeToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (size) => size !== sizeToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
