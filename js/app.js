const grid = document.querySelector(".sched-grid");
const subs = document.querySelector(".subjects");
const rows = 7;
const columns = 12;

function initializeGrid(row, column) {
  for(let i = 0; i < (column * row); i++) {
    let schedCell = document.createElement("div");
    schedCell.classList.add("sched-cell");
    grid.appendChild(schedCell);
  }
}

// Initialize a grid full of .sched-cells
initializeGrid(rows, columns);

// Subjects Array
let subsArray = [
  {code: "GEC 103", instructor: "Mr. Hermosa", room: "LEC 5"},
  {code: "GEC 105", instructor: "Mrs. Repalam", room: "LEC 1"}
];

// Subject Maker Func
function createSubject(code, instructor, room) {
  const container = document.createElement('div');
  container.classList.add('subject-container');
  const subject = document.createElement('div');
  subject.classList.add('sub');
  
  for (let i = 0; i < arguments.length; i++) {
    const elem = document.createElement('p');
    elem.innerText = arguments[i];
    subject.appendChild(elem);
    container.appendChild(subject);
  }
  
  return container;
}

function renderSubjects(subsParent, subsArray) {
  for(let i = 0; i < subsArray.length; i++) {
    let { code, instructor, room } = subsArray[i];
    subsParent.appendChild(createSubject(code, instructor, room));
  }
}

renderSubjects(subs, subsArray);

// INTERACT JS
// Object holding the positions
let pos  = {
  x: 0,
  y: 0
}

interact('.sub').draggable({
  listeners: {
    move (event) {
      pos.x += event.dx;
      pos.y += event.dy;
      event.target.style.top = pos.y + "px";
      event.target.style.left = pos.x + "px";
    },
    end (event) {
      event.target.style.top = 0 + "px";
      event.target.style.left = 0 + "px";
    }
  }
});

interact('.sched-cell').dropzone({
    ondrop: function (event) {
      const drag = event.relatedTarget.cloneNode(true);
      const dropzone = event.target;
      
      dropzone.innerHTML = null;
      
      while(drag.firstElementChild) {
        dropzone.appendChild(drag.firstElementChild);
      }
      
      addXButton(dropzone);
      
      pos = {
        x:0,
        y:0
      }
    },
 })

function createClone(elem) {
  let elemClone = elem.cloneNode(true);
  subs.appendChild(elemClone);
}

function addXButton(elem) {
   const btn = document.createElement("button");
   btn.innerText = "X";
   btn.addEventListener("click", function(e) {
     e.target.parentNode.innerHTML = null;
     e.stopPropagation();
   });
  elem.appendChild(btn);
}

//CREATE SCHEDULE
let day = document.querySelector(".days");
let time = document.querySelector(".time");

function createSchedule(grid) {
  let elemArr = Array.from(grid.children);
  
  let schedule = [];

  for(let i = 0; i < elemArr.length; i++) {
    let detailArr = elemArr[i].children;
    if (detailArr.length > 0) {
       let scheduleCellObj = {
         code: detailArr[0].innerText,
         instructor: detailArr[1].innerText,
         room: detailArr[2].innerText,
         day: day.children[(i % 7) + 1].innerText,
         time: time.children[Math.floor(i / 7)].innerText
       };
      schedule.push(scheduleCellObj);
    }
  }
  
  console.log(schedule);
}