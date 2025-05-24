import * as z from "zod";

// Create item schema
export const cartItemSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
  skuId: z.string(),
  quantity: z.number().default(1),
});

export type CartItemSchema = z.infer<typeof cartItemSchema>;

// Delete item schema
export const deleteSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
});
export type DeleteSchema = z.infer<typeof deleteSchema>;
