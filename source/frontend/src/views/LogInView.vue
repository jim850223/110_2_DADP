<!--template>
  <form class="mb-3">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template-->

<template>
<NavBar />
<div>
    <form @submit.prevent="handleSubmit">
        <label>User Name :</label>
        <input v-model="username" required>

        <label>Password :</label>  
        <input type="password" v-model="password" required>            

        <div class="button">
            <button class="submit" type="submit">Log In</button>
        </div>
    </form>
</div>

</template>


<script>
import NavBar from "@/components/NavBar";
export default{
    data() {
        return {
            password: '',
            username:''
        }
    },
    methods: {
       
        handleSubmit() {
            let apiEndPoint = "http://localhost:3000/users/login";

            if(!this.passwordError) {
                const data = {
                  username: this.username,
                  password: this.password
                }

                this.$http({method: 'POST', url: apiEndPoint, data: data})
                  .then(response => {
                    console.log(response)
                    if (response.data == 1){
                      alert('登入成功!')
                      this.$router.push('/auth')
                    }
                    else{
                      alert('登入失敗，帳號不存在或是密碼錯誤!')
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
            }
        }
    },
    components: {
      NavBar,
    },
    
}
</script>


<style scoped> 

form {
    max-width: 600px;
    margin: 30px auto;
    background: #fff;
    text-align: left;
    padding: 20px;
    border-radius: 10px;
}

label {
    color: #aaa;
    display:inline-block;
    margin: 25px 0 15px;
    text-transform: uppercase;
}

input, select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: bordre-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;
}

input[type="checkbox"] {
    display: inline-block;
    width:16px;
    margin: 0 10px 0;
    position: relative;
    top: 2px;
}

.pill {
    display: inline-block;
    margin: 20px 10px 0 0 ;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    cursor: pointer;
    background: #eee;
}

button {
    background: rgb(7, 24, 7);
    border: 0;
    margin-top: 40px;
    padding: 10px 20px;
    color: white;
    border-radius: 20px;
}

.submit {
    text-align: center;
}

.error {
    color: #ff0000;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}
</style>