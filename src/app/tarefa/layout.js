import { Poppins } from 'next/font/google';
import "@/app/globals.css";
import Navigation from "@/components/Navigation";

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: "Minhas Tarefas",
    description: "Sistema de gerenciamento de tarefas simples para organizar suas atividades diárias.",
};

export default function TarefaLayout({ children }) {
    return (
        <div className={`${poppins.className} text-[#3092aa] bg-[#f0ebeb] min-h-screen flex flex-col relative`}>
            <Navigation />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}