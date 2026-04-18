
const LS_KEY = "classes";

let classes = JSON.parse(localStorage.getItem(LS_KEY)) || [];

document.getElementById("classForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let data = {
    id: Date.now(),
    name: document.getElementById("className").value.trim(),
    trainer: document.getElementById("trainer").value.trim(),
    day: document.getElementById("day").value.trim(),
    time: document.getElementById("time").value,
    duration: document.getElementById("duration").value,
    difficulty: document.getElementById("difficulty").value,
    capacity: document.getElementById("capacity").value
  };


  if (!data.name || !data.trainer || !data.day || !data.time) {
    alert("Please fill all fields");
    return;
  }


  let exists = classes.some(c =>
    c.trainer.toLowerCase() === data.trainer.toLowerCase() &&
    c.day.toLowerCase() === data.day.toLowerCase() &&
    c.time === data.time
  );

  if (exists) {
    alert("This trainer already has a class at this time!");
    return;
  }

  classes.push(data);

  localStorage.setItem(LS_KEY, JSON.stringify(classes));

  this.reset();
  renderClasses();
});


function renderClasses() {
  let table = document.getElementById("classesTable");
  table.innerHTML = "";

  if (classes.length === 0) {
    table.innerHTML = `<tr><td colspan="8">No classes yet</td></tr>`;
    return;
  }

  classes.forEach((c, index) => {
    table.innerHTML += `
      <tr>
        <td>${c.name}</td>
        <td>${c.trainer}</td>
        <td>${c.day}</td>
        <td>${formatTime(c.time)}</td>
        <td>${c.duration} min</td>
        <td>${c.difficulty}</td>
        <td>${c.capacity}</td>
        <td>
          <button onclick="deleteClass(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteClass(index) {
  if (confirm("Are you sure?")) {
    classes.splice(index, 1);
    localStorage.setItem(LS_KEY, JSON.stringify(classes));
    renderClasses();
  }
}

function formatTime(t) {
  if (!t) return "";
  let [h, m] = t.split(":");
  h = parseInt(h);
  let ampm = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${m} ${ampm}`;
}
document.addEventListener("DOMContentLoaded", function() {
  renderClasses();
});