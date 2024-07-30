import { writable } from 'svelte/store';

export let products = writable([]);
export let URL = writable(`https://fakestoreapi.com/products`);
export let loading = writable(true);
export let showModal = writable(false);
export let  productID = writable("1")
  
export const selectedCategory = writable("All");
export const sortOption = writable("price-asc");

   