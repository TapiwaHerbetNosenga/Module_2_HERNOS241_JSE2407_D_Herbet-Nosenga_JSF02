<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
  
    // Create writable stores
    export let products = writable([]);
    export let URL = writable("https://fakestoreapi.com/products");
    export let loading = writable(true); // Store to track loading state
  
    // Fetch data when component mounts
    onMount(async () => {
      let url;
      const unsubscribeURL = URL.subscribe(value => {
        url = value;
      });
  
      try {
        loading.set(true); // Set loading to true before fetching
        const res = await fetch(url);
        const data = await res.json();
        products.set(data); // Update the products store with the fetched data
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        loading.set(false); // Set loading to false after fetching
        unsubscribeURL(); // Clean up the subscription
      }
    });
  </script>
  
  {#if $loading}
    <div class="loading">Loading...</div>
  {:else}
    <div class="cards">
      {#each $products as product}
        <div class="card">
          <img alt="product" src={product.image} />
          <h5 class="text">{product.title}</h5>
          <h6  class="text">{product.price}</h6>
          <p  class="text">{product.categories}</p>
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
  
    img{
        width: max-content;
         height: 9rem;
    }

    .text{
        color: gray;
        margin: 0.5rem 0; 
  line-height: 1.2;
    }
.card{
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
.cards{
    display:grid;
    grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1vw; 
}

  </style>

