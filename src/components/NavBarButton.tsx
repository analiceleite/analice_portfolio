import { KeyTextField } from "@prismicio/client";
import clsx from "clsx";
import React from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);  // Registrar o ScrollToPlugin do GSAP

type NavBarButtonProps = {
    linkField: string;
    label: KeyTextField;
    showIcon?: boolean;
    className?: string;
};

export default function NavBarButton({ linkField, label, className }: NavBarButtonProps) {
    const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();  
        const targetElement = document.getElementById(targetId);  
        if (targetElement) {
            // Usar GSAP para rolagem suave
            gsap.to(window, {
                duration: 1,  // Duração da animação em segundos
                scrollTo: { y: targetElement, offsetY: 50 },  // Scroll até o elemento alvo com um offset opcional
                ease: "power2.inOut",  // Tipo de easing para suavidade
            });
        }
    };

    return (
        <a
            href={`#${linkField}`} 
            className={clsx(
                "relative flex items-center px-4 py-2 font-semibold text-slate-800 transition-colors duration-300 ease-in-out rounded-md hover:bg-yellow-300 hover:text-slate-900",
                className
            )}
            onClick={(e) => handleScroll(e, linkField)}  
        >
            <span className="relative z-10">{label}</span>
        </a>
    );
}
