interface Product {
    id: string;
    product_name: string;
    brand: string;
    discount_price: number;
    price: number;
    img_url: string;
    quantity: string;
    category: string;
    sub_category: string;
    absolute_url: string;
}

interface ProductResponse {
    success: boolean;
    data: {
        products: Product[];
        catagories: string[];
    };
    metaData: {
        currentPage: number;
        totalCount: number;
        totalPages: number;
        limit: number;
    };
    error?: string; // Optional in case of failure
}


export {Product, ProductResponse};