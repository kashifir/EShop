<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item href="/">Home</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>

                    <b-navbar-nav>
                        <b-nav-item v-if="!show" href="/login">Login</b-nav-item>
                        <b-nav-item v-if="!show" href="/register">Register</b-nav-item>
                        <b-nav-item href="/Panier">Panier</b-nav-item>
                    </b-navbar-nav>


                    <b-nav-item-dropdown right v-if="show">
                        <!-- Using 'button-content' slot -->
                        <template  v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                        <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>

</template>

<script>
    export default {
        name: "mynav",
        data(){
            return{
                show:false
            }
        },
        created() {
            if(localStorage.getItem("token")){
                this.show=true;
            }
        },
        methods: {
            logout(){
                localStorage.removeItem("token");
                this.$router.push({name:'login'});
                window.location.reload();
            }
        }
    }
</script>

<style scoped>

</style>