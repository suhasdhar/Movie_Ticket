<template>
    <div>
    <h1 style="color:purple">Welcome to Inox Group of Theaters</h1>


  <form  @submit.prevent="findSeats">
    <div class="form-row">
      <label for="movie">Select a movie:</label>
      <select id="movie" name="movie" v-model="selectedmovie" @change="changed" required >
      <option v-for="movie in movies"  :key="movie" :value="movie">{{ movie }}</option></select>
      <label for="theater">Select a City:</label>
      <select id="theater" name="theater" v-model="selectedtheater" @change="changed" required> 
      <option v-for="theater in theaters"  :key="theater" :value="theater">{{ theater }}</option></select> 
    </div>
  
    <div class="form-row">
      <!-- <label for="date">Select a date: </label>
      <input type="date" id="date" name="date" v-model="selecteddate" @change="changed">
   -->
      <label for="time">Select a time:</label>
      <select id="time" name="time" v-model="selectedtime" @change="changed" required>
        <option value="9am">9am</option>
        <option value="12pm">12pm</option>
        <option value="3pm">3pm</option>
        <option value="6pm">6pm</option>
      </select>
    </div>
  
    <div class="form-row">
      <div class="button-container">
        <input type="submit" value="Find Seats" >
      </div>
    </div>
  </form>


   <div id="screen"></div>

<div v-if="rendered==true && findseats==true">


  <div v-for="(row, rowIndex) in seatGrid" :key="rowIndex" class="seat-row">
  <div v-for="(seat, seatIndex) in row" :key="seatIndex" class="seat"
       :class="{
         'available': seat,
         'unavailable': !seat,
         'selected': isSelected(selectedmovie, selectedtheater, selectedtime, rowIndex, seatIndex),
         'disabled': !seat
       }"
       @click="seat ? toggleSeat(rowIndex, seatIndex) : null">
    {{ String.fromCharCode(65 + rowIndex) }}{{ seatIndex + 1 }}
  </div>


</div>

</div>

</div>
<div v-if="generate" @click="generate=false"> <pdf-generate :ticket-data="ticketdata"/></div>


 <div class="cart">
  <h3>Cart</h3>
  <table>
    <thead>
      <tr>
        <th>Movie</th>
        <th>Theater</th>
        <th>Time</th>
        <th>Seat</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(seat, index) in cart" :key="index">
        <td>{{ seat.movie }}</td>
        <td>{{ seat.theater }}</td>
        <td>{{ seat.time }}</td>
        <td>{{ seat.seat }}</td>
        <td>${{ seat.price }}</td>
      </tr>
    </tbody>
  </table>
</div>



 <button id="book" @click="book()">book tickets</button>
</template>

<style scoped>

.seat-row {
  display: flex;
  justify-content: center;
}

/* .seat {
  width: 40px;
  height: 40px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
} */

.available {
  background-color: lightgreen;
}

.unavailable {
  background-color: lightgray;
  cursor: not-allowed;
}

.selected {
  background-color: lightblue;
}

h1 {
  text-align: center;
  font-size: 48px;
  margin-top: 50px;
  text-transform: uppercase;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: white;
}

.form-row label {
  margin-right: 10px;
}

.form-row select {
  margin-right: 20px;
}

.button-container {
  text-align: center;
}


.button-container {
  text-align: center;
}


label {
  margin-right: 10px;
}

select {
  margin-right: 20px;
}


#seats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.seat {
  width: 50px;
  height: 50px;
  margin: 5px;
  background-color: #006699;
  border-radius: 5px;
}

.seat.available {
  background-color: #00cc66;
  cursor: pointer;
}

.seat.selected {
  background-color: #ffcc00;
}

.seat.gap {
  margin: 30px;
}


.cart {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #1a1a1a;
  border-radius: 5px;
  color: white;
}
.cart table {
    border-collapse: collapse;
    margin-top: 1rem;
    width: 100%;
  }
  
  .cart th, .cart td {
    border: 1px solid #ddd;
    color: white;
    padding: 0.5rem;
    text-align: left;
  }
  
  .cart th {
    background-color: #333;
    font-size: 1.2rem;
  }
  
  .cart td {
    font-size: 1rem;
  }

button {
  background-color: #ffcc00;
  color: #0e0e0e;
  border: none;
  padding: 10px;
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #ff9933;
}

