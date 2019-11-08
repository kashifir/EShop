<template>
    <div>
        <mypanier v-bind:panier="panier"/>
    </div>
</template>

<script>
    import Mypanier from "../components/Mypanier";
    export default {
        name: "panier",
        components: {
            Mypanier
        },
        data(){
            return{
                panier:[]
            }
        },
        created() {
            if (!localStorage.getItem('panier')) {
                return;
            }
            else {
                this.panier = JSON.parse(localStorage.getItem("panier"))
            }
        }
    }
</script>

<style scoped>

</style>