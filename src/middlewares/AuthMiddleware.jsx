"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const AuthMiddleware = ({ children, perfisPermitidos }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const lastCheckedPath = useRef(null);

    useEffect(() => {
        if (lastCheckedPath.current === pathname) return;
        lastCheckedPath.current = pathname;

        const checkPermission = () => {
        const token = localStorage.getItem("@App:token");
        const userStr = localStorage.getItem("@App:user");

        if (!token || !userStr) {
            setAuthorized(false);
            setLoading(false);
            router.push('/page.js');
            return;
        }

        const user = JSON.parse(userStr);

        if (perfisPermitidos && perfisPermitidos.length > 0) {
            if (!perfisPermitidos.includes(user.perfil)) {
            setAuthorized(false);
            alert("Acesso negado para o seu perfil.");
            router.push('/homeUsuario'); 
            setLoading(false);
            return;
            }
        }

        setAuthorized(true);
        setLoading(false);
        };

        checkPermission();
    }, [pathname, router, perfisPermitidos]);

    if (loading) {
        return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ifood-hover"></div>
        </div>
        );
    }

    return authorized ? children : null;
};

export default AuthMiddleware;