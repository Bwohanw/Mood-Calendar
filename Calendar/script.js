



//Creating the Dynamic Calendar
const date = new Date();

const renderCalendar = () => {

    date.setDate(1);

    const monthDays = document.querySelector(".days");
    
    const lastDay = new Date(date.getFullYear(), 
    date.getMonth() + 1, 0).getDate();
    
    const prevLastDay = new Date(date.getFullYear(), 
    date.getMonth(), 0).getDate();
    
    const firstDayIndex = date.getDay();
    
    const lastDayIndex = new Date(date.getFullYear(), 
    date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;
    
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    
    document.querySelector('.date h1').innerHTML
    = months[date.getMonth()];
    
    document.querySelector('.date p').innerHTML
    = new Date().toDateString();
    
    let days = "";
    
    for(let x = firstDayIndex; x > 0; x--) {
        days += `<div class = "prev-date">${prevLastDay - x + 1}</div>`;
    }

    for(let i = 1; i <= lastDay; i++) {
        var thisDay = new Date(date.getFullYear(), date.getMonth(), 1);
        thisDay.setDate(i);
        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today" id="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }
    
    for(let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }
    monthDays.innerHTML = days;
    try {
      var month = document.getElementById("month");
      document.getElementById("today").style.backgroundColor = window.getComputedStyle(month).backgroundColor;
    } catch {
    }
}

document.querySelector('.prev').
addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    //document.querySelector('.date h1').innerHTML = window.getComputedStyle(month).color;
})

document.querySelector('.next').
addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})

renderCalendar();


const emojis = [
  "happy",
  "cool",
  "relief",
  "whatever",
  "frown",
  "anxious",
  "cowboy",
  "angel",
//divider between columns
  "wink",
  "sob",
  "eyeroll",
  "grimace",
  "pissed",
  "wtf",
  "determined",
  "devil"
];

const emojicount = emojis.length;

//Makes the emojis appear upon clicking the emoji picture
var emoji = document.getElementById("emoji");
document.getElementById("toggle").addEventListener('click', () => {
    if (emoji.style.display !== "none") {
        emoji.style.display = "none";
    } else {
        emoji.style.display = "block";
    }
})

//making the emojis draggable
//makes the tests 1-j draggable
for (let i = 0; i < emojicount; i++) {
for(let j = 1; j <= 10; j++) {
  dragElement(document.getElementById(`${emojis[i]}-${j}`));
}
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt) {
      // if present, the header is where you move the DIV from:
      elmnt.onmousedown = dragMouseDown;;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      // saves the current position of each emoji
      for (let i = 0; i < emojicount; i++) {
        for(let j = 1; j <= 10; j++) {
      var offsets = document.getElementById(`${emojis[i]}-${j}`).getBoundingClientRect();
      var top = offsets.top;
      var left = offsets.left;
      localStorage.setItem(`${emojis[i]}-${j}top`, `${top}`);
      localStorage.setItem(`${emojis[i]}-${j}left`, `${left}`);
        }
      }
    }
  }

//delete button
function touching(d1,d2){
  let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
  let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
  return ox && oy;
}

for (let j = 0; j < emojicount; j++) {
for(let i = 1; i <= 10; i++) {
document.getElementById(`${emojis[j]}-${i}`).addEventListener('click', () => {
  let d1 = document.getElementById(`${emojis[j]}-${i}`).getBoundingClientRect();
  let d2 = document.getElementById('trash').getBoundingClientRect();
  if (d2.top < d1.bottom - 10) {
    var test = document.getElementById(`${emojis[j]}-${i}`);
    if (j <= (emojicount / 2) - 1) {
      test.style.top = 5 + (20*j)+'px';
      test.style.left = 33+`rem`;
    } else {
      test.style.top = 5 + (20*(j-(emojicount / 2)))+'px';
      test.style.left = 35.5+'rem';
    }
    var pos = document.getElementById(`${emojis[j]}-${i}`).getBoundingClientRect();
    var t = pos.top;
    var l = pos.left;
    localStorage.setItem(`${emojis[j]}-${i}top`, `${t}`);
    localStorage.setItem(`${emojis[j]}-${i}left`, `${l}`);
  }
})
}
}
//makes delete button work for everything

