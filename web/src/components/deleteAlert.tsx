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
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export default function DeleteAlert({ onConfirm, id }: { onConfirm: (result: boolean) => void, id: number }) {
  const handleDelete = () => {
    onConfirm(true);
  };
  
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button
          className="hover:bg-red-500 p-2 rounded-full hover:text-white"
        >
          <Trash2 />
        </button>
      </AlertDialogTrigger>
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