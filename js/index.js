var stop; //just incase we want to stop the count downs
var today = new Date();

$("#year").html("Christmas: " + importantDate("Dec 25 "));
$("#newYear").html("New Years: " + importantDate("Jan 1 "));
$("#hallowWeen").html("Halloween: " + importantDate("Oct 31 "));

function hide(){
  $("#christmas").hide();
  $("#newYears").hide();
  $("#hallowWeens").hide();
}

function holiday(box){
  switch(box){
    case 0:
      return $("#christmas");
      break;
    case 1:
      return $("#newYears");
      break;
    case 2:
      return $("#hallowWeens");
      break;
            }
}

$("#christ").click(function(){
  hide();
  holiday(0).show();
});

 $("#newY").click(function(){
   hide();
   holiday(1).show();
 });

$("#hall").click(function(){
  hide();
  holiday(2).show();
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
  //Xmas
  var xXmas = importantDate("Dec 25 ");
  var t = getTimeRemaining(xXmas);
  $("li.days").html(t.days);
  $("li.hours").html(t.hours);
  $("li.minutes").html(t.minutes);
  $("li.seconds").html(t.seconds);
  //New Years
  var nNewYear = importantDate("Jan 1 ")
  var n = getTimeRemaining(nNewYear);
  $("li.nyDays").html(n.days);
  $("li.nyHours").html(n.hours);
  $("li.nyMinutes").html(n.minutes);
  $("li.nySeconds").html(n.seconds);
  //hallowWeen
  var halloWeen = importantDate("Oct 31 ")
  var j = getTimeRemaining(halloWeen);
  $("li.hDays").html(j.days);
  $("li.hHours").html(j.hours);
  $("li.hMinutes").html(j.minutes);
  $("li.hSeconds").html(j.seconds);
}

$(function() {
  stop = setInterval(update, 1000);
  hide();
});