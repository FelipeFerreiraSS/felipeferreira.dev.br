import { useState } from "react";
import { 
  AlertDialog,
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog";

export default function DeleteAlert({ onConfirm, id }: { onConfirm: (result: boolean) => void, id: number }) {
  const handleDelete = () => {
    onConfirm(true);
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>🗑️</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar este item?</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja deletar este item? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}