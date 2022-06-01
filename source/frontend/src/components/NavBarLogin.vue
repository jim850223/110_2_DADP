<template>
    <nav class="navbar navbar-dark fixed-top bg-dark" aria-label="First navbar example">
        <div class="container-fluid">
            <router-link class="navbar-brand" style="font-weight: 900;" to="/auth">Open List</router-link>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample01"
                aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample01">
                <ul class="navbar-nav me-auto mb-2">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" href="#" to="/auth/favorite">Your Favorite NFTs</router-link>
                    </li>
                    <li class="nav-item">
                        <a @click="logout()" class="nav-link active" aria-current="page" href="#">Log Out</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

export default{
    methods:{
        logout(){
            this.$http({method: 'GET', url: "http://localhost:3000/users/logout",  withCredentials: true})
            .then(response => {
            if (response.statusText == "OK"){
                console.log("OK")
                this.$cookies.remove('test')
                //this.$router.push('/auth')
            }
            }).catch((err) => {
                console.log(err)
            })

            alert('logout')
            this.$router.push('/')
        }
    }
}

</script>