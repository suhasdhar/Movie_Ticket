<template>


    <h1>Movies coming your way :</h1>
    <div class="movie-carousel">
        <br>
      <div class="movie-carousel-container">
        <div
          v-for="(movie, index) in movies"
          :key="index"
          :class="['movie-carousel-item', { active: activeIndex === index }]"
        >
          <img
            :src="movie.poster"
            :alt="movie.title"
            :style="{ opacity: activeIndex === index ? 1 : 0.5 }"
            @click="navigateToLink(movie.link)"
          />
          <div class="movie-description">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.date }}</p>
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
                    title: "The Shawshank Redemption",
                    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg",
                    date:'May 1st 2023',
                    link:''
                },{
                    title: "The Black Demon",
                    poster: "https://m.media-amazon.com/images/M/MV5BODBhZTFiOGItNjk4ZS00Y2VkLWJkNGQtNTk5NzZlNThlM2I4XkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_FMjpg_UX432_.jpg",
                    date:'May 1st 2023',
                    link:''
                },
               
            ],
            activeIndex: 0,
        };
    },
    mounted() {  
        
         this.initialize();
        setInterval(() => {
            this.activeIndex = this.activeIndex === this.movies.length - 1 ? 0 : this.activeIndex + 1;
        }, 3000);
     
    },
    methods:{
        async initialize(){

await fetch("http://localhost:4000/upcomingmovies",{method:"get", mode:'cors', headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },})
  .then(response => response.json())
  .then(data=>{
    console.log(data) 
      this.movies=data.upcomingMovies;})
         
},
 navigateToLink(link) {
        window.location.href = link;
      },

    }
};
</script>
<style scoped>
    
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
h1{
    color: yellow;
}

</style>
  