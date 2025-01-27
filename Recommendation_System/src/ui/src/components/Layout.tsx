import React from "react";
import Headers from "./Header";
export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <div className="max-w-7xl mx-auto">
            <Headers />
            {children}
        </div>
    );
}
