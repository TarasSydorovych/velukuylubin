"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verify-token", {
          method: "POST", // або "GET", якщо твій endpoint дозволяє
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();

        if (result.valid) {
          setIsVerified(true);
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  if (!isVerified) return <div>Завантаження...</div>;
  return children;
}
