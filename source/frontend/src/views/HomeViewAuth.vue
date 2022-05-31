<template>
  <NavBarLogin />
  <div class="container">
        <table class="table table-striped table-hover">

            <thead class="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" class="col-2">Collection</th>
                    <th scope="col">Floor Price</th>
                    <th scope="col">Avg. Price</th>
                    <th scope="col">1 Day Avg. Price</th>
                    <th scope="col">1 Day Sales</th>
                    <th scope="col">7 Day Avg. Price</th>
                    <th scope="col">7 Day Sales</th>
                    <th scope="col">30 Day Avg. Price</th>
                    <th scope="col">30 Day Sales</th>
                </tr>
            </thead>

            <tbody id='table'>
                <!-- Fullfill the innerHTML with the information of collections -->
            </tbody>

        </table>
    </div>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-8">
                
                
                <!-- There are 4 lines, the first line of code is the key that I can submit the variable to function without
                refreshing the page. Precisely, I add "onsubmit="return false;" in the end of the line.
                And in the third line, the utility of type="text" and type="submit" are the same
                refer to this 
                https://stackoverflow.com/questions/17433557/how-to-save-user-input-into-a-variable-in-html-and-javascript -->                
                <form class="d-flex" @submit.prevent="addCollectionSet">
                    <input type="text" v-model="collectionSet" class="form-control me-2" placeholder="Add New Collection" required>
                    <div v-if="addCollectionError" class="error">{{ addCollectionError }} </div>                
                    <button class="submit" type="text" >+</button>
                </form>

            </div>
        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import NavBarLogin from "@/components/NavBarLogin";
//var data_json = {}
export default {
    data(){
        return{
            collectionSet: '',
            addCollectionError: ''
        }
    },
    created(){
        this.$http({method: 'GET', url: "http://localhost:3000/controllers/getcollection",  withCredentials: true})
        .then(response => {
            if (response.statusText == "OK"){
                console.log("OK")
                let data
                let result
                data = response.data
                console.log(data)
                result = this.getCollectionStats(data[0]["name"])
                console.log("res:" + result)
            }
        }).catch((err) => {
            console.log(err)
        })
        
        //console.log(data_json[0]["name"])
        //
    },
    methods:{
        getCollectionStats(collection){
            this.$http({method: 'GET', url: "https://api.opensea.io/api/v1/collection/"+collection+"/stats"})
            .then(response => {
                console.log(response)
                if (!response.ok){
                    console.log("OK")
                    console.log(response.data.stats)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        addCollectionSet(){
            console.log(this.collectionSet)

        }
    },
    components: {
        NavBarLogin,
    }
};

</script>

<style>

.error {
    color: #ff0000;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}

</style>