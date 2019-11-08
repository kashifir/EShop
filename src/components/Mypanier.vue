<template>
    <div class="">
        <div class="">Panier</div>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th class="">id</th>
                <th class="">nom</th>
                <th class="col-3">quantite</th>
                <th class="">prix</th>
                <th class="">soutout</th>
                <th class=""></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in panier" :key="index">
                <td>{{ item.produitId }}</td>
                <td>{{ item.nom }}</td>
                <td><input type="button" class="btn btn-dark" @click="updateqtn(index)" value="-">  {{ item.quantite }} <input type="button" class="btn btn-dark" @click="update(index)" value="+"></td>
                <td>{{ item.prix_unitaire }} €</td>
                <td>{{ (item.quantite * item.prix_unitaire).toFixed(2) }} €</td>

                <td><button class="btn btn-dark btn-block" @click="supprimer(index)"><i class="fa fa-trash-o fa-lg"></i></button></td>
            </tr>
            <tr>
                <td colspan="6"></td>
                <td><strong>{{ total }} €</strong></td>
                <td colspan="2"></td>
            </tr>

            </tbody>
        </table>
        <button class="btn btn-dark btn-block" @click="valide"> <i class="fas fa-check-circle"></i></button>

    </div>
</template>

<script>
    import VueJwtDecode from 'vue-jwt-decode'
    export default {
        name: "Mypanier",
        props: ['panier'],
        data: function () {
            return {
                article: { nom: '', quantite: 0, prix: 0 },
                credentials: {
                    sandbox: 'Aa9EYzO4ZMOcjVNMecPAUXpGJy7EWVrsaPY5tGXWQCnEhQFa_iMvHEpjOirGsOV4_KtfN8P9cm6o>',
                    production: '<production client id>'
                }
            }
        },
        computed: {
            total: function () {
                let total = 0;
                for(let el of this.panier) {
                    total += el.prix_unitaire * el.quantite
                }
                return total.toFixed(2)
            }
        },
        methods: {
            update: function(index){
                 this.panier[index].quantite ++;
                 this.panier[index].soustotal = this.panier[index].quantite * this.panier[index].prix_unitaire
                // eslint-disable-next-line no-console
                console.log(this.panier)
                localStorage.removeItem("panier");
                localStorage.setItem("panier", JSON.stringify( this.panier))
            },
            updateqtn: function(index){
                if(this.panier[index].quantite > 1) {
                    this.panier[index].quantite--;
                    // eslint-disable-next-line no-console
                    console.log(this.panier)
                    localStorage.removeItem("panier");
                    localStorage.setItem("panier", JSON.stringify( this.panier))
                }
                else {
                    this.supprimer(index)
                }
            },
            supprimer: function(index) {
                this.panier.splice(index, 1)
                localStorage.removeItem("panier");
                if(this.panier.length > 0) {
                    localStorage.setItem("panier", JSON.stringify(this.panier))
                }
            },
            valide:function () {

                // eslint-disable-next-line no-console
                console.log(localStorage.getItem("token"));
                if (localStorage.getItem("token") !== null) {
                    var user =  VueJwtDecode.decode(localStorage.getItem("token"));
                    // eslint-disable-next-line no-console
                    console.log(user)

                    this.axios.post("http://localhost:3000/command/new", {
                        clientId: user.id,
                        panier: this.panier,
                    })
                        .then(res => {
                            // eslint-disable-next-line no-console
                            console.log(res.data)
                            this.$router.push({name:'paypal',params:{total: this.total} })
                        })
                }
                else {
                    this.$router.push({name: "login"});
                }
            }
        },
        components: {

        }
    }
</script>

<style scoped>

</style>