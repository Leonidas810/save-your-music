export const Button = ({ children }: { children: React.ReactNode }) => {
    return (
        <button className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white shadow hover:bg-white/20 transition-colors duration-300">
            {children}
        </button>
    );
}