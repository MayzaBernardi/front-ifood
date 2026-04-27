import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function iFoodLogin() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-texto-principal bg-fundo">
      <header className="absolute top-0 left-0 w-full p-5 flex items-center justify-between z-10">
        <div className="relative w-24 h-8">
          <Image
            src="/pedeAi.png"
            alt="Logo do iFood"
            layout="fill"
            objectFit="contain"
            className="rounded-2xl"
          />
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col md:flex-row relative">
        <div className="flex-1 bg-ifood-light flex flex-col justify-center items-center p-10 md:p-20 relative">
          <div className="relative w-full max-w-xl aspect-[1.3/1] mt-16 md:mt-0">
            <Image
              src="/loginLogo.png"
              alt="Imagem de login do iFood"
              layout="fill"
              objectFit="contain"
              className="rounded-2xl"
            />
          </div>

          <a
            href="#"
            className="absolute bottom-5 left-5 text-xs text-gray-400 hover:text-[#ea1d2c] hover:underline"
          >
            https://github.com/MayzaBernardi/front-ifood.git
          </a>
        </div>

        <div className="flex-2 bg-ifood-light flex justify-center items-center p-5 md:p-20">
          <div className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-2xl flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-texto-principal">
                Falta pouco para matar sua fome!
              </h1>
              <p className="text-lg text-texto-principal">
                Como deseja continuar?
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <button className="flex items-center justify-center gap-3 bg-facebook text-white p-4 rounded-xl shadow-sm w-full font-semibold hover:opacity-90 transition-opacity">
                <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md">
                  <FaFacebookSquare size={20} color="#3b5998" />
                </div>
                Continuar com Facebook
              </button>

              <button className="flex items-center justify-center gap-3 bg-white border border-border text-texto-principal p-4 rounded-xl shadow-sm w-full font-semibold hover:bg-gray-50 transition-colors">
                <div className="w-6 h-6 flex items-center justify-center">
                  <FcGoogle size={24} />
                </div>
                Continuar com Google
              </button>

              <div className="flex w-full gap-3 mt-4">
                <Link
                  href="/login"
                  className="flex h-14 flex-1 items-center justify-center rounded-xl border border-border bg-white hover:bg-ifood text-texto-secundario font-semibold transition-colors"
                >
                  Criar conta
                </Link>
                <button className="flex h-14 flex-1 items-center justify-center rounded-xl border border-border bg-white hover:bg-ifood text-texto-secundario font-semibold transition-colors">
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
