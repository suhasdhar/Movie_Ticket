const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cors());


let seatAvailability = {
}; 

let moviereviews= [
    {
        title: "Aquaman",
        poster: "https://m.media-amazon.com/images/M/MV5BOTk5ODg0OTU5M15BMl5BanBnXkFtZTgwMDQ3MDY3NjM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
        review: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating : 2,
        link:'https://www.imdb.com/title/tt1477834/ratings/?ref_=tt_ov_rt'
    },{
        title: "Jupiter Ascending",
        poster: "https://m.media-amazon.com/images/M/MV5BMTQyNzk2MjA2NF5BMl5BanBnXkFtZTgwMjEwNzk3MjE@._V1_.jpg",
        review: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating : 3,
        link: 'https://www.imdb.com/title/tt1617661/ratings/?ref_=tt_ov_rt'
    }]

let upcomingMovies=[
    {
        title: "The Shawshank Redemption",
        poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg",
        date:'May 1st 2023',
        link:'https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0_tt_4_nm_4_q_shaws'
    },{
        title: "The Black Demon",
        poster: "https://m.media-amazon.com/images/M/MV5BODBhZTFiOGItNjk4ZS00Y2VkLWJkNGQtNTk5NzZlNThlM2I4XkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_FMjpg_UX432_.jpg",
        date:'May 1st 2023',
        link:'https://www.imdb.com/title/tt10279472/'
    },]

let cart = {};
let timeconsidered=0;

let movies =["Aquaman","Jupiter","Avengers", "Bahubali","Dabang"];
let theaters =["Warrensburg","Kansas-City","Olathe", "Las-Vegas"];
let time =["9am","12pm","3pm","6pm"];
const ROWS = 9;
const COLS = 9;




app.get('/', (req, res) => {
  
  console.log("here");
  res.send('Hello World!');
  
});

app.get('/getmovies', (req, res) => {
  
    res.send({moviereviews});
    
  });
  app.get('/upcomingMovies', (req, res) => {
  
    res.send({upcomingMovies});
    
  });

  

app.post('/', (req, res) => {
  
    //console.log(req.body);
    res.send({"heey" :'Hello World!'});
    
  });

  app.post('/savemoviereview', (req, res) => {
    console.log(req.body)
     moviereviews.push(req.body);
   
    res.send({moviereviews});
   
    
  });git

  app.post('/saveupcomingMovies', (req, res) => {
    console.log(req.body)
    upcomingMovies.push(req.body);
   
    res.send({upcomingMovies});
   
    
  });



  app.post('/savedata', (req, res) => {
  
  
    seatAvailability=req.body;
    
   
    res.send(seatAvailability);
  });
  
  


  function createSeatAvailabilityObject(movieArray, theaterArray, timeArray, ROWS, COLS) {
    for (let i = 0; i < movieArray.length; i++) {
      const movie = movieArray[i];
      seatAvailability[movie] = {};
  
      for (let j = 0; j < theaterArray.length; j++) {
        const theater = theaterArray[j];
        seatAvailability[movie][theater] = {};
  
        for (let k = 0; k < timeArray.length; k++) {
          const time = timeArray[k];
          seatAvailability[movie][theater][time] = Array.from({length: ROWS}, () => Array.from({length: COLS}, () => true));
        }
      }
    }
    return seatAvailability;
  }
  

// function createSeatAvailabilityObject(movieArray, theaterArray, timeArray, ROWS, COLS) {
//     const seatAvailability = {};
  
//     const now = new Date();
//     const year = now.getFullYear();
  
//     for (let i = 0; i < movieArray.length; i++) {
//       const movie = movieArray[i];
//       seatAvailability[movie] = {};
  
//       for (let j = 0; j < theaterArray.length; j++) {
//         const theater = theaterArray[j];
//         seatAvailability[movie][theater] = {};
  
//         for (let k = 0; k < timeArray.length; k++) {
//           const time = timeArray[k];
//           seatAvailability[movie][theater][time] = {};
  
//           // Set seat availability for each row and column combination for the whole year
//           for (let month = 0; month < 12; month++) {
//             const daysInMonth = new Date(year, month + 1, 0).getDate();
  
//             for (let day = 1; day <= daysInMonth; day++) {
//               const date = `${month + 1 < 10 ? "0" + (month + 1) : month + 1}-${day < 10 ? "0" + day : day}`;
  
//               for (let r = 1; r <= ROWS; r++) {
//                 for (let c = 1; c <= COLS; c++) {
//                   seatAvailability[movie][theater][time][`${date}-${r}-${c}`] = true;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     console.log(seatAvailability['Aquaman']['Warrensburg']['9am']);
    
  
//     return seatAvailability;
//   }
  


  app.get('/initialize', (req, res) => { 
    console.log("here");
   res.send(seatAvailability);
  });



  app.post('/findbooking', (req, res) => {
let seatdata=seatAvailability[req.body.selectedmovie][req.body.selectedtheater][req.body.selectedtime];

  res.send({"seatdata":seatdata});
  });

  app.post('/cancelbooking', (req, res) => {
    console.log(req.body);
    seatAvailability[req.body.movie][req.body.theater][req.body.time];
    
    for( let i=0;i<req.body.remove.length;i++){
    let x1=req.body.remove[i].charAt(0);
    let x2=req.body.remove[i].charAt(2);
    seatAvailability[req.body.movie][req.body.theater][req.body.time][x1][x2]=1;
    console.log(seatAvailability[req.body.movie][req.body.theater][req.body.time]);
}

      res.send({});
      });
  



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
createSeatAvailabilityObject(movies,theaters,time,ROWS,COLS); 
