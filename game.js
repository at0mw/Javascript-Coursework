var N;
var dice = [];
var y = 0;
var score = [];
var g;

function input() {
  //creates N equal to input
  N = document.getElementById("dicenum").value;

  if (isNaN(N)|| N <3 || N >6){
    document.getElementById("wrong").innerHTML = N+" is not a valid option. Please enter an integer between 3 and 6."
  }
  else {
    var i = parseInt(N);
    if (i == N) {
      //clears the text from the html element for when the program restarts
      document.getElementById("wrong").innerHTML = "";
      /*if the input is acceptable (between 3 and 6) then continues
      *and hides the input while showing the playstage*/
      document.getElementById("chosennumber").innerHTML = N+" dice Chosen:"
	     var x = document.getElementById("hideinput");
       var z = document.getElementById("hideplaystage");
       x.style.display = "none";
			 z.style.display = "block";

    }
    else {
      document.getElementById("wrong").innerHTML = N+" is not a valid option. Please enter an integer between 3 and 6."
    }
  }
}


function addition(total, num) {
  //function for adding all the elements of an array
  return total + num;
}

function playstage() {

    rolldice();

    sortDice();
    judge();
    //show the current round score
    var s = document.getElementById("scorecard");
        s.style.display = "block";
        document.getElementById("dicesum").innerHTML = g;
    roundtracker();
    if (y<=1){
      document.getElementById("roundscorecard").innerHTML= "Scorecard after "+y+" round:";
    }
    else {
      document.getElementById("roundscorecard").innerHTML= "Scorecard after "+y+" rounds:";
    }

}

function rolldice() {

  //creates an array of random numbers depending on the input Number
  for (var i = 0; i<N; i++) {
    dice[i] = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice"+i).innerHTML = '<img src="dieface' + dice[i] + '.png">';
  }

}

function sortDice() {
  //sorts the dice array in ascending order
  dice.sort(function(a, b){return a-b});
}

function roundtracker(){
  //add one to y for a completed round
  y++;
  if (y<=1){
    document.getElementById("sumroundscore").innerHTML = "The cumulative score of "+y+" round is:";
  }
  else{
    document.getElementById("sumroundscore").innerHTML = "The cumulative score of "+y+" rounds is:";
  }
  //adds the round score to the cumulative score array
  score.push(g)
  //adds all the elements of the score array together
  document.getElementById("cumulativescore").innerHTML = score.reduce(addition);
  //divides the cumulative score sum with the number of rounds
  var k = (score.reduce(addition))/y;
  document.getElementById("averagescore").innerHTML = Math.round(k * 100) / 100;
}

function judge() {
  //sums the value of the scores each round and makes it equal to g
  g = dice.reduce(addition);
  /*compares the last value with the first value of the sorted dice array,
  *if theyre equal all values must be equal*/
  if (dice[0]===dice[N-1]){
    return  g = g+60;
  }
  //checks if all but one of the dice are equal
  else if (dice[0]===dice[N-2] && dice[0] !== dice [N-1]){
    return g=g+40;
  }
  //checks if all but one of the dice are equal (done twice incase N=3)
  else if (dice[0]!==dice[N-2] && dice[1] === dice [N-1]){
    return g=g+40;
  }
  //checks if every element in array is +1 the previous
  else if (dice.every(runDice)) {
    return g=g+20;
  }
  //checks if every element is different
  else if (dice.every(allDifferent)){
    return g;
  }
  else {
    return g = 0;
  }

}

function scoresum() {
  //sums the values of the dice
  score.push(g)
}


function runDice(el,i,arr) {
  //checks if all the values of sorted dice array are 1 more than the previous value
  var f = 1;
  if (i === 0){
    return true;
  }
  //checks if all elements in sorted array are one greater than the previous
  else {
    return (dice[i] === dice[i - 1]+ f);
  }
}

function allDifferent(el,i,arr) {
  //checks if all the values of sorted dice array are different
  //exclude first element as it cant be compared yet
  if (i === 0){
    return true;
  }
  //check if every element of sorted array is not equal to the previous one
  else {
    return (dice[i] !== dice[i - 1]);
  }
}

function reset() {
  //sets all the values of the dice elements to null
  for (var i = 0; i<6; i++) {
    document.getElementById("dice"+i).innerHTML = null;
  }
  //sets all the values of the array to null
  dice = [];
  score = [];
  //reset round counter to 0
  y=0;
  //hides all elements and shows the input box
   var x = document.getElementById("hideinput");
		x.style.display = "block";

	var z = document.getElementById("hideplaystage");
		z.style.display = "none";

  var s = document.getElementById("scorecard");
    s.style.display = "none";

    var r = document.getElementById("hideendgame");
      r.style.display = "none";
}

function endgame() {
  //hides the playstage and shows the scorecard and restart button
			var q = document.getElementById("hideendgame");
			q.style.display = "block";
      var z = document.getElementById("hideplaystage");
      z.style.display = "none";
}
