import Layout from "@/components/Layout";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryPill from "@/components/CategoryPill";
const product = {
    image: "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
    name: "Product Name",
    description: "This is a short product description.",
    price: 29.99,
};

export default function index() {
    return (
        <Layout>
            <div className="my-10 px-10 ">
                <div className="flex justify-center border border-1 items-center pr-2">
                    <label className="font-bold p-2 bg-slate-200 mr-1">Search</label>
                    <input type="text" className="w-full px-3 outline-none" />
                    <Search className="ml-2" />
                </div>
            </div>
            <div className="px-10 my-5">
                <h1 className="font-bold mb-2 text-center">Category</h1>
                <div className="flex justify-center">
                    <ul className="flex gap-2">
                        <CategoryPill name="All" />
                        <CategoryPill name="Apple" />
                        <CategoryPill name="Banana" />
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between px-10 my-5">
                <h1 className="font-bold mb-5 text-center ">Products</h1>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
                    <ProductCard {...product} />
                    <ProductCard {...product} />
                    <ProductCard {...product} />
                    <ProductCard {...product} />

                </div>
            </div>
        </Layout>
    );
}
