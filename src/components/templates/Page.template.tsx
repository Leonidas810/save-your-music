interface PageTemplateProps {
    children: React.ReactNode;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
    return (
        <main className="mx-auto max-w-5xl px-6 py-12">
            {children}
        </main>
    );
}