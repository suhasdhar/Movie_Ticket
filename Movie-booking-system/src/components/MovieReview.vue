<template>
    <h1>What the critics say:</h1>
    <div class="movie-carousel">
      <br>
      <div class="movie-carousel-container">
        <div
          v-for="(movie, index) in movies"
          :key="index"
          :class="['movie-carousel-item', { active: true }]"
        >
          <img
            :src="movie.poster"
            :alt="movie.title"
            :style="{ opacity: 1 }"
            @click="navigateToLink(movie.link)"
          />
          <div class="movie-description">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.review }}</p>
            <p>Rating:{{ movie.rating }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "MovieCarousel",
    data() {
      return {
        movies: [
          {
            title: "Aquaman",
            poster: "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
            review: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            rating: 2,
            link: "https://www.example.com/movie/aquaman",
          },
        ],
        activeIndex: 0,
      };
    },
    mounted() {
      this.initialize();
    },
    methods: {
      async initialize() {
        await fetch("http://localhost:4000/getmovies", {
          method: "get",
          mode: "cors",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            
            this.movies = data.moviereviews;
            console.log(this.movies);
          });
      },
      navigateToLink(link) {
        console.log(link);
        window.location.href = link;
      },
    },
  };

  </script>
<style scoped>
    h1{
        color :yellow
    }
    
.movie-carousel {
  width: 100%;
}

.movie-carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 10px; /* Add left and right padding to container */
}

.movie-carousel-item {
  flex: 0 0 auto;
  width: 300px;
  height: 500px;
  margin-right: 20px;
  scroll-snap-align: center;
  opacity: 0.6;
  transition: opacity 0.5s ease-in-out;
  position: relative; /* Add position property */
}

.movie-carousel-item.active {
  opacity: 1;
  z-index: 1; /* Set z-index to bring active item to the front */
}

.movie-carousel-item img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}

.movie-description {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
  position: absolute; /* Add position property */
  bottom: 0; /* Position description at the bottom of the item */
  left: 0; /* Align description to the left */
  right: 0; /* Align description to the right */
}

.movie-description h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.movie-description p {
  font-size: 0.9rem;
}


</style>
  