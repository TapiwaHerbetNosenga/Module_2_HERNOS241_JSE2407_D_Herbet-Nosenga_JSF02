<script>
    import {
        products,
        URL,
        loadingProducts,
        showModal,
        productID,
        selectedCategory,
        sortOption,
        sortedProducts
    } from './store.mjs';
    import { onMount } from 'svelte';

    const clickHandler = (product) => {
        productID.set(product.id);
        showModal.set(true);
    };

    const handleSortChange = (event) => {
        sortOption.set(event.target.value);
    };

    $: {
        if ($selectedCategory !== "All") {
            URL.set(`https://fakestoreapi.com/products/category/${$selectedCategory}`);
        } else {
            URL.set("https://fakestoreapi.com/products");
        }
    }

    async function fetchProducts() {
        let url;
        const unsubscribeURL = URL.subscribe(value => url = value);

        if (!url) return;

        try {
            loadingProducts.set(true);
            const res = await fetch(url);
            const data = await res.json();
            products.set(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            loadingProducts.set(false);
            unsubscribeURL();
        }
    }

    onMount(fetchProducts);
    $: $URL, fetchProducts();
</script>

{#if $loadingProducts}
    <div class="loading">
        <div class="loading-wheel"></div>
        <div>Loading products...</div>
    </div>
{:else}
    <div>
       
        <select id="sort" on:change={handleSortChange} bind:value={$sortOption}>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
        </select>
    </div>
    <div class="cards">
        {#each $sortedProducts as product}
            <div class="card">
                <img alt="product" src={product.image} />
                <h5 class="text">{product.title}</h5>
                <h6 class="text">R{product.price}</h6>
                <p class="text">{product.category}</p>
                <button on:click={() => clickHandler(product)} class="modal-button">
                    View Product Details
                </button>
            </div>
        {/each}
    </div>
{/if}

<style>
    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw; 
        height: 100vh; 
        position: absolute; 
        top: 0;
        left: 0;
    }

    .loading-wheel {
        border: 0.5rem solid rgba(0, 0, 0, 0.1);
        border-left: 0.5rem solid #333;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .card {
        width: 100%;
        max-width: 300px; 
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 5%;
        padding: 1rem;
        box-sizing: border-box;
    }

    img {
        width: 100%; 
        height: auto;
    }

    .text {
        color: gray;
        margin: 0.5rem 0;
        line-height: 1.2;
    }

    .cards {
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr; 
        padding: 1rem;
        box-sizing: border-box;
        width: 100vw;
    }

    @media (min-width: 768px) {
        .cards {
            grid-template-columns: repeat(2, 1fr); 
        }
    }

    @media (min-width: 1024px) {
        .cards {
            grid-template-columns: repeat(4, 1fr); 
        }
    }
</style>
