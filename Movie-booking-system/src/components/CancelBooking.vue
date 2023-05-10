<template>
    <div>
       <h1> Cancel booking</h1>

        <form class="movie-form" @submit.prevent="findSeats">
        <div class="form-row">
            <label for="movie">Select a movie:</label>
            <select id="movie" name="movie" v-model="selectedmovie" @change="changed" required >
            <option v-for="movie in movies" :key="movie" :value="movie">{{ movie }}</option>
            </select>
            <label for="theater">Select a City:</label>
            <select id="theater" name="theater" v-model="selectedtheater" @change="changed" required> 
            <option v-for="theater in theaters" :key="theater" :value="theater">{{ theater }}</option>
            </select> 
        </div>
        <div class="form-row">
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
            <input type="submit" value="Find booked Seats" @click="findBookedSeats()">
            </div>
        </div>
        </form>


        <div v-if="find">
            <div class="seat-grid">
            <div v-for="(row, rowIndex) in seatgrid" :key="rowIndex" class="seat-row">
            <div
                v-for="(seat, seatIndex) in row"
                :key="seatIndex"
                class="seat"
                :class="{
                'unavailable': seat,
                'available': !seat,
                'selected': selectedSeats[rowIndex][seatIndex],
                'disabled': seat
                }"
                @click="!seat ? toggleSeat(rowIndex, seatIndex) : null"
            >
                {{ String.fromCharCode(65 + rowIndex) }}{{ seatIndex + 1 }}
            </div>
            </div>
        </div>


        </div>
        
        <div class="form-row">
            <div class="button-container">
            <input type="button" value="cancel booking" @click="cancebooking()">
            </div>
        </div>


    </div>
</template>
<script>

export default {
    name: 'CancelBooking',
    data() {
        return {
            movies :["Aquaman","Jupiter","Avengers", "Bahubali"],
            theaters :["Warrensburg","Kansas-City","Olathe", "Las-Vegas"],
            time :["9am","12pm","3pm","6pm"],
            ROWS : 9,
            COLS : 9,
            selectedtheater:'',
            selectedmovie:'',
            selectedtime:'',
            selectedqueue:'',
            seatgrid:'',
            find:false,
            selectedSeats: Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
      ),
        }
            },
    methods: {
       async findBookedSeats(){
        this.selectedqueue=new Set();
     let   ob={"selectedmovie":this.selectedmovie,"selectedtheater":this.selectedtheater,"selectedtime":this.selectedtime}
        await fetch("http://localhost:4000/findbooking",{body:JSON.stringify(ob),method:"post", mode:'cors', headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },}).then(response => response.json()).then(data=>{
      this.seatgrid=data.seatdata;
   this.find=true;
   console.log(data);
      })
     this. selectedSeats= Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false));

        }, 
    isSelected(movie, theater, time, rowIndex, colIndex) {
      // TODO: Implement logic to check if the specified seat is currently selected
      return false;
    },toggleSeat(rowIndex, seatIndex) {
        this.selectedSeats[rowIndex][seatIndex] = !this.selectedSeats[rowIndex][seatIndex];
        if (this.selectedqueue.has(rowIndex+"*"+seatIndex)){this.selectedqueue.delete(rowIndex+"*"+seatIndex);}
        else{this.selectedqueue.add(rowIndex+"*"+seatIndex);}
        console.log(this.selectedqueue);
    },
    async cancebooking(){
        let myArray1 = Array.from(this.selectedqueue);
        await fetch("http://localhost:4000/cancelbooking",{body:JSON.stringify({"remove":myArray1,"movie":this.selectedmovie,"time":this.selectedtime,"theater":this.selectedtheater}),method:"post", mode:'cors', headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },}).then(response => response.json()).then(data=>{
        this.findBookedSeats();
      })
    }
    }
  
}
</script>

<style>
h1{color: white;}
.form-row {
  color: white;
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }

  /* Style the labels */
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  /* Style the select inputs */
  select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    background-color: #fff;
  }

  /* Style the submit button */
  input[type="submit"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  input[type="button"] {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }

  /* Style the button container */
  .button-container {
    display: flex;
    justify-content: center;
  }  
  
  .seat-grid {display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.seat-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.seat {
  width: 50px;
  height: 50px;
  margin: 10px;
  background-color: #e6e6e6;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.available {
    background-color: green;
    cursor: pointer;
}

.unavailable {
    background-color: pink;
    cursor: not-allowed;
  
}

.selected {
  background-color: yellow;
}

.disabled {
  cursor: not-allowed;
}

  
  
  </style>