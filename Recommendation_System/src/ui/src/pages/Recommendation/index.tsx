import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
const product = {
    image: "https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill",
    name: "Product Name",
    description: "This is a short product description.",
    price: 29.99,
};

export default function index() {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-between px-10 my-10">
                <h1 className="font-bold mb-2 text-center">
                    Recipies
                </h1>
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
