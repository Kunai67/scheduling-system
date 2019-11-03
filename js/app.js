// GLOBALS
const grid = document.querySelector(".sched-grid");
const subs = document.querySelector(".subjects");
const rows = 7;
const columns = 12;

// SAMPLE SUBJECT ARRAY FROM SERVER (For debug only)
let subsArray = [{
    code: "GEC 103",
    instructor: "Mr. Hermosa",
    room: "LEC 5",
    bg: "black"
  },
  {
    code: "GEC 105",
    instructor: "Mrs. Repalam",
    room: "LEC 1",
    bg: "green"
  }
];

// SAMPLE SCHEDULE ARRAY FROM SERVER (For debug only)
let schedArray = [{
    code: "GEC 103",
    instructor: "Mr. Hermosa",
    room: "LEC 5",
    bg: "black",
    day: 0,
    time: 1
  },
  {
    code: "GEC 105",
    instructor: "Mrs. Repalam",
    room: "LEC 1",
    bg: "green",
    day: 3,
    time: 5,
  }
];

// An object holding the default position of draggables (INTERACTJS)
let pos = {
  x: 0,
  y: 0
}

// FUNCTION CALLS
initializeGrid(rows, columns);
renderSubjects(subs, subsArray);
loadSchedule(grid, schedArray);


// INTERACTJS INSTANTIATION
interact('.sub').draggable({
  listeners: {
    move(event) {
      pos.x += event.dx;
      pos.y += event.dy;
      event.target.style.top = pos.y + "px";
      event.target.style.left = pos.x + "px";
    },
    end(event) {
      pos = {
        x: 0,
        y: 0
      }

      event.target.style.top = pos.y + "px";
      event.target.style.left = pos.x + "px";

      // If the target's PARENT is a container, replace the subject "element" ondrop
      if (event.target.parentNode.classList.contains("subject-container")) {
        event.target.parentNode.replaceChild(event.target.cloneNode(true), event.target);
      }
    },
  }
});

interact('.sched-cell').dropzone({
  listeners: {
    drop(event) {
      const drag = event.relatedTarget;
      const dropzone = event.target;

      dropzone.innerHTML = null;
      dropzone.removeAttribute('style');
      dropzone.appendChild(drag);

      pos = {
        x: 0,
        y: 0
      }
    }
  }
})


// FUNCTIONS
// Initializes a grid full of .sched-cells
function initializeGrid(row, column) {
  for (let i = 0; i < (column * row); i++) {
    let schedCell = document.createElement("div");
    schedCell.classList.add("sched-cell");
    grid.appendChild(schedCell);
  }
}

// Creates and returns a subject "element" with or without a container
// With container subjects are used for the sidebar, while without containers are used on loading existing scheds
function createSubject(subjectObj, hasContainer = true) {
  const subject = document.createElement('div');
  subject.classList.add('sub');

  for (const key in subjectObj) {
    if (key !== "bg") {
      const elem = document.createElement('p');
      elem.innerText = subjectObj[key];
      subject.appendChild(elem);

    } else {
      subject.style.background = subjectObj[key];
    }
  }

  if (hasContainer) {
    const container = document.createElement('div');
    container.classList.add('subject-container');
    container.appendChild(subject);
    return container;
  } else {
    return subject;
  }
}

// Adds a new subject to the sidebar (Called on modal)
function addSubject(subsParent) {
  const inputArr = Array.from(document.querySelectorAll(".form-group-material-blue-text"));
  let subject = {};
  for (let i = 0; i < inputArr.length; i++) {
    subject[inputArr[i].getAttribute('id')] = inputArr[i].value;
    inputArr[i].value = null;
  }

  subsParent.appendChild(createSubject(subject));
}

// Renders the subjects onto the sidebar
function renderSubjects(subsParent, subsArray) {
  for (let i = 0; i < subsArray.length; i++) {
    subsParent.appendChild(createSubject(subsArray[i]));
  }
}

// Checks every cell in the schedGridElem and saves each information into an object, pushes it to an array then (send to server)
function createSchedule(schedGridElem) {
  let elemArr = Array.from(schedGridElem.children);

  let schedule = [];

  for (let i = 0; i < elemArr.length; i++) {

    if (elemArr[i].firstElementChild) {
      let detailArr = elemArr[i].firstElementChild.children;

      if (detailArr.length > 0) {

        let scheduleCellObj = {
          code: detailArr[0].innerText,
          instructor: detailArr[1].innerText,
          room: detailArr[2].innerText,
          bg: elemArr[i].firstElementChild.style.background,
          day: (i % 7),
          time: Math.floor(i / 7)
        };

        schedule.push(scheduleCellObj);
      }
    }
  }

  // CHANGE TO SEND TO SERVER
  console.log(schedule);
}

//===========================================  REFACTOR ===========================================================
// Loads a schedule from a scheduleArr array
function loadSchedule(schedGridElem, scheduleArr) {
  scheduleArr.forEach(obj => {
    let index = obj.day + (obj.time * 7);
    let {
      code,
      instructor,
      room,
      bg
    } = obj;
    let croppedSub = {
      code,
      instructor,
      room,
      bg
    }
    schedGridElem.children[index].appendChild(createSubject(croppedSub, false));
  });
}