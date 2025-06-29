"use client";
import { useParams } from "next/navigation";
import UserLoans from "@/components/UserLoans"; 
import Navbar from "@/components/NavBarComponent";

export default function PrestamosPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  return (
    <>
      <Navbar />
      <UserLoans userId={id} />
    </>
  );
}
