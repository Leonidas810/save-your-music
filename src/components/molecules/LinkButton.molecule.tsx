import Link from "next/link";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    isExternal?: boolean;
}

export const LinkButton = ({ href, children, isExternal }: LinkButtonProps) => {

    const commonClasses = "inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white shadow hover:bg-white/20 transition-colors duration-300";

    if (isExternal) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                {children}
            </a>
        );
    }


    return (
        <Link href={href} className={commonClasses}>
            {children}
        </Link>
    );
}