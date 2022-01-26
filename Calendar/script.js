



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
        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth() && 
        date.getFullYear() === new Date().getFullYear()) {
            days += `<div class="today">${i}</div>`;
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


/*const targetDiv = document.getElementById("emoji");
const btn = document.getElementById("toggle");
btn.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
};
*/


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


/*const renderEmojis = () => {
  const emojilist = document.querySelector('.emojilist');

  let emojiGeneration = "";


  emojiGeneration += `<div class = "test" id = "test-1">${emojis[0]}</div>`;
  emojiGeneration += `<div class = "test" id = "test-2">${emojis[1]}</div>`
  emojilist.innerHTML = emojiGeneration;
}*/



//Button functionality
var emoji = document.getElementById("emoji");
document.getElementById("toggle").addEventListener('click', () => {
    //renderEmojis();
    if (emoji.style.display !== "none") {
        emoji.style.display = "none";
    } else {
        emoji.style.display = "block";
    }
})


/*function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
attempt at making a drag and drop, temporarily replaced with just draggable div
*/

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
    }
  }

//delete button
function touching(d1,d2){
  let ox = Math.abs(d1.x - d2.x) < (d1.x < d2.x ? d2.width : d1.width);
  let oy = Math.abs(d1.y - d2.y) < (d1.y < d2.y ? d2.height : d1.height);
  return ox && oy;
}

/*(for (let i = 1; i <= emojicount; i++) {
  document.getElementById(`test-${i}`).addEventListener('click', () => {
    let d1 = document.getElementById(`test-${i}`).getBoundingClientRect();
    let d2 = document.getElementById('trash').getBoundingClientRect();
    if (d2.top < d1.bottom - 10) {
      var test = document.getElementById(`test-${i}`);
      test.style.top = 10 + 'px';
    }
  })
}*/
// makes the delete button work for all tests 0-i

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
  }
})
}
}
//makes delete button work for everything

document.getElementById("reset").addEventListener('click', () => {
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

