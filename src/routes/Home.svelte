<script>
import Header from "../lib/Header.svelte";
import ToolBar from "../lib/ToolBar.svelte";
import Products from "../lib/Products.svelte";
import ProductDetailCard from "../lib/ProductDetailCard.svelte";
</script>

<body>
<Header></Header>
<ToolBar></ToolBar>
<Products></Products>
<ProductDetailCard></ProductDetailCard>
</body>

<style>
body{
    display: flex;
    flex-direction: column;
   
}
</style>