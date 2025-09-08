const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export const fetcher = async (url: string) => {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const res = await fetch(fullUrl, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
