const localUrl = 'http://172.19.0.4:8080/api';

const baseUrl = localUrl;

export const apiUrl = {
    login: baseUrl + '/login',
    listproducts: baseUrl + '/products',
    product: baseUrl + '/product',
    listrecipes: baseUrl + '/recipes'
};