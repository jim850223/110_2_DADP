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

        <label>Email :</label>
        <input type="email" v-model="email" required>

        <label>Password :</label>  
        <input type="password" v-model="password" required>            
        <div v-if="passwordError" class="error">{{ passwordError }} </div>

        <label>Password Again:</label>  
        <input type="password" v-model="password2" required>            
        <div v-if="passwordError" class="error">{{ passwordError }} </div>

        <div class="button">
            <button class="submit" type="submit">Sign up here</button>
        </div>
    </form>
</div>

</template>


<script>
import NavBar from "@/components/NavBar";
export default{

    data() {
        return {
            email: '',
            password: '',
            password2: '',
            username:'',
            passwordError: ''
        }
    },
    methods: {
       
        handleSubmit() {
            let apiEndPoint = "http://localhost:3000/users/register";

            if (this.password != this.password2){
              this.passwordError = 'Password are not same!';
            }
            else{
              this.passwordError = '';
            }

            if(!this.passwordError) {
                const data = {
                  email: this.email,
                  username: this.username,
                  password: this.password
                }

                this.$http({method: 'POST', url: apiEndPoint, data: data})
                  .then(response => {
                    console.log(response)
                    if (response.statusText == "OK"){
                      console.log("OK")
                      alert("註冊成功，可以進行登入")
                      this.$router.push('/')
                    }
                  }).catch((err) => {
                    console.log(err)
                    alert("註冊失敗")
                  })
            }
        }
    },
    components: {
      NavBar,
    }
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