<template>
    <section class="our-publication pt-100 pb-70">
        <div class="container">
            <div class="section-header">
                <h2>Nos Produit </h2>
            </div>
            <div class="row">
                <div class="col-sm-6 col-lg-3" v-for="produit in produits" :key="produit.id">
                    <div class="single-publication">
                        <figure>
                            <a >
                                <img :src="require(`@/assets/${produit.imgs[0].Image}.jpeg`)" alt="Publication Image" width="100%" height="200">
                            </a>
                        </figure>

                        <div class="publication-content">
                            <h3><a href="">{{produit.ref}}</a></h3>
                            <p class="text-block">{{produit.description}}</p>
                            <h4 class="price">{{produit.prix}}</h4>
                        </div>

                        <div class="add-to-cart">
                            <a @click="ajouter(produit.id,produit.nom, produit.prix)" class="default-btn">Add to Cart</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "myproduit",
        props:["produits"],
        data(){
            return{
                Panier:[]

            }
        },
        created(){
            // eslint-disable-next-line no-console
            console.log(this.produits);
            this.getLocalStorage()

        },
        methods:{
            ajouter: function (id, nom, prix) {
                alert(`le produit ${nom} `)
                // eslint-disable-next-line no-console
                this.Panier = this.Panier || [];
                localStorage.removeItem("panier");
                if (this.Panier.length === 0) {
                    let quantite = 1;
                    this.Panier.push({
                        produitId: id,
                        nom: nom,
                        quantite: quantite,
                        prix_unitaire: prix,
                        soustotal: quantite * prix
                    });
                } else {
                    let allreadyProduit = false;
                    this.Panier.forEach(item => {
                        if (item.produitId === id) {
                            item.quantite++;
                            item.soustotal = item.quantite * prix;
                            allreadyProduit = true;
                            // eslint-disable-next-line no-console
                            console.log("produit existant");
                        }
                    });
                    if (allreadyProduit === false) {
                        let quantite = 1;
                        this.Panier.push({
                            produitId: id,
                            nom: nom,
                            quantite: quantite,
                            prix_unitaire: prix,
                            soustotal: quantite * prix
                        });
                        // eslint-disable-next-line no-console
                        console.log("produit absent");
                    }
                    // eslint-disable-next-line no-console
                    console.log(this.Panier);

                    this.allreadyProduit = id;
                    // eslint-disable-next-line no-console
                    console.log(this.allreadyProduit);
                }

                localStorage.setItem("panier", JSON.stringify(this.Panier));
            },
            getLocalStorage() {
                let getlocalSt = localStorage.getItem("panier");
                if (getlocalSt != null || getlocalSt !== undefined) {
                    this.Panier = JSON.parse(getlocalSt);
                    // eslint-disable-next-line no-console
                    console.log(this.Panier);
                }
            }


        }
    }
</script>

<style scoped>
    .text-block{
        height: 80px;
        overflow: auto;


    }
    .pt-100 {
        padding-top: 100px;
    }
    .pb-70 {
        padding-bottom: 70px;
    }
    .section-header {
        margin-bottom: 60px;
        text-align: center;
    }
    .section-header i {
        color: #ff007d;
        font-size: 50px;
        display: inline-block;
        margin-bottom: 10px;
    }
    .section-header h2 {
        font-weight: bold;
        font-size: 34px;
        margin: 0;
    }
    .section-header p {
        max-width: 500px;
        margin: 20px auto 0;
    }
    .single-publication {
        border: 1px solid #f2eee2;
        margin-bottom: 30px;
        position: relative;
        overflow: hidden;
    }
    .single-publication figure {
        position: relative;
        margin: 0;
        text-align: center;
    }
    .single-publication figure > a {
        background-color: #fafafa;
        display: block;
    }
    .single-publication figure ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        position: absolute;
        right: -50px;
        top: 20px;
        transition: .6s;
        -webkit-transition: .6s;
    }
    .single-publication:hover figure ul {
        right: 15px;
    }
    .single-publication figure ul li a {
        display: inline-block;
        width: 35px;
        height: 35px;
        text-align: center;
        font-size: 15px;
        background: #ff007d;
        margin-bottom: 7px;
        border-radius: 50%;
        line-height: 35px;
        color: #fff;
    }
    .single-publication figure ul li a:hover {
        color: #fff;
        background: #e50663;
    }
    .single-publication .publication-content {
        text-align: center;
        padding: 20px;
    }
    .single-publication .publication-content .category {
        display: inline-block;
        font-family: 'Open Sans', sans-serif;
        font-size: 14px;
        color: #ff007d;
        font-weight: 600;
    }
    .single-publication .publication-content h3 {
        font-weight: 600;
        margin: 8px 0 10px;
        font-size: 20px;
    }
    .single-publication .publication-content h3 a {
        color: #1f2d30;
    }
    .single-publication .publication-content h3 a:hover {
        color: #ff007d;
    }
    .single-publication .publication-content ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        margin-bottom: 15px;
    }
    .single-publication .publication-content ul li {
        display: inline-block;
        font-size: 18px;
        color: #fec42d;
    }
    .single-publication .publication-content .price {
        font-size: 18px;
        color: #ff007d;
    }
    .single-publication .publication-content .price span {
        color: #6f6f6f;
        text-decoration: line-through;
        padding-left: 5px;
        font-weight: 300;
    }
    .single-publication .add-to-cart {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        opacity: 0;
        visibility: hidden;
        text-align: center;
        -webkit-transform: scale(.7);
        transform: scale(.7);
        height: 105px;
        -moz-transition: .4s;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .single-publication:hover .add-to-cart {
        visibility: visible;
        transform: scale(1);
        -webkit-transform: scale(1);
        opacity: 1;
    }
    .single-publication .add-to-cart .default-btn {
        margin-top: 28px;
        padding: 8px 25px;
        font-size: 14px;
    }
    .single-publication .category {
        margin: 0;
    }
    .single-publication .add-to-cart .default-btn {
        margin-top: 28px;
        padding: 8px 25px;
        font-size: 14px;
    }
    .default-btn {
        background-color: #ff007d;
        color: #fff;
        border: 1px solid #ff007d;
        display: inline-block;
        padding: 10px 30px;
        border-radius: 30px;
        text-transform: uppercase;
        font-weight: 600;
        font-family: 'Open Sans', sans-serif;
    }
    a:hover {
        color: #fff;
        text-decoration: none;
    }

</style>