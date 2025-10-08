import z from "zod";


export const wishlistSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  productId: z.string().min(1, "Product ID is required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters long"),
});