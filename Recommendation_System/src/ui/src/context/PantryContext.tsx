import { Product } from "@/interface/IProduct";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state


// Define the shape of the context value
interface PantryContextType {
    PantryState: Product[];
    setPantryState: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Create the context with a proper type or `null` as the initial value
const PantryContext = createContext<PantryContextType | null>(null);

/**
 * Custom hook to access the Pantry context
 *
 * @return {PantryContextType} The Pantry context object
 * @throws {Error} If used outside of a PantryProvider
 */
export const usePantryContext = (): PantryContextType => {
    const context = useContext(PantryContext);
    if (!context) {
        throw new Error("usePantryContext must be used within a PantryProvider");
    }
    return context;
};

/**
 * Pantry provider component that wraps children with context
 *
 * @param {ReactNode} children - The child components to be wrapped by the Pantry provider
 * @return {JSX.Element} The Pantry provider component
 */
export const PantryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [PantryState, setPantryState] = useState<Product[]>([]);

    return (
        <PantryContext.Provider value={{ PantryState, setPantryState }}>
            {children}
        </PantryContext.Provider>
    );
};
