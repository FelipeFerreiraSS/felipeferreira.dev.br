'use client'

import { useState, useCallback, useMemo, ChangeEvent } from 'react'
import { PutBlobResult } from '@vercel/blob'
import { AppDispatch } from '@/store/store'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { fetchUserInfo, getUserById, updateProfileImage } from '@/store/features/user/truckFunctions'

type UploaderProfileImagesProps = {
  profileImageUrl: string | null
  userId: number | undefined
  updateMyProfileImage: boolean
  onSuccess: () => void
}

export default function UploaderProfileImages(props: UploaderProfileImagesProps) {
  const { userId, updateMyProfileImage, profileImageUrl, onSuccess } = props
  console.log(updateMyProfileImage);
  
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const dispatch: AppDispatch = useDispatch()

  const { toast } = useToast()

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          console.log('File size too big (max 5MB)')
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setSaving(true);
    if (profileImageUrl) {
      const isSuccess = await dispatch(updateProfileImage(file, userId, profileImageUrl));
      if (isSuccess) {
        if (updateMyProfileImage) {
          await dispatch(fetchUserInfo());
        } else {
          await dispatch(getUserById(userId));
        }
        setData({ image: null });
        onSuccess();
        toast({
          title: 'Sucesso',
          description: 'Imagem de perfil atualizada com sucesso.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Falha ao atualizar a imagem.',
        });
      }
    } else {
      const isSuccess = await dispatch(updateProfileImage(file, userId));
      if (isSuccess) {
        if (updateMyProfileImage) {
          await dispatch(fetchUserInfo());
        } else {
          await dispatch(getUserById(userId));
        }
        setData({ image: null });
        onSuccess();
        toast({
          title: 'Sucesso',
          description: 'Imagem de perfil adicionada com sucesso.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Falha ao adicionada imagem de perfil.',
        });
      }
    }
    setSaving(false);
  }

  const saveDisabled = useMemo(() => {
    return !data.image || saving
  }, [data.image, saving])

  return (
    <form
      className="grid gap-6"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Upload de imagem</h2>
          <p className="text-sm text-gray-500">
            Formatos aceitos: .png, .jpg, .gif, .svg, .webp 
          </p>
        </div>
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
              if (file) {
                if (file.size / 1024 / 1024 > 5) {
                  console.log('File size too big (max 5MB)');
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
              data.image
                ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
                : 'bg-white opacity-100 hover:bg-gray-50'
            }`}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500">
              Arraste e solte ou clique para fazer upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Tamanho máximo do arquivo: 5 MB
            </p>
            <span className="sr-only">Upload de imagens</span>
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      <button
        disabled={saveDisabled}
        className={`${
          saveDisabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            : 'border-black bg-black text-white hover:bg-white hover:text-black'
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {saving ? (
          //<LoadingDots color="#808080" />
          <></>
        ) : (
          <p className="text-sm">Confirmar upload</p>
        )}
      </button>
    </form>
  )
}