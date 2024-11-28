import { Link } from "react-router-dom";
import { routes } from "@/config/routes";
import { Button } from "./ui/button";
import { ShoppingBasket } from "lucide-react";
import { usePantryContext } from "@/context/PantryContext";
export default function Header() {
    const { PantryState } = usePantryContext();
    return (
        <div className="flex justify-between py-4 mx-10">
            <h1>GroceWise</h1>
            <nav className="flex gap-4">
                <ul className="flex gap-4 ">
                    {Object.values(routes).map((route) => (
                        <li key={route.path} className="hover:underline">
                            <Link to={route.path}>{route.title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex gap-4">
                <Button>
                    {PantryState && <h1>{PantryState.length}</h1>}
                    <ShoppingBasket />
                </Button>
            </div>
        </div>
    );
}
