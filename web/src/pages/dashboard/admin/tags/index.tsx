import DeleteAlert from "@/components/deleteAlert";
import HeaderMenu from "@/components/headerMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { createTag, deleteTag, fetchTagsList, updateTag } from "@/store/features/tag/truckFunctions";
import { AppDispatch, RootState } from "@/store/store";
import { Tag } from "@/types/Tag";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export type EditCriateTag = {
  name: string,
  editName: string
}

export default function Tags() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditCriateTag>()

  const dispatch: AppDispatch = useDispatch()

  const tagState = useSelector((state: RootState) => state.tags)
  const { toast } = useToast()

  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  async function handleCreateTag(data: EditCriateTag) {
  
    const createData = { ...data, name: data.name };
  
    const result = await dispatch(createTag(createData));
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Tag criada com sucesso.",
      });
      setValue('name', '');
      dispatch(fetchTagsList());
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `${result.error.error}`,
      });
    }
  }

  async function handleUpdateTag(data: EditCriateTag) {
    const updatedData = { ...data, name: data.editName };

    const result = await dispatch(updateTag(editingTag?.id, updatedData ))
    
    if (result.success) {
      toast({
        title: "Sucesso",
        description: "Tag atualizada com sucesso.",
      });
      setValue('editName', '')
      dispatch(fetchTagsList()); 
      reset();
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: `${result.error.error}`,
      });
    }
  }

  async function handleDeleteTag(result: boolean, id: number) {
    if (result) {
      const result = await dispatch(deleteTag(id))
  
      if (result.success) {
        toast({
          title: "Sucesso",
          description: "Tag deletada com sucesso.",
        });
        dispatch(fetchTagsList());  
        reset()
      } else {
        toast({
          variant: "destructive",
          title: "Erro",
          description: `${result.error.error}`,
        });
      }
    }
  }

  async function handleEditTag(tag: Tag) {
    setEditingTag(tag); // Setar a tag que será editada
    setValue('editName', tag.name); // Definir o valor no formulário de edição
  }

  useEffect(() => {
    if (!tagState.tags) {
      dispatch(fetchTagsList());  
    }
  }, [dispatch, tagState.tags])
  

  return(
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <HeaderMenu />
      <div className="mx-auto w-full max-w-4xl mb-5">
        <div className="w-full flex justify-between">
          <h2>Lista de Tags</h2>
          <Popover>
            <PopoverTrigger className="bg-blue-500 py-2 px-3 hover:bg-black text-white rounded-sm" >
              Criar Tag
            </PopoverTrigger>
            <PopoverContent>
              <form className="space-y-6" onSubmit={handleSubmit(handleCreateTag)}>
                <div>
                  <Input 
                    {...register("name")}
                    type="text" 
                    id="name" 
                    placeholder="Tag" 
                    autoComplete="Tag" 
                    name="name"
                  />
                </div> 
                <div>
                  <Button
                  type="submit"
                  className="bg-blue-500 " 
                  >
                    Salvar
                  </Button>
                </div>
              </form> 
            </PopoverContent>
          </Popover>
        </div>
        <table border={1} cellPadding="10" cellSpacing="0" className="w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Posts</th>
              <th>Data de criação</th>
              <th>Data de atualização</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {tagState.tags?.map((tag) => (
              <tr key={tag.id} className="border-black border-2 ">
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.posts?.length}</td>
                <td>{new Date(tag.createdAt).toLocaleDateString()}</td>
                <td>{new Date(tag.updatedAt).toLocaleDateString()}</td>
                <td>
                  <Popover>
                    <PopoverTrigger onClick={() => handleEditTag(tag)}>
                      ✏️
                    </PopoverTrigger>
                    <PopoverContent>
                    <form className="space-y-6" onSubmit={handleSubmit(handleUpdateTag)}>
                      <div>
                        <Input 
                          {...register('editName')}
                          type="text" 
                          id="editName" 
                          placeholder="Tag"
                          autoComplete="Tag" 
                          name="editName"
                        />
                      </div> 
                      <div>
                        <Button
                        type="submit"
                        className="bg-blue-500 " 
                        >
                          Salvar
                        </Button>
                      </div>
                    </form> 
                    </PopoverContent>
                  </Popover>
                </td>
                <td><DeleteAlert onConfirm={handleDeleteTag} id={tag.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}