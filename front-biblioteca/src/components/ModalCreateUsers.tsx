"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function ModalCrearUsuario({ open, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rol: "usuario", // 🔥 rol quemado
        }),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        const msg = await res.text();
        setError(`Error al registrar: ${msg}`);
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear cuenta nueva</DialogTitle>
      <DialogContent dividers>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid>
            <TextField
              label="Nombre de usuario"
              name="username"
              fullWidth
              value={form.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <TextField
              label="Correo electrónico"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid>
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              fullWidth
              value={form.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Registrarse
        </Button>
      </DialogActions>
    </Dialog>
  );
}
