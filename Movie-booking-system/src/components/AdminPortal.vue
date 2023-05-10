
<template>
  <div>
    <div v-if="!auth" class="login-container">
    <h1 class="title">Admin Login</h1>
    <form class="form" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
  <div v-else-if="attempt ==true && auth==false"> <h3>invalid credentials</h3></div>
  <div v-else>
<NavBar/>

  </div>

  </div>
 
</template>

<script>
import NavBar from './NavBar.vue';

export default {
    name: "AdminLogin",
    data() {
        return {
            username: "",
            password: "",
            auth: false,
            attempt: false,
        };
    },
    methods: {
        submitForm() {
            // Perform login logic
            if (this.username == "admin" && this.password == "admin") {
                this.auth = true;
            }
            else {
                this.attempt = true;
            }
        },
    },
    components: { NavBar }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1c1c1c;
  color: #ffffff;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #333333;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input[type='text'],
input[type='password'] {
  padding: 0.5rem;
  border-radius: 3px;
  border: 1px solid #c7c7c7;
  background-color: #1c1c1c;
  color: #ffffff;
}

.btn {
  background-color: #0066cc;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 3px;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background-color: #0052a3;
}

.btn:active {
  transform: translateY(2px);
}

/* Additional styles for dark mode */
@media (prefers-color-scheme: dark) {
  .login-container {
    background-color: #333333;
    color: #ffffff;
  }
  
  .form {
    background-color: #1c1c1c;
  }
  
  input[type='text'],
  input[type='password'] {
    background-color: #333333;
    color: #ffffff;
    border: 1px solid #ffffff;
  }
  
  .btn {
    background-color: #ffffff;
    color: #333333;
    border: 1px solid #ffffff;
  }
  
  .btn:hover {
    background-color: #e6e6e6;
    color: #333333;
  }
}
</style>