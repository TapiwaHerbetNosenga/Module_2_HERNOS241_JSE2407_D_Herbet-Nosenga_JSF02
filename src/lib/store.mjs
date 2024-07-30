
import { writable, derived } from 'svelte/store';

export let products = writable([]);
export let URL = writable(`https://fakestoreapi.com/products`);
export let loadingProducts = writable(false);
export let loadingSingleProduct = writable(false);
export let showModal = writable(false);
export let productID = writable(null);
export const selectedCategory = writable("All");
export const sortOption = writable("price-asc");
export const singleProduct = writable(null);


export const sortedProducts = derived(
    [products, sortOption],
    ([$products, $sortOption]) => {
        if ($sortOption === "price-asc") {
            return $products.slice().sort((a, b) => a.price - b.price);
        } else if ($sortOption === "price-desc") {
            return $products.slice().sort((a, b) => b.price - a.price);
        }
        return $products;
    }
);

