<script>
    import { writable } from 'svelte/store';
    export let products = writable([]);
    export let URL = writable("https://fakestoreapi.com/products")
    fetch(`${URL}`)
            .then(res=>res.json())
            .then(data=>products = data)

</script>