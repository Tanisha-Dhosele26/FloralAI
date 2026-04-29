const BASE_URL = "http://localhost:5000/api";

export const authFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`, // ✅ centralized
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.msg || data.error || "Request failed");
  }

  return data;
};
