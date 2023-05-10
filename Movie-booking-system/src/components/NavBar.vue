<script setup>
import CancelBooking from "./CancelBooking.vue";
import AddUpcomingMovie from "./AddUpcomingMovie.vue";
import AddMovieReview from "./AddMovieReview.vue";
</script>

<template>
    
    <nav>
      <ul>
        <li @click="setaction('review')">Add Movie Review</li>
        <li @click="setaction('upcoming')" >Add Upcoming Movie</li>
        <li @click="setaction('cancel')">Cancel Booking</li>
      </ul>
    </nav>
    
<h3>Welcome Admin</h3>
<div v-if="action=='review'"><AddMovieReview/></div>
<div v-if="action=='upcoming'"><AddUpcomingMovie/></div>
<div v-if="action=='cancel'"><CancelBooking/> </div>


  </template>
  
  <script>
  export default {
   
    name: 'Navbar',
    data() {
    return {action:'' }
  },
  methods:{
setaction(action){
this.action=action;
}

  }
  };
 
  </script>
  
  <style scoped>
    h3{color:yellow; text-align: center;}
  nav {
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  
  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin-right: 1rem;
    color: #fff;
  }
  li:hover{
    cursor: pointer;
    background-color: grey;
  }
  
  </style>
  