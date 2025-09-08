import { toast } from "sonner";
import { mutate } from "swr";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const logout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }

    mutate("/user/me", null, false);

   
    mutate("/user/me");

    // Show success toast
    toast.success("Logged out successfully!");

    // Return success, navigation handled in component
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.");
    throw error;
  }
};
