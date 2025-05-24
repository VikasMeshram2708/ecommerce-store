"use server";

import { formatError } from "@/lib/format-error";
import prisma from "@/lib/prisma";
import {
  CartItemSchema,
  cartItemSchema,
  deleteSchema,
  DeleteSchema,
} from "@/models/cart";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Adds the items to user's cart
export async function addToCart(data: CartItemSchema) {
  try {
    // Auth check
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // Validate input
    const parsed = cartItemSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid data",
        schemaError: parsed.error.flatten().fieldErrors,
      };
    }

    // Extract validated data
    const {
      category,
      description,
      image,
      price,
      quantity,
      rating,
      skuId,
      title,
    } = parsed.data;

    // Run atomic transaction
    return await prisma.$transaction(async (tx) => {
      // Upsert user record (create if doesn't exist)
      await tx.user.upsert({
        where: { tenantId: user.id },
        update: {
          email: user.primaryEmailAddress?.emailAddress ?? "",
          name: user.fullName ?? "",
          picture: user.imageUrl ?? "",
        },
        create: {
          tenantId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          name: user.fullName ?? "",
          picture: user.imageUrl ?? "",
        },
      });

      // Check if cart item already exists for user and skuId
      const existingCartItem = await tx.cartItem.findUnique({
        where: {
          skuId_userId: {
            userId: userId,
            skuId: skuId,
          },
        },
      });

      if (existingCartItem) {
        // Update quantity of existing cart item
        await tx.cartItem.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + quantity,
            updatedAt: new Date(),
          },
        });
      } else {
        // Create rating first (with default values if not provided)
        const newRating = await tx.rating.create({
          data: {
            rate: rating?.rate ?? 0,
            count: rating?.count ?? 0,
          },
        });

        // Create new cart item
        await tx.cartItem.create({
          data: {
            category,
            description,
            image,
            price,
            skuId,
            title,
            quantity,
            ratingId: newRating.id,
            userId: userId,
          },
        });
      }

      revalidatePath("/**");

      return { success: true, message: "Added to cart" };
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Delete the item from user's cart
export async function deleteItem(data: DeleteSchema) {
  try {
    // auth
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) throw new Error("Unauthorized");

    // sanitize
    const parsed = deleteSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: "Invalid data",
        schemaError: parsed.error.flatten().fieldErrors,
      };
    }
    const { id } = parsed.data;
    // db action
    // check the item exist
    await prisma.$transaction(async (ctx) => {
      const itemExists = await ctx.cartItem.findUnique({
        where: {
          id: id ?? "",
        },
      });

      // if not throw error
      if (!itemExists) {
        return {
          message: "Item not found",
          success: false,
        };
      }
      // delete the item
      await ctx.cartItem.delete({
        where: {
          id: id ?? "",
        },
      });
    });
    // revalidate
    revalidatePath("/**");
    // return response
    return {
      success: true,
      message: "Item removed",
    };
  } catch (error) {
    console.error("Error delete item from cart:", error);
    return {
      success: false,
      message: formatError(error),
    };
  }
}
