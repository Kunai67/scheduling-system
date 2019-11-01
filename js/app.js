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
  {code: "GEC 103", instructor: "Mr. Hermosa", room: "LEC 5", bg: "black"},
  {code: "GEC 105", instructor: "Mrs. Repalam", room: "LEC 1", bg: "green"}
];

// Subject Maker Func
function createSubject(subjectObj) {
  const container = document.createElement('div');
  container.classList.add('subject-container');
  const subject = document.createElement('div');
  subject.classList.add('sub');

  for (const key in subjectObj) {
    if (key !== "bg") {
      const elem = document.createElement('p');
      elem.innerText = subjectObj[key];
      subject.appendChild(elem);
      container.appendChild(subject);
    } else {
      subject.style.background = subjectObj[key];
    }
  }
  
  return container;
}

function renderSubjects(subsParent, subsArray) {
  for(let i = 0; i < subsArray.length; i++) {
    subsParent.appendChild(createSubject(subsArray[i]));
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
      pos = {
        x:0,
        y:0
      }

      event.target.style.top = pos.y + "px";
      event.target.style.left = pos.x + "px";

      if (event.target.parentNode.classList.contains("subject-container")) {
        event.target.parentNode.replaceChild(event.target.cloneNode(true), event.target);
      }
    },
  }
});

interact('.sched-cell').dropzone({
  listeners: {
    drop (event) {
      const drag = event.relatedTarget;
      const dropzone = event.target;
      
      dropzone.innerHTML = null;
      dropzone.removeAttribute('style');
      
      dropzone.appendChild(drag);
      
      pos = {
        x:0,
        y:0
      }
    }
  }
 })

// ---------------------------------------------- REFACTORED ------------------------------------------------------------

//CREATE SCHEDULE
let day = document.querySelector(".days");
let time = document.querySelector(".time");

function createSchedule(grid) {
  let elemArr = Array.from(grid.children);
  
  let schedule = [];

  for(let i = 0; i < elemArr.length; i++) {
    if (elemArr[i].firstElementChild) {
      let detailArr = elemArr[i].firstElementChild.children;
      if (detailArr.length > 0) {
        let scheduleCellObj = {
          code: detailArr[0].innerText,
          instructor: detailArr[1].innerText,
          room: detailArr[2].innerText,
          bg: elemArr[i].firstElementChild.style.background,
          day: day.children[(i % 7) + 1].innerText,
          time: time.children[Math.floor(i / 7)].innerText
        };
       schedule.push(scheduleCellObj);
     }
    }
  }

  console.log(schedule);
}