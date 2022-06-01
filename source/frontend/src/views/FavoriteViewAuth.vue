<template>
  <NavBarLogin />
  <div class="container">
        <table class="table table-striped table-hover" >

            <thead class="table">
                <tr>
                    <th scope="col">Favorite</th>
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
                    <th scope="col">delete</th>
                </tr>
            </thead>

            <tbody v-for="(collectionInfo, index) in showCollectionData" :key='index' >
                <!-- Fullfill the innerHTML with the information of collections -->
                <tr v-if="collectionInfo.favorite">    
                    <th v-if="!collectionInfo.favorite" class="center"> <img @click="setFavorite(collectionInfo.collectionApiName, collectionInfo.favorite)" src="../assets/unStar.png" width="20" height="20"> </th>
                    <th v-if="collectionInfo.favorite" class="center"> <img @click="setFavorite(collectionInfo.collectionApiName, collectionInfo.favorite)" src="../assets/star.png" width="20" height="20"> </th>
                    <th>{{index + 1}}</th>  
                    <th>{{collectionInfo.collectionName}}</th>
                    <th> <img src="../assets/eth.svg" width="20" height="20"> {{collectionInfo.data.floor_price }}</th>
                    <th> <img src="../assets/eth.svg" width="20" height="20"> {{collectionInfo.data.average_price.toFixed(3) }}</th>
                    <th> <img src="../assets/eth.svg" width="20" height="20"> {{collectionInfo.data.one_day_average_price.toFixed(3)}}</th>
                    <th> {{collectionInfo.data.one_day_sales}}</th>
                    <th><img src="../assets/eth.svg" width="20" height="20"> {{collectionInfo.data.seven_day_average_price.toFixed(3)}}</th>
                    <th> {{collectionInfo.data.seven_day_sales}}</th>
                    <th><img src="../assets/eth.svg" width="20" height="20"> {{collectionInfo.data.thirty_day_average_price.toFixed(3)}}</th>
                    <th> {{collectionInfo.data.thirty_day_sales}}</th>
                    <th><button @click="deletCollection(collectionInfo.collectionApiName)">delete</button></th>
                </tr>
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
                <form class="d-flex" @submit.prevent="addCollection">
                    <input type="text" v-model="collection" class="form-control me-2" placeholder="Add New Collection" required>
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
            collection: '',
            addCollectionError: '',
            showCollectionData: []
        }
    },
    created(){
        this.$http({method: 'GET', url: "http://localhost:3000/controllers/getcollection",  withCredentials: true})
        .then(response => {
            if (response.statusText == "OK"){
                let collectionSet
                collectionSet = response.data
                //console.log(collectionSet)
                this.showCollectionStats(collectionSet)
             }
        }).catch((err) => {
            console.log(err)
        })
        
        //console.log(data_json[0]["name"])
        //
    },
    methods:{
        showCollectionStats(collectionSet){
            //console.log("show collectionSet: " + collectionSet)
            //console.log("show length: " + collectionSet.length)
            for (let i = 0; i < collectionSet.length; i++){
                let currentCollection = collectionSet[i]["name"].match(/[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+\b/g).join('').toLowerCase()
                let Favorite = collectionSet[i]["favorite"]
                console.log("loop: i: " + i + ", collection: " + currentCollection + ", favorite: " + Favorite)
                this.$http({method: 'GET', url: "https://api.opensea.io/api/v1/collection/"+currentCollection+"/stats"})
                .then(response => {
                    if (!response.ok){
                        //console.log("OK")
                        let result, collectionInfo
                        result = response.data.stats
                        //console.log(result)

                        try {
                            result.floor_price = result.floor_price.toFixed(2);
                        } catch {
                            result.floor_price = "-"
                        }

                        let splitStr = collectionSet[i]["name"].split(' ')
                        for (let i = 0; i < splitStr.length; i++) {
                            // You do not need to check if i is larger than splitStr length, as your for does that for you
                            // Assign it back to the array
                            //console.log(splitStr[i])
                            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
                        }
                        // Directly return the joined string

                        collectionInfo = {
                            "collectionApiName": collectionSet[i]["name"],
                            "collectionName": splitStr.join(' '),
                            "favorite": Favorite,
                            "data": result
                        }
                        this.showCollectionData.push(collectionInfo)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        },
        addCollection(){
            let apiCollection = this.collection.match(/[a-zA-Z\u00C0-\u1FFF\u2C00-\uD7FF]+\b/g).join('').toLowerCase()
            console.log(apiCollection)
            this.$http({method: 'GET', url: "https://api.opensea.io/api/v1/collection/"+apiCollection+"/stats"})
                .then(response => {
                    console.log(response)
                    if (!response.ok){
                        //console.log("can add collection")
                        const data = {
                            collectionSet: {
                                "name": this.collection}
                        }
                        this.$http({method: 'POST', url: "http://localhost:3000/controllers/addcollection", data: data,  withCredentials: true})
                            .then(response => {
                                //console.log(response)
                                if (!response.ok){
                                    //console.log("OK")
                                    alert("The colletion:" + this.collection + " add!")
                                    this.$router.go()
                                }
                            }).catch((err) => {
                                console.log(err)
                            })
                    }
                }).catch((err) => {
                    console.log(err)
                    alert("The colletion:" + this.collection + " doesn't exist!")
                })
        },
        deletCollection(collection){
            //console.log("delete: " + collection)
            const data = {
                collectionSet: {
                    "name": collection
                }
            }
            this.$http({method: 'DELETE', url: "http://localhost:3000/controllers/deletecollection", data: data,  withCredentials: true})
            .then(response => {
                if (response.statusText == "OK"){
                    alert("The colletion:" + this.collection + " delete!")
                    this.$router.go()
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        setFavorite(collection, currentFavoriteState){
            console.log("favorite: " + collection + ", Favorite: " + currentFavoriteState)
            let meg
            if (currentFavoriteState) {
                meg = "The collection:" + collection + " remove favorite!"
            }
            else{
                meg = "The collection:" + collection + " set favorite!"
            }
            const data = {
                collectionSet: {
                    "name": collection,
                    "favorite": !currentFavoriteState
                }
            }
            this.$http({method: 'PUT', url: "http://localhost:3000/controllers/setfavorite", data: data,  withCredentials: true})
            .then(response => {
                if (response.statusText == "OK"){
                    alert(meg)
                    this.$router.go()
                }
            }).catch((err) => {
                console.log(err)
            })
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

table tbody th.center{
    text-align: center;
}

</style>