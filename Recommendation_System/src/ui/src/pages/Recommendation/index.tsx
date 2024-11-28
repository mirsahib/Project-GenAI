import Layout from "@/components/Layout";
import PantryCard from "@/components/PantryCard";
import { apiUrl } from "@/config/apiUrl";
import { usePantryContext } from "@/context/PantryContext";
import { RecipeResponse } from "@/interface/IRecipe";
import { postData } from "@/util/RESTOPS";
import { useEffect } from "react";


export default function index() {
    const {PantryState} = usePantryContext();
    
    const fetchData = async () => {
        try {
            const product_name = PantryState.map((item) => item.product_name);
            console.log("🚀 ~ fetchData ~ product_name:", product_name)
            const response = await postData<RecipeResponse>(apiUrl.listrecipes,{
                product_name: product_name
            });
            console.log("🚀 ~ fetchData ~ response:", response)
            if (!response.success) {
                throw new Error(response.error);
            }
        } catch (error) {
            console.log("🚀 ~ fetchData ~ error:", error);
        }
    };

    useEffect(() => {
        console.log(PantryState);
        if(PantryState && PantryState.length>0){
            fetchData();
        }

    }, [PantryState]);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-between px-10 my-10">
                <h1 className="font-bold mb-2 text-center">
                    Pantry
                </h1>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
                    {PantryState.map((item) => (
                        <PantryCard {...item} key={item.id} />
                    ))}
                    
                </div>
            </div>
            <div className="flex flex-col items-center justify-between px-10 my-10">
                <h1 className="font-bold mb-2 text-center">
                    Recipies
                </h1>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
                    {/* <ProductCard {...product} />
                    <ProductCard {...product} />
                    <ProductCard {...product} />
                    <ProductCard {...product} /> */}

                </div>
            </div>
        </Layout>
    );
}
