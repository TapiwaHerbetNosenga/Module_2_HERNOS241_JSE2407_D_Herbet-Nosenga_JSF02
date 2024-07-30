<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    import { productID, singleProduct, showModal, loadingSingleProduct } from './store.mjs';

    const dispatch = createEventDispatcher();
    let product;

    const fetchProduct = async (id) => {
        try {
            loadingSingleProduct.set(true);
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            singleProduct.set(data);
        } catch (error) {
            console.error("Failed to fetch product:", error);
        } finally {
            loadingSingleProduct.set(false);
        }
    };

    $: {
        const id = $productID;
        if (id) {
            fetchProduct(id);
        }
    }

    $: {
        const unsubscribe = singleProduct.subscribe(value => {
            product = value;
        });

        onDestroy(() => {
            unsubscribe();
        });
    }

    const closeModal = () => {
        showModal.set(false);
        productID.set(null);
        dispatch('close');
    };
</script>

{#if $showModal}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-overlay" on:click={closeModal}>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-button" on:click={closeModal}>✖</button>
            {#if $loadingSingleProduct}
                <div class="loading">
                    <div class="loading-wheel"></div>
                    <div>Loading product details...</div>
                </div>
            {:else if product}
            <img alt="product" src={product.image} />
                <h2>{product.title}</h2>
          <p>{product.category}</p>
                <p>Price: R{product.price}</p>
                <p>{product.description}</p>
            {/if}
        </div>
    </div>
{/if}

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    img {
    max-width: 30rem;
    max-height: 20rem;
  }

    .modal-content {
        background: gray;
        padding: 2rem;
        border-radius: 8px;
        max-width: 100%;
        max-height: 100%;
        overflow: auto;
        position: relative;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 2rem;
        color: #333;
        cursor: pointer;
        z-index: 1;
    }

    .loading {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
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
</style>