document.getElementById("reset").addEventListener('dblclick', () => {
  for (let j = 0; j < emojicount; j++) {
    for(let i = 1; i <= 10; i++) {
        var test = document.getElementById(`${emojis[j]}-${i}`);
        if (j <= (emojicount / 2) - 1) {
          test.style.top = 5 + (20*j)+'px';
          test.style.left = 33+`rem`;
        } else {
          test.style.top = 5 + (20*(j-(emojicount / 2)))+'px';
          test.style.left = 35.5+'rem';
        }
    }
    }
})
//functioning reset button, replaces all emojis where they originally were
document.getElementById("reload").addEventListener('click', () => {
  for (let i = 0; i < emojicount; i++) {
    for(let j = 1; j <= 10; j++) {
      const toppos = localStorage.getItem(`${emojis[i]}-${j}top`);
      const leftpos = localStorage.getItem(`${emojis[i]}-${j}left`);
      var test = document.getElementById(`${emojis[i]}-${j}`);
      test.style.top = toppos+'px';
      test.style.left = leftpos + 'px';
    }
  }
})



document.getElementById("text").style.display = "none";
document.getElementById("close").style.display = "none";
document.getElementById("note").style.display = "none";

var isClicked = false;
try {
document.getElementById("today").addEventListener('click', () => {
  if (!isClicked) {
    var calendar = document.getElementById("calendar");
      calendar.style.height = "80rem";
      document.getElementById("text").style.display = "block";
      document.getElementById("close").style.display = "block";
      document.getElementById("note").style.display = "block";
      document.getElementById("text").value = "";
      try {
        document.getElementById("text").value = localStorage.getItem("today");
      } catch {
      }
      isClicked = true;
  }
})
} catch {
}

document.getElementById("close").addEventListener('click', () => {
  if (isClicked) {
    isClicked = false;
    localStorage.setItem("today", document.getElementById("text").value);
    calendar.style.height = "52rem";
    document.getElementById("text").style.display = "none";
    document.getElementById("close").style.display = "none";
    document.getElementById("note").style.display = "none";
  }
})

const d = document.getElementsByClassName("days");
for (let i = 0; i < d.length; i++) {
  d[i].addEventListener('click', () => {
    if (!isClicked) {
      var calendar = document.getElementById("calendar");
      calendar.style.height = "80rem";
      document.getElementById("text").style.display = "block";
      document.getElementById("close").style.display = "block";
      document.getElementById("note").style.display = "block";
      document.getElementById("text").value = "";
      try {
        document.getElementById("text").value = localStorage.getItem("today");
      } catch {
      }
      isClicked = true;
    }
  })
}


var background_color = document.getElementById("background-color");
var primary_color = document.getElementById("primary-color");
var font_color = document.getElementById("font-color");
var dates_color = document.getElementById("dates-color");
var color_div = document.getElementById("colordiv");
document.getElementById("color-palette").addEventListener('click', () => {
  if (background_color.style.display !== "none") {
      background_color.style.display = "none";
  } else {
      background_color.style.display = "block";
  }
  if (primary_color.style.display !== "none") {
      primary_color.style.display = "none";
  } else {
      primary_color.style.display = "block";
  }
  if (font_color.style.display !== "none") {
    font_color.style.display = "none";
  } else {
    font_color.style.display = "block";
  }
  if (dates_color.style.display !== "none") {
    dates_color.style.display = "none";
  } else {
    dates_color.style.display = "block";
  }
  if (color_div.style.display !== "none") {
    color_div.style.display = "none";
  } else {
    color_div.style.display = "block";
  }
});

document.getElementById("bg-1").addEventListener('click', () => {
  var calendar = document.getElementById("calendar");
  calendar.style.backgroundColor = "white";
  let color = window.getComputedStyle(calendar).color;
  if (color == "rgb(238, 238, 238)") {
    calendar.style.color = "black";
    localStorage.setItem("daycolor", "black");
  }
  localStorage.setItem("bg", "white");
})
document.getElementById("bg-2").addEventListener('click', () => {
  var calendar = document.getElementById("calendar");
  calendar.style.backgroundColor = "#222227";
  localStorage.setItem("bg", "#222227");
  let color = window.getComputedStyle(calendar).color;
  if (color == "rgb(0, 0, 0)") {
    calendar.style.color = "rgb(238, 238, 238)";
    localStorage.setItem("daycolor", "rgb(238, 238, 238)");
  }
})

const num_colors = 34;
const colors = [
  "firebrick",
  "red",
  "crimson",
  "orangered",
  "orange",
  "gold",
  "green",
  "#167e56",
  "seagreen",
  "springgreen",
  "limegreen",
  "blue",
  "royalblue",
  "deepskyblue",
  "lightskyblue",
  "darkturquoise",
  "aquamarine",
  "aqua",
  "blueviolet",
  "darkviolet",
  "orchid",
  "violet",
  "#ff6666",
  "palevioletred",
  "pink",
  "lavenderblush",
  "beige",
  "azure",
  "lightskyblue",
  "mistyrose",
  "lemonchiffon",
  "mintcream",
  "#eee",
  "black"
];

