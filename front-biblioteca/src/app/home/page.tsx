"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  TableContainer,
  CircularProgress,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ModalCrearLibro from "@/components/ModalCreateBooks";
import { Logout } from "@mui/icons-material";

type Libro = {
  id: number;
  title: string;
  publication_date: string;
  isbn: string;
  stock: number;
  autor: string;
  category: string;
};

export default function Dashboard() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(true);
  const [rol, setRol] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const fetchLibros = async () => {
    try {
      const res = await fetch("http://localhost:8080/books");
      const data = await res.json();
      setLibros(data);
    } catch (error) {
      console.error("Error al cargar libros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
    fetchLibros();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-700">
          Catálogo de Libros
        </Typography>

        {rol === "admin" && (
          <>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              className="rounded-xl bg-purple-200 text-purple-600"
            >
              Crear nuevo libro
            </Button>

            <ModalCrearLibro
              open={openModal}
              onClose={() => setOpenModal(false)}
              onSuccess={() => {
                fetchLibros();
                setOpenModal(false);
              }}
            />
          </>
        )}
      </div>

      <Tooltip title="Cerrar sesión">
        <IconButton
          color="error"
          onClick={() => {
            localStorage.removeItem("rol");
            router.push("/");
          }}
        >
          <Logout />
        </IconButton>
      </Tooltip>

      {loading ? (
        <div className="flex justify-center items-center mt-12">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="shadow-md rounded-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-purple-200">
                <TableCell>
                  <strong>Título</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha de Publicación</strong>
                </TableCell>
                <TableCell>
                  <strong>ISBN</strong>
                </TableCell>
                <TableCell>
                  <strong>Stock</strong>
                </TableCell>
                <TableCell>
                  <strong>Autor</strong>
                </TableCell>
                <TableCell>
                  <strong>Categoría</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {libros.map((libro) => (
                <TableRow key={libro.id}>
                  <TableCell>{libro.title}</TableCell>
                  <TableCell>{libro.publication_date}</TableCell>
                  <TableCell>{libro.isbn}</TableCell>
                  <TableCell>{libro.stock}</TableCell>
                  <TableCell>{libro.autor}</TableCell>
                  <TableCell>{libro.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
