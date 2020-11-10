<template>
<div>
    <Myproduit :produits="produits" />
</div>
</template>

<script>
import Myproduit from "../components/myproduit";

export default {
    name: "produit",
    data() {
        return {
            produits: {}
        }
    },
    components: {
        Myproduit
    },
    created() {
        this.axios.get("http://146.59.156.234:3000/produit/all")
            .then(res => {
                this.produits = res.data.produit
            })
            .catch(err => {
                alert(err)
            })
    }
}
</script>

<style scoped>

</style>
