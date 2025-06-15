"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ModalCrearUsuario from "@/components/ModalCreateUsers";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [openCrearUsuario, setOpenCrearUsuario] = useState(false);

  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usuario,
          password: contrasena,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("rol", data.rol);
        router.push("/home");
      } else {
        setError("Error de autenticación: Usuario o contraseña incorrectos.");
      }
    } catch {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-200 to-indigo-300">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <Typography
            variant="h5"
            className="text-center font-semibold text-gray-800"
          >
            Iniciar Sesión
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />

          <Button
            variant="text"
            fullWidth
            className="rounded-xl bg-purple-200 text-purple-600"
            onClick={handleLogin}
          >
            Ingresar
          </Button>

          <Button
            fullWidth
            className="rounded-xl bg-purple-200 text-purple-600"
            onClick={() => setOpenCrearUsuario(true)}
          >
            Crear cuenta nueva
          </Button>
        </CardContent>
      </Card>

      <ModalCrearUsuario
        open={openCrearUsuario}
        onClose={() => setOpenCrearUsuario(false)}
        onSuccess={() => {
          setOpenCrearUsuario(false);
          alert("Usuario registrado con éxito.");
        }}
      />
    </div>
  );
}