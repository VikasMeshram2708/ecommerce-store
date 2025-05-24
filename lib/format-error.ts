import { Prisma } from "./generated/prisma";

export function formatError(error: unknown): string {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return "This item already exists in your cart.";
      case "P2003":
        return "Invalid reference (foreign key constraint failed).";
      case "P2025":
        return "Record not found.";
      default:
        return `Database error: ${error.message}`;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return "Invalid data format.";
  } else if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred.";
}
