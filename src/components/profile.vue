<template>
    <div class="container">
        <h1>Edit Profile</h1>
        <hr>
        <div class="row" v-if="message !== null">
            <div class="col-12 text-lg-center">
               <p>{{message}}</p>
            </div>
        </div>
        <div class="row">
            <!-- left column -->
            <div class="col-md-3">
                <div class="">
                    <img v-if="user.Image !== undefined" :src="user.Image" class="avatar img-fluid" alt="avatar">
                    <img v-else :src="pic" class="avatar img-fluid" alt="avatar">
                    <h6>Upload a different photo...</h6>
                    <input type="file"  accept="image/jpeg" @change=uploadImage>
                </div>
            </div>
            <!-- edit form column -->
            <div class="col-md-9">
                <h3>Personal info</h3>
                <form class="" @submit.prevent="update">
                    <div class="form-group">
                        <label class="col-md-3 control-label">Nom : </label>
                        <div class="col-lg-4">
                            <input class="form-control" type="text" v-model="user.nom" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">Prénom</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="text" v-model="user.prenom" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-3 control-label">email:</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="email" v-model="user.email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div class="col-md-8">
                            <input type="submit" class="btn btn-primary" value="Mettre a jour ">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import VueJwtDecode from 'vue-jwt-decode'
    export default {
        name: "profile",
        data() {
            return{
                user:{},
                message: null,
                pic:null
            }
        },
        created: function () {
            if (localStorage.getItem("userData") === null || localStorage.getItem("userData") === undefined) {
                // eslint-disable-next-line no-console
                console.log("ok")
                if (localStorage.getItem("token") === null) {
                    this.$router.push({name: "login"})
                } else {
                    this.user = VueJwtDecode.decode(localStorage.getItem("token"));
                }
            } else {
                this.user = JSON.parse(localStorage.getItem("userData"))
            }
        },
        methods: {
            uploadImage(e){
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = e =>{
                    this.pic = e.target.result;
                    this.user.Image = e.target.result;

                };

            },
            update: function () {
                this.axios.put("http://localhost:3000/client/update/" + this.user.id, this.user)
                    .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res)
                        if (res.status === 200) {
                            localStorage.setItem("token", JSON.stringify(res.data.token))
                            this.message = "Votre profile mai a jour "
                        } else {
                            this.message = "error: votre profile n'ai pas mis a jour"
                        }
                    })
                    .catch(err => {
                        // eslint-disable-next-line no-console
                        console.log(err)
                    })
            },
        }

    }
</script>

<style scoped>

</style>