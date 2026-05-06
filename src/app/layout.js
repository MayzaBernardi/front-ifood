import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer, Flip } from "react-toastify";
import { CartProvider } from "@/contexts/CartContext"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "iFood Clone - Peça sua comida",
  description: "O melhor delivery da cidade",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. Envolva o children com o CartProvider */}
        <CartProvider>
          <div className="flex-grow">
            {children}
          </div>
          
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
        </CartProvider>
      </body>
    </html>
  );
}