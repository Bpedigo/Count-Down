


var stop; //just incase we want to stop the count downs
var today = new Date();
var holidayDate = null;
var countDown = $("li.days");
var until = $("h3.until");
var holiday = null;


$("#christ").click(function(){
  holidayDate = "Dec 25 ";
  holiday = "Christmass ";
});

 $("#newY").click(function(){
   holidayDate = "Jan 1 "
   holiday ="New Years ";
 });

$("#hall").click(function(){
  holidayDate = "Oct 31 ";
  holiday = "Halloween ";
});

$("#than").click(function(){
  holidayDate = "Nov 23 ";
  holiday = "Thanksgiving ";
});

$("#july").click(function(){
  holidayDate = "July 4 ";
  holiday = "Independence Day ";
});

$("#vets").click(function(){
  holidayDate = "Nov 11 ";
  holiday = "Veterans Day ";
});

$("#colu").click(function(){
  holidayDate = "Oct 9 ";
  holiday = "Columbus Day ";
});

$("#labo").click(function(){
  holidayDate = "Sep 4 ";
  holiday = "Labor Day ";
});

$("#memo").click(function(){
  holidayDate = "May 29 ";
  holiday = "Memorial Day ";
});

$("#pres").click(function(){
  holidayDate = "Feb 20 ";
  holiday = "Presidents Day ";
});

$("#mlk").click(function(){
  holidayDate = "Jan 16 ";
  holiday = "Martin Luther King Jr. Day ";
});

$("#fath").click(function(){
  holidayDate = "Jun 18 ";
  holiday = "Father's Day ";
});

function importantDate(string) {
  var r = string + today.getFullYear();
  var idate = Date.parse(r) - Date.parse(new Date());
  if (idate <= 0) {
    r = string + (today.getFullYear() + 1);
  }
  return r;
}

function getTimeRemaining(endtime) {
 
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function update() {
  if(holidayDate === null ){
    console.log("holidays is empty");
  } else {
  var xXmas = importantDate(holidayDate);
  var t = getTimeRemaining(xXmas);
  until.html(holiday + " will be here in: ");
  countDown.html(t.days + " days " + t.hours + " hours " + t.minutes + " minutes " + t.seconds + " seconds ");
  }
}

$(function() {
  stop = setInterval(update, 1000);
});