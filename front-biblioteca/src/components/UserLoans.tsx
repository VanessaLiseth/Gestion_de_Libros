"use client";

import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

interface Loan {
  id: number;
  user_id: number;
  user_name: string;
  book_id: number;
  book_title: string;
  loan_date: string;
  loan_devolution: string | null;
  status: string;
}

interface Props {
  userId: number;
}

export default function UserLoans({ userId }: Props) {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/loans/${userId}`)
      .then(response => response.json())
      .then(data => setLoans(data))
      .catch(error => console.error('Error fetching loans:', error));
  }, [userId]);

  const handleReturnClick = (id: number) => {
    setSelectedLoanId(id);
    setOpenDialog(true);
  };

  const handleConfirmReturn = () => {
    if (selectedLoanId !== null) {
      fetch(`http://localhost:8080/return/${selectedLoanId}`, {
        method: 'POST',
      })
        .then(() => {
          setLoans(loans =>
            loans.map(loan =>
              loan.id === selectedLoanId
                ? {
                    ...loan,
                    status: 'Devuelto',
                    loan_devolution: new Date().toISOString().split('T')[0],
                  }
                : loan
            )
          );
        })
        .catch(error => console.error('Error returning book:', error));
    }
    setOpenDialog(false);
    setSelectedLoanId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Libros pedidos por el usuario</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Usuario</th>
            <th className="py-2 px-4 border-b">Libro</th>
            <th className="py-2 px-4 border-b">Fecha Préstamo</th>
            <th className="py-2 px-4 border-b">Fecha Devolución</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td className="py-2 px-4 border-b">{loan.user_name}</td>
              <td className="py-2 px-4 border-b">{loan.book_title}</td>
              <td className="py-2 px-4 border-b">{loan.loan_date}</td>
              <td className="py-2 px-4 border-b">{loan.loan_devolution || '-'}</td>
              <td className="py-2 px-4 border-b">{loan.status}</td>
              <td className="py-2 px-4 border-b">
                {loan.status !== 'Devuelto' && (
                  <Button variant="contained" color="primary" onClick={() => handleReturnClick(loan.id)}>
                    Devolver
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Devolución</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas marcar este libro como devuelto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmReturn} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
