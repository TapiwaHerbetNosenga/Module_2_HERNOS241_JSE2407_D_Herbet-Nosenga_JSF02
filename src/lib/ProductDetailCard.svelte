<!-- Modal.svelte -->
<script>
    import { createEventDispatcher } from 'svelte';
    import { showModal } from './store.mjs';

 
</script>
<div>
{#if showModal}
<div class="card">
    <img alt="product" src={product.image} />
    <h5 class="text">{product.title}</h5>
    <h6 class="text">{product.price}</h6>
    <p class="text">{product.category}</p>
    <button on:click={clickHandler} class="modal-button"></button>
</div>
    {/if}
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 500px;
        width: 100%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
    }
</style>



