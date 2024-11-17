import { Button } from "./ui/button";

type ProductType = {
    image: string;
    name: string;
    description?: string;
    price: number;
};
export default function ProductCard({
    image,
    name,
    description,
    price,
}: ProductType) {
    return (
        <div className="w-full  rounded overflow-hidden  border border-black ">
            <img className="w-full object-cover" src={image} alt={name} />
            <div className="p-4">
                <h2 className="font-semibold mb-2">{name}</h2>
                <p className="text-gray-600 mb-2">{description}</p>
                <div className="flex justify-between">
                    <div className="text-lg font-bold mb-4">${price}</div>

                    <Button>Add</Button>
                </div>
            </div>
        </div>
    );
}
