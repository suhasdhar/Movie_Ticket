<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="wrapper">
      <nav>
    <ul>
    <li><RouterLink class="link" to="/">             Admin Portal     </RouterLink></li>
    <li><RouterLink class="link" to="/book-tickets">Book Tickets      </RouterLink></li>
    <li> <RouterLink class="link" to="/reviews">Movie Reviews         </RouterLink></li>
    <li> <RouterLink class="link" to="/upcoming">Upcoming Movies       </RouterLink></li>
    </ul>
    </nav>
    </div>

<RouterView />
</template>

<style scoped>
.heading {
  display: inline-block;
  /* or display: inline-flex; */
}
.heading:hover {
  cursor: pointer;
  background-color: rgb(63, 60, 60);
}
nav {
  background-color: #353434;
  overflow: hidden;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.link {
  color: rgb(179, 178, 178);
}

nav li {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav li:hover {
  background-color: #695e5e;
  color: rgb(144, 141, 141);
  cursor: pointer;
}

</style>
