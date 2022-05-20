



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


}

document.querySelector('.prev').
addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
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
  "wink",
  "sob",
  "eyeroll",
  "grimace",
  "pissed",
  "wtf"
];

const emojicount = emojis.length;

//Makes the emojis appear upon clicking the emoji picture
var emoji = document.getElementById("emoji");
document.getElementById("toggle").addEventListener('click', () => {
    //renderEmojis();
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
    if (j <= 5) {
      test.style.top = 5 + (20*j)+'px';
      test.style.left = 33+`rem`;
    } else {
      test.style.top = 5 + (20*(j-6))+'px';
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
        if (j <= 5) {
          test.style.top = 5 + (20*j)+'px';
          test.style.left = 33+`rem`;
        } else {
          test.style.top = 5 + (20*(j-6))+'px';
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