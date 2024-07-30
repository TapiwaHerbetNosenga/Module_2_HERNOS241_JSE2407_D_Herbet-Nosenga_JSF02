<script>
  import {
    loading,
    products,
    URL,
    selectedCategory,
    sortOption,
  } from "./store.mjs";
  import { onMount } from "svelte";
  import { showModal } from "./store.mjs";
  import { productID } from "./store.mjs";

  let clickHandler = ()=>{
showModal.set(true);
productID.set(product.id)
  }
  $: {
    if ($selectedCategory !== "All") {
      URL.set(
        `https://fakestoreapi.com/products/category/${$selectedCategory}`
      );
    } else {
      URL.set("https://fakestoreapi.com/products");
    }
  }

  async function fetchData() {
    let url;
    const unsubscribeURL = URL.subscribe((value) => {
      url = value;
    });

    if (!url) return; // Ensure URL is defined

    try {
      loading.set(true);
      const res = await fetch(url);
      const data = await res.json();
      products.set(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      loading.set(false);
      unsubscribeURL();
    }
  }

  onMount(fetchData);
  $: $URL, fetchData();
</script>

{#if $loading}
  <div class="loading">Loading...</div>
{:else}
  <div class="cards">
    {#each $products as product}
      <div class="card">
        <img alt="product" src={product.image} />
        <h5 class="text">{product.title}</h5>
        <h6 class="text">{product.price}</h6>
        <p class="text">{product.category}</p>
        <button on:click={clickHandler} class="modal-button"
          >View Product Details</button
        >
      </div>
    {/each}
  </div>
{/if}

<style>
  .loading {
    font-size: 1.5rem;
    text-align: center;
    padding: 2rem;
  }

  img {
    width: max-content;
    height: 9rem;
  }

  .text {
    color: gray;
    margin: 0.5rem 0;
    line-height: 1.2;
  }

  .card {
    max-width: 30rem;
    min-width: 15rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 5%;
  }

  .cards {
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1vw;
  }
</style>
