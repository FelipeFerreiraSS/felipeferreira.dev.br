import HeaderMenu from "@/components/headerMenu";
import Uploader from "@/components/uploader";

export default function Gallery() {
  return(
    <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}>
      <HeaderMenu />
      <div className="mx-auto w-full max-w-4xl mb-5">
        <h2>Imagens</h2>
        <Uploader />
      </div>
    </div>
  )
}