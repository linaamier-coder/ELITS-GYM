const classes = [
  { name: "Yoga Flow", trainer: "Lina Boudia", day: "Monday", time: "13:00", duration: 60, difficulty: "Beginner", link: "yoga.html" },
  { name: "Yoga Flow", trainer: "Lina Boudia", day: "Thursday", time: "09:00", duration: 60, difficulty: "Beginner", link: "yoga.html" },
  { name: "Boxing Training", trainer: "Amir Hassan", day: "Tuesday", time: "08:00", duration: 90, difficulty: "Intermediate", link: "boxing.html" },
  { name: "Boxing Training", trainer: "Amir Hassan", day: "Friday", time: "18:00", duration: 90, difficulty: "Intermediate", link: "boxing.html" },
  { name: "HIIT Workout", trainer: "Zakaria Benmounah", day: "Wednesday", time: "19:00", duration: 45, difficulty: "Advanced", link: "hiit.html" },
  { name: "HIIT Workout", trainer: "Zakaria Benmounah", day: "Saturday", time: "10:00", duration: 45, difficulty: "Advanced", link: "hiit.html" },
  { name: "Pilates", trainer: "Sara Ali", day: "Thursday", time: "14:00", duration: 60, difficulty: "Beginner", link: "pilates.html" },
  { name: "Pilates", trainer: "Sara Ali", day: "Monday", time: "17:00", duration: 60, difficulty: "Beginner", link: "pilates.html" },
  { name: "CrossFit", trainer: "Samir Reda", day: "Sunday", time: "17:00", duration: 75, difficulty: "Advanced", link: "crossfit.html" },
  { name: "CrossFit", trainer: "Samir Reda", day: "Wednesday", time: "20:00", duration: 75, difficulty: "Advanced", link: "crossfit.html" },
];

// 🔹 selected values
let diff = "All";
let day = "";
let trainer = "";

// 🔹 Difficulty buttons
let buttons = document.querySelectorAll("#levelFilters button");

buttons.forEach(btn => {
  btn.onclick = function () {
    diff = btn.dataset.diff;

    // change active style
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    showData();
  };
});

// 🔹 Day select
document.getElementById("daySelect").onchange = function () {
  day = this.value;
  showData();
};

// 🔹 Trainer select
document.getElementById("trainerSelect").onchange = function () {
  trainer = this.value;
  showData();
};

// 🔹 SHOW DATA (filter + display)
function showData() {
  let tbody = document.getElementById("classTableBody");
  let result = "";

  for (let i = 0; i < classes.length; i++) {
    let c = classes[i];

    // filtering
    if (diff !== "All" && c.difficulty !== diff) continue;
    if (day && c.day !== day) continue;
    if (trainer && c.trainer !== trainer) continue;

    // build row
    result += `
      <tr>
        <td><a href="${c.link}">${c.name}</a></td>
        <td>${c.trainer}</td>
        <td>${c.day}</td>
        <td>${c.time}</td>
        <td>${c.duration} min</td>
        <td>${c.difficulty}</td>
      </tr>
    `;
  }

  // if empty
  if (result === "") {
    result = `<tr><td colspan="6" style="text-align:center;">No results</td></tr>`;
  }

  tbody.innerHTML = result;
}

// 🔹 sorting variables
let currentCol = "";
let direction = 1; // 1 = ascending, -1 = descending

// 🔹 headers click
let headers = document.querySelectorAll("th.sortable");

headers.forEach(th => {
  th.onclick = function () {
    let col = th.dataset.col;

    // change direction
    if (currentCol === col) {
      direction *= -1;
    } else {
      currentCol = col;
      direction = 1;
    }

    // sort data
    classes.sort((a, b) => {
      if (a[col] < b[col]) return -1 * direction;
      if (a[col] > b[col]) return 1 * direction;
      return 0;
    });

    updateArrows();
    showData();
  };
});

// 🔹 update arrows
function updateArrows() {
  let cols = ["name", "time", "duration"];

  cols.forEach(c => {
    let icon = document.getElementById("sort-" + c);

    if (!icon) return;

    if (c === currentCol) {
      icon.textContent = direction === 1 ? "▲" : "▼";
    } else {
      icon.textContent = "⬍";
    }
  });
}
// 🔹 start
showData();