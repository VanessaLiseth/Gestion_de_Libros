"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";

type Option = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function ModalCrearLibro({ open, onClose, onSuccess }: Props) {
  const [autores, setAutores] = useState<Option[]>([]);
  const [categorias, setCategorias] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    publication_date: "",
    isbn: "",
    stock: 0,
    autor_id: "",
    category_id: "",
  });

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [resAutores, resCategorias] = await Promise.all([
            fetch("http://localhost:8080/authors"),
            fetch("http://localhost:8080/categories"),
          ]);
          const autoresData = await resAutores.json();
          const categoriasData = await resCategorias.json();
          setAutores(autoresData);
          setCategorias(categoriasData);
        } catch (error) {
          console.error("Error cargando datos:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8080/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stock: Number(form.stock),
          autor_id: Number(form.autor_id),
          category_id: Number(form.category_id),
        }),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert("Error al crear libro");
      }
    } catch  {
      alert("Error en la conexión");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear nuevo libro</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <div className="flex justify-center py-8">
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} className="pt-2">
            <Grid >
              <TextField
                fullWidth
                label="Título"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid >
              <TextField
                fullWidth
                type="date"
                label="Fecha de publicación"
                name="publication_date"
                value={form.publication_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                label="ISBN"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                type="number"
                label="Stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Autor"
                name="autor_id"
                value={form.autor_id}
                onChange={handleChange}
              >
                {autores.map((autor) => (
                  <MenuItem key={autor.id} value={autor.id}>
                    {autor.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid>
              <TextField
                fullWidth
                select
                label="Categoría"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