#screen {
  height: 150px;
  background-color: #ffffff;
  margin: 20px;
  border: 5px solid #000000;
  border-radius: 10px;
  width: 800px;
  margin-left: 23%;
  box-shadow: 0px 0px 10px #000000;
  position: relative;
}

#screen:before {
  content: "SCREEN";
  font-size: 36px;
  font-weight: bold;
  color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>


<script>
import pdfGenerate from './pdfGenerate.vue';
export default {
  components: { pdfGenerate },
  data() {
    return {
  seatAvailability : {}, 
  generate:false,
seatdata:{},
selectedSeats:[],
selectedtheater:'',
selectedmovie:'',
selectedtime:'',
selecteddate:'',
seatGrid:'',
ticketdata:[],
rendered:'false',
findseats:false,
 cart : [],
 timeconsidered:0,
 movies :["Aquaman","Jupiter","Avengers", "Bahubali", "Dabang"],
 theaters :["Warrensburg","Kansas-City","Olathe", "Las-Vegas"],
 time :["9am","12pm","3pm","6pm"],
 ROWS : 9,
 COLS : 9,
    }
  },
  mounted() {
    console.log("mounted");
     this.initialize();
  
  },

methods: {
  async initialize(){
    let x= await fetch("http://localhost:4000/initialize",{method:"get", mode:'cors', headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },}).then(response => response.json()).then(data=>{
      this.seatAvailability=data;
      this.seatdata=data;
      console.log(this.seatAvailability);
      })
      this.rendered=true;
      
  },
  changed(){
    // console.log(this.selectedtheater);
    // console.log(this.selectedmovie);
    // console.log(this.seatgrid);
    
  },
  isSelected(movie, theater, time, rowIndex, seatIndex) {
    const seatId = `${rowIndex}-${seatIndex}`;
    const selectedSeat = `${movie}*${theater}*${time}*${seatId}`;
    return this.selectedSeats.includes(selectedSeat);
  },
  toggleSeat(rowIndex, seatIndex) {
    const seatId = `${rowIndex}-${seatIndex}`;
    const selectedSeat = `${this.selectedmovie}*${this.selectedtheater}*${this.selectedtime}*${seatId}`;
    console.log(selectedSeat)
    if (this.selectedSeats.includes(selectedSeat)) {
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== selectedSeat);
      this.removeFromCart(this.cart.findIndex(item => item.seatId === seatId));
    } else {
      this.selectedSeats.push(selectedSeat);
      this.addToCart(rowIndex, seatIndex);
    }
  },
  addToCart(rowIndex, seatIndex) {
    const seatId = `${rowIndex}-${seatIndex}`;
    const seat = String.fromCharCode(65 + rowIndex) + (seatIndex + 1);
    const price = 10.00; // Or calculate the price based on the selected seat
    const theater = this.selectedtheater;
    const movie=this.selectedmovie;
    const time=this.selectedtime
    this.cart.push({ seatId, seat, price ,time,theater,movie});
  },
  removeFromCart(index) {
    this.cart.splice(index, 1);
  },
    async fetchData() {
      // Fetch your data here and set it to the seatGrid data property
      this.seatGrid = await fetch('your api url here').then(response => response.json());
    
    },
   
    findSeats(){
      console.log(this.seatAvailability);
      this.findseats=true;    
      this.seatGrid=this.seatAvailability[this.selectedmovie][this.selectedtheater][this.selectedtime];
      console.log(this.seatGrid);
    },
    
    book(){
  this.ticketdata=[];
  console.log(this.selectedSeats);
for( let i=0;i<this.selectedSeats.length;i++){

console.log(this.selectedSeats[i])
let split=this.selectedSeats[i].split("*");

let movie=split[0];
let city= split[1];
let time=split[2];

    let x=Number(split[3].charAt(0));
    let y=Number(split[3].charAt(split[3].length-1));
    let seatchar=String.fromCharCode(65 + x)+" "+(y + 1);
  let ob={"movieName":movie,"theaterName":city,"seatNumber":seatchar,"time":time};//new object for pdf array
  this.ticketdata.push(ob);
  this.seatAvailability[movie][city][time][x][y]=false;
  }
  this.selectedSeats=[];
  this.cart=[];
console.log(this.ticketdata);
this.sendData();
this.generate=true;
},
async sendData(){
console.log()
await fetch("http://localhost:4000/savedata",{body: JSON.stringify(this.seatAvailability) ,method:"post", mode:'cors', headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },}).then(response => response.json()).then(data=>{
        console.log(data);
        this.seatAvailability=data;
  })


}


 
},

}
</script>