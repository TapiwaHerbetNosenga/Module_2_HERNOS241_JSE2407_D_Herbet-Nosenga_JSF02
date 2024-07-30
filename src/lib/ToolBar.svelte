<script>
    import { selectedCategory, sortOption } from "./store.mjs";
  
    const categories = [
      { value: "All", text: "All Categories" },
      { value: "electronics", text: "Electronics" },
      { value: "jewelery", text: "Jewelery" },
      { value: "men's%20clothing", text: "Men's Clothing" },
      { value: "women's%20clothing", text: "Women's Clothing" }
    ];
  
    const sortOptions = [
      { value: "price-asc", text: "Price: Low to High" },
      { value: "price-desc", text: "Price: High to Low" }
    ];
  </script>
  
  <div>
    <select bind:value={$selectedCategory}>
      {#each categories as category}
        <option value={category.value}>{category.text}</option>
      {/each}
    </select>
  
    <select bind:value={$sortOption}>
      {#each sortOptions as option}
        <option value={option.value}>{option.text}</option>
      {/each}
    </select>
  </div>
  
  <style>
    div {
      justify-self: start;
      margin-top: 1vw;
    }
  </style>
  