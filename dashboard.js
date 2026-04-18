
let members = JSON.parse(localStorage.getItem("members")) || []
let classes = JSON.parse(localStorage.getItem("classes")) || []


let totalMembers = members.length


let totalClasses = classes.length


let activeSubscriptions = members.length



let plans = {}

members.forEach(m => {
  plans[m.plan] = (plans[m.plan] || 0) + 1
})

let mostPopular = Object.keys(plans).reduce((a, b) =>
  plans[a] > plans[b] ? a : b, "None"
)

document.querySelectorAll(".stat-box h2")[0].innerText = totalMembers
document.querySelectorAll(".stat-box h2")[1].innerText = activeSubscriptions
document.querySelectorAll(".stat-box h2")[2].innerText = totalClasses



let table = document.querySelector("tbody")
table.innerHTML = ""

members.slice(-5).reverse().forEach(m => {
  table.innerHTML += `
    <tr>
      <td>${m.name}</td>
      <td>${m.joinDate || "N/A"}</td>
      <td>${m.plan}</td>
    </tr>
  `
})