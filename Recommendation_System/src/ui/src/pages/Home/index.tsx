import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import CategoryPill from "@/components/CategoryPill";
import { useEffect, useState } from "react";
import { getData } from "@/util/RESTOPS";
import { apiUrl } from "@/config/apiUrl";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { Product, ProductResponse } from "@/interface/IProduct";


export default function index() {
    const [products, setProducts] = useState<Product[]>([]);
    const [catagories, setCategories] = useState<string[]>([]);
    const [metaData, setMetaData] = useState<
        ProductResponse["metaData"] | null
    >(null);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState<string>("");
    const [catagory, setCatagory] = useState<string>("Fruits & Vegetables");
    const fetchData = async (
        page: number = 1,
        limit: number = 12,
        searchText?: string,
        filters?: Array<Record<string, string[]>>
    ) => {
        try {
            const filterparams = encodeURIComponent(JSON.stringify(filters));
            const url = `${apiUrl.listproducts}?page=${page}&limit=${limit}&searchText=${searchText? searchText : ""}&filters=${filterparams ? filterparams : ""}`;
            console.log("🚀 ~ index ~ url:", url)
            const response = await getData<ProductResponse>(url);
            // console.log("🚀 ~ fetchData ~ response:", response);
            if (!response.success) {
                throw new Error(response.error);
            }
            setProducts(response.data.products);
            setCategories(response.data.catagories);
            setMetaData(response.metaData);
        } catch (error) {
            console.log("🚀 ~ fetchData ~ error:", error);
        }
    };

    const handleNext = () => {
        if (metaData && page < metaData.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    useEffect(() => {

        if (!searchText.trim()) {
            fetchData(page, 12,"", catagory ? [{ category: [catagory] }] : []);
        }else {
            const timeoutId = setTimeout(() => {
                fetchData(page, 12, searchText, []);
            }, 1000);

            return () => clearTimeout(timeoutId);
        }
    }, [page, searchText,catagory]);
    return (
        <Layout>
            <div className="my-10 px-10 ">
                <SearchInput searchText={searchText} setSearchText={setSearchText} />
            </div>
            <div className="px-10 my-5">
                <h1 className="font-bold mb-2 text-center">Category</h1>
                <div className="flex justify-center">
                    <ul className="grid grid-cols-3 md:grid-cols-6 gap-4">
                        {catagories.map((category) => (
                            <CategoryPill name={category} category={catagory} setCatagory={setCatagory} key={category} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between px-10 my-5">
                <h1 className="font-bold mb-5 text-center ">Products</h1>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
                    {products.map((product) => (
                        <ProductCard {...product} key={product.id} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-5 gap-4">
                {/* Previous Button */}
                <Button variant="outline" disabled={page === 1} onClick={handlePrev}>
                    Previous
                </Button>

                {/* Page Indicator */}
                <div className="text-sm font-medium">
                    Page <span className="font-bold">{page}</span> of{" "}
                    <span className="font-bold">{metaData?.totalPages}</span>
                </div>

                {/* Next Button */}
                <Button variant="outline" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </Layout>
    );
}
