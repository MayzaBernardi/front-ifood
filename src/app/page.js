import Image from "next/image";

export default function Home() {
  return (
    
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 font-sans text-[#3e3e3e]">
      
      <main className="flex w-full max-w-xl flex-col items-center gap-10 rounded-2xl bg-white p-12 shadow-sm sm:items-start">
        
        <div className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Aqui não tem nada
          </h1>
          <p className="text-lg text-gray-500">
            não tem nadaaaaaa 
            <a
              href="#"
              className="mx-1 font-semibold text-[#ea1d2c] hover:underline"
            >
              nada
            </a> 
            nadaaaaa
          </p>
        </div>

        <div className="relative w-14 h-14">
          <Image 
            src="/images.jpg" 
            alt="Descricao"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          {}
          <button
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-lg bg-[#ea1d2c] px-8 text-white transition-all hover:bg-[#d01a27] font-semibold"
          >
            nadinhaaa
          </button>

          {}
          <button
            className="flex h-14 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-8 text-[#ea1d2c] transition-colors hover:bg-gray-50 font-semibold"
          >
            nada mesmooo
          </button>
        </div>

        {}
        <div className="flex w-full justify-center gap-8 border-t border-gray-100 pt-8 text-sm text-gray-400">
          <span className="cursor-pointer hover:text-[#ea1d2c]">nada</span>
          <span className="cursor-pointer hover:text-[#ea1d2c]">com</span>
          <span className="cursor-pointer hover:text-[#ea1d2c]">nada</span>
        </div>
      </main>
    </div>
  );
}