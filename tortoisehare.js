//Allie LaCompte 
//The Tortoise and the Hare

var tort;         // The position the tortoise is in
var hare;         // The position the hare is in
var len = 70;     // The length of the race track 
var track;        // The table element where the track is displayed
var goBttn;       // The go/play again button
var picture;      // The html element where pictures will be displayed
var intervalId;   // The value returned by setInterval
var seconds;      // The number of seconds that have elapsed 

// Simulate the tortoise making a move
function moveTort() {

   // Question states to convert to integers. This is an 
   // unnecessary step, could use decimal values directly.
   var type = Math.floor(1 + Math.random() * 10);

   // Fast plod: 3 steps forward 
   if(type <= 5) {
      tort += 3;
   } 
   // Slip: 6 steps backward 
   else if (type <= 7) {
      tort -= 6;
   } 
   // Slow plod: 1 step forward
   else {
      tort++;
   }

   // Tortoise should not be in a position less than 0
   if(tort < 0) {
      tort = 0;
   } 
   // Tortoise shoud not be in a position greater than 69
   else if(tort > len-1) {
      tort = 69;
   } 
} // end function moveTort

// Simulate the hare making a move
function moveHare() {

   var type = Math.floor(1 + Math.random() * 10);

   // Sleep: no move
   if(type <= 2) {
      ;
   }
   // Big hop: 9 steps forward
   else if (type <= 4) {
      hare += 9;
   }
   // Big slip: 12 steps backward
   else if (type <= 5) {
      hare -= 12;
   }
   // Small hop: 1 step forward 
   else if (type <= 8) {
      hare++;
   }
   // Small slip: 2 steps backward
   else {
      hare -=2;
   }

   // Hare should not be in a position less than 0
   if(hare < 0) {
      hare = 0;
   }
   // Hare shoud not be in a position greater than 69
   else if(hare > len-1) {
      hare = 69;
   }
} // end function moveHare

// Display the results of the race
function finish() {

   var startTxt = document.getElementById("start");
   var raceTime = document.getElementById("time");

   // Race ends in tie
   if (tort == len-1 && hare == len-1) {
      startTxt.innerHTML = "it's a tie! ";
      picture.innerHTML = "<img src = 'tie.jpg' alt='Tied tortoise and hare'>";
   }
   // Tortoise wins
   else if (tort == len-1) {
      startTxt.innerHTML = "tortoise wins!!! yay!!! ";
      picture.innerHTML = "<img src = 'tortoise.jpg' alt='tortoise'>";

   }
   // Hare wins
   else {
      startTxt.innerHTML = "hare wins. yuck! ";
      picture.innerHTML = "<img src = 'hare.jpg' alt='hare'>";
   }

   raceTime.innerHTML = "Race time: " + seconds + " seconds";
} // end function finish

// Move the tortoise and hare and check if race has ended,
// called every 1 second
function move() {

   moveTort();
   moveHare();
   ++seconds;

   displayTrack();

   // Race has ended
   if (tort == len-1 || hare == len-1) {
      clearInterval(intervalId);
      finish();

      goBttn.value = "Race Again!";
      goBttn.disabled = false;
      goBttn.hidden = false;
   }
} // end function move

// Display the track with the tortoise and the hare's positions
function displayTrack() {

   var positions = "<tr class='track'>";

   for (var i = 0; i < len; i++) {
      var value = "<td>";

      if(i == hare && i == tort) {
         value = "<td class='occupied'>Ouch!";
      }
      else if(i == tort) {
         value = "<td class='occupied tort'>T";
      }
      else if(i == hare) {
         value = "<td class='occupied hare'>H";
      }
      positions += value + "</td>";
   } // end for

   positions += "<tr><td>Start</td>"

   // Display position number below the track every 5 squares 
   for (var i = 1; i < len-1; i++) {

      if((i + 1) % 5 == 0) {
         positions += "<td>" + (i + 1) + "</td>";
      }
      else {
         positions += "<td>" + "" + "</td>";
      }
   } // end for

   positions += "<td>Finish</td></tr>"
   track.innerHTML = positions;
} // end function displayTrack

// Reset the track and begin the race
function startRace() {

   goBttn.disabled = true;
   goBttn.hidden = true;

   picture.innerHTML = "";

   var raceTime = document.getElementById("time");
   raceTime.innerHTML = "";

   tort = 0;
   hare = 0;
   seconds = 0;

   displayTrack();

   var startTxt = document.getElementById("start");
   startTxt.innerHTML = "on your mark...";
   setTimeout(function (){startTxt.innerHTML = "get set...";}, 1500);
   setTimeout(function (){startTxt.innerHTML = "bang!!!";}, 3000);
   setTimeout(function (){startTxt.innerHTML = "and they're off!!!";}, 4500);

   // Set the interval for the function move
   setTimeout(function(){intervalId = setInterval(move, 1000);}, 3500);
} // end function startRace

function onLoad() {

   picture = document.getElementById("pic")
   picture.innerHTML = "<img src = 'start.jpg' alt='Tortoise and hare'>";

   goBttn = document.getElementById("go");
   goBttn.addEventListener("click", startRace, false);

   track = document.getElementById("racetrack");
} // end function onLoad

window.addEventListener("load", onLoad, false);