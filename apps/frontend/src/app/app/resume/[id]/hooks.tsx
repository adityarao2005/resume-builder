import { createContext, useContext } from "react";


export interface IDocumentParams {
    id: string;
}

export const DocumentContext = createContext<IDocumentParams>({ id: "" });

export function useDocument() {
    const context = useContext(DocumentContext);
    if (context === undefined) {
        throw new Error("useDocument must be used within a DocumentProvider");
    }
    return context;
}

export function DocumentProvider({ children, value }: { children: React.ReactNode; value: IDocumentParams }) {
    return (
        <DocumentContext.Provider value={value}>
            {children}
        </DocumentContext.Provider>
    );
}
