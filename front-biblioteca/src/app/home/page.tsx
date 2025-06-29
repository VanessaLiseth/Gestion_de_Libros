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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ModalCrearLibro from "@/components/ModalCreateBooks";
import { Logout } from "@mui/icons-material";
import Navbar from "@/components/NavBarComponent";

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
  const [confirmLoanOpen, setConfirmLoanOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
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

  const handleLoanRequest = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || selectedBookId === null) return;

    try {
      await fetch("http://localhost:8080/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: parseInt(userId),
          book_id: selectedBookId,
        }),
      });
      alert("Préstamo realizado exitosamente.");
    } catch (error) {
      console.error("Error al realizar el préstamo:", error);
    } finally {
      setConfirmLoanOpen(false);
      setSelectedBookId(null);
    }
  };

  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    setRol(storedRol);
    fetchLibros();
  }, []);

  return (
    <>
      <Navbar />
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
                  <TableCell><strong>Título</strong></TableCell>
                  <TableCell><strong>Fecha de Publicación</strong></TableCell>
                  <TableCell><strong>ISBN</strong></TableCell>                  
                  <TableCell><strong>Autor</strong></TableCell>
                  <TableCell><strong>Categoría</strong></TableCell>
                  <TableCell><strong>Acción</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {libros.map((libro) => (
                  <TableRow key={libro.id}>
                    <TableCell>{libro.title}</TableCell>
                    <TableCell>{libro.publication_date}</TableCell>
                    <TableCell>{libro.isbn}</TableCell>                    
                    <TableCell>{libro.autor}</TableCell>
                    <TableCell>{libro.category}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedBookId(libro.id);
                          setConfirmLoanOpen(true);
                        }}
                      >
                        Pedir Préstamo
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <Dialog open={confirmLoanOpen} onClose={() => setConfirmLoanOpen(false)}>
        <DialogTitle>Confirmar Préstamo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas solicitar el préstamo de este libro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmLoanOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleLoanRequest} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
