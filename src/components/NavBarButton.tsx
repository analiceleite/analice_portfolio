import { KeyTextField } from "@prismicio/client";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";

type NavBarButtonProps = {
    linkField: string;
    label: KeyTextField;
    showIcon?: boolean;
    className?: string;
};

export default function NavBarButton({ linkField, label, showIcon, className }: NavBarButtonProps) {
    return (
        <a
            href={`#${linkField}`}
            className={clsx(
                "relative flex items-center px-4 py-2 font-semibold text-slate-800 transition-colors duration-300 ease-in-out rounded-md hover:bg-yellow-300 hover:text-slate-900",
                className
            )}
        >
            <span className="relative z-10">{label}</span>
            {showIcon && (
                <MdArrowOutward className="ml-2 text-slate-800" />
            )}
        </a>
    );
}