let topcolor = "aqua";
let bg = "#222227";
let daycolor = "#eee";
let headercolor = "#167e56";
try {
  topcolor = localStorage.getItem("topcolor");
} catch{
}
try {
  bg = localStorage.getItem("bg");
} catch{
}
try {
  daycolor = localStorage.getItem("daycolor");
} catch{
}
try {
  headercolor = localStorage.getItem("headercolor");
} catch{
}
document.getElementById("fo-0").style.color = topcolor;
document.getElementById("dates-0").style.color = daycolor;
document.getElementById("pr-0").style.color = headercolor;


var langle = document.getElementById("langle");
var rangle = document.getElementById("rangle");
var monthword = document.getElementById("monthword");
var dateword = document.getElementById("dateword");
var calendar = document.getElementById("calendar");
var month = document.getElementById("month");
var today = document.getElementById("today");
for (let x = 1; x <= num_colors; x++) {
  document.getElementById(`fo-${x}`).addEventListener('click', () => {
    var color = colors[x-1];
    //var langle = document.getElementById("langle");
    langle.style.color = color;
    //var rangle = document.getElementById("rangle");
    rangle.style.color = color;
    // var monthword = document.getElementById("monthword");
    // var dateword = document.getElementById("dateword");
    monthword.style.color = color;
    dateword.style.color = color;
    localStorage.setItem("topcolor", color);
    document.getElementById("fo-0").style.color = color;
  });
  document.getElementById(`dates-${x}`).addEventListener('click', () => {
    var color = colors[x-1];
    //var calendar = document.getElementById("calendar");
    //this line down here changes the font text so do with that what you will
    calendar.style.color = color;
    //calendar.style.backgroundColor = color;
    localStorage.setItem("daycolor", color);
    document.getElementById("dates-0").style.color = color;
  });
  document.getElementById(`pr-${x}`).addEventListener('click',() => {
    var color = colors[x-1];
    //var month = document.getElementById("month");
    month.style.backgroundColor = color;
    var today = document.getElementById("today");
    today.style.backgroundColor = color;
    localStorage.setItem("headercolor", color);
    document.getElementById("pr-0").style.color = color;
  })
}

document.getElementById("layout-reset").addEventListener('click', () => {
  langle.style.color = "aqua";
  rangle.style.color = "aqua";
  monthword.style.color = "aqua";
  dateword.style.color = "aqua";
  localStorage.setItem("topcolor", "aqua");
  calendar.style.color = "#eee";
  calendar.style.backgroundColor = "#222227";
  localStorage.setItem("bg", "#222227");
  localStorage.setItem("daycolor", "#eee")
  month.style.backgroundColor = "#167e56";
  var today = document.getElementById("today");
  today.style.backgroundColor = "#167e56";
  localStorage.setItem("headercolor", "#167e56");
})


langle.style.color = topcolor;
rangle.style.color = topcolor;
monthword.style.color = topcolor;
dateword.style.color = topcolor;
calendar.style.color = daycolor;
calendar.style.backgroundColor = bg;
month.style.backgroundColor = headercolor;
today.style.backgroundColor = headercolor;


/*var isClicked = false;
var currentbox = "";

//testing add text box        
const d = document.getElementsByClassName("days");
//THIS ^ IS 1 FOR SOME REASON
window.onload=function() {
for (let i = 0; i < new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); i++) {
  var thisDay = new Date(date.getFullYear(), date.getMonth()+1, 1);
  thisDay.setDate(i);
  var theID = document.getElementById(`${thisDay.getFullYear()}-${thisDay.getMonth()}-${thisDay.getDate()}`);
  theID.addEventListener('click', () => {
    if (!isClicked) {
      var calendar = document.getElementById("calendar");
      calendar.style.height = "80rem";
      document.getElementById("text").style.display = "block";
      document.getElementById("close").style.display = "block";
      document.getElementById("text").value = "";
        document.getElementById("text").value = `${theID}`;
      isClicked = true;
    }
  })
document.getElementById("close").addEventListener('click', ()=> {
  if (isClicked) {
    isClicked = false;
    calendar.style.height = "52rem";
    localStorage.setItem(d[i].id, document.getElementById("text").value);
    document.getElementById("text").style.display = "none";
    document.getElementById("close").style.display = "none";
  }
})
}
}

/*var isClicked = false;
//testing adding notes
var today = document.getElementById("today").addEventListener('click', () => {
  var calendar = document.getElementById("calendar");
  if (!isClicked) {
    calendar.style.height = "80rem";
    isClicked = true;
  } else {
    calendar.style.height = "52rem";
    isClicked = false;
  }
})*/