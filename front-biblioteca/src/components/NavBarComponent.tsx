"use client";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setUserId(storedId);
  }, []);

  return (
    <AppBar position="static" className="bg-purple-600">
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          className="cursor-pointer"
          onClick={() => router.push("/home")}
        >
          Biblioteca
        </Typography>
        <div className="flex gap-4">
          <Button color="inherit" onClick={() => router.push("/home")}>
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              if (userId) {
                router.push(`/loans/${userId}`);
              } else {
                alert("No se ha encontrado el ID del usuario.");
              }
            }}
          >
            Préstamos
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
