import { Product } from "@/interface/IProduct";
import { Button } from "./ui/button";
import placeHolderImage from "../assets/placeholder-image.jpg";
import { usePantryContext } from "@/context/PantryContext";

export default function ProductCard(props: Product) {
    const { PantryState, setPantryState } = usePantryContext();
    const isInPantry = PantryState.some((item) => item.id === props.id);

    return (
        <div className="w-full  rounded overflow-hidden  border border-black ">
            <img
                className="w-full object-cover"
                src={props.img_url}
                alt={props.product_name}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeHolderImage; // Replace with the actual path to your placeholder image
                }}
            />
            <div className="p-4">
                <h2 className="font-semibold mb-2">{props.product_name}</h2>
                <p className="text-gray-600 mb-2">{props.brand}</p>
                <p className="text-gray-600 mb-2">{props.category}</p>
                <p className="text-gray-600 mb-2">
                    Discount price: ${props.discount_price}
                </p>
                <div className="flex justify-between">
                    <div className="text-lg font-bold mb-4">${props.price}</div>
                    <Button
                        onClick={() =>
                            setPantryState((prev) => [...prev, props])
                        }
                        disabled={isInPantry}
                    >
                        {isInPantry ? "Added" : "Add to Pantry"}
                    </Button>{" "}
                </div>
            </div>
        </div>
    );
}
