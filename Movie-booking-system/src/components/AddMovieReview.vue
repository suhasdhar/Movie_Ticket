<template>
   <h1>Add  Movie Review</h1>
  <div class="form-wrapper">
    <form class="form">
      <label class="form-label" for="title">Title:</label>
      <input class="form-input" type="text" id="title" v-model="form.title" required>
      
      <label class="form-label" for="poster">Poster URL:</label>
      <input class="form-input" type="text" id="poster" v-model="form.poster" required>
      
      <label class="form-label" for="review">Review:</label>
      <textarea class="form-input" id="review" v-model="form.review" required></textarea>
      
      <label class="form-label" for="rating">Rating:</label>
      <select class="form-input" id="rating" v-model="form.rating" required>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      
      <label class="form-label" for="link">Link:</label>
      <input class="form-input" type="text" id="link" v-model="form.link">
      
      <button class="form-button" type="submit" @click="submitForm()">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        poster: '',
        review: '',
        rating: '',
        link: ''
      }
    }
  },
  methods: {
   async submitForm() {


await fetch("http://localhost:4000/savemoviereview",{body:JSON.stringify(this.form),method:"post", mode:'cors', headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },})
  .then(response => response.json())
  .then(data=>{
    console.log(data);
      })

    }
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  background-color: #222;
}

.form-label {
  color: #fff;
  font-size: 16px;
  margin-bottom: 5px;
}

.form-input {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
}

.form-input:focus {
  outline: none;
}

.form-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffbb00;
  color: #111;
  font-weight: bold;
  cursor: pointer;
}

.form-button:hover {
  background-color: #ffa500;
}
</style>
