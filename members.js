const defaultMembers = [
    { name: "Anes", email: "anesbhl@gmail.com", phone: "0555123456" ,plan:"Gold",joinDate:"2024-11-22"},
    { name: "Serine", email: "serines@gmail.com", phone: "0666234567",plan:"Gold",joinDate:"2025-07-08" },
    { name: "zak", email: "zaakaria@gmail.com", phone: "0777345678",plan:"Silver",joinDate:"2026-01-16" },
    { name: "ali", email: "ali@gmail.com", phone: "0555987654" ,plan:"Bronze",joinDate:"2026-03-30"},
    { name: "lina", email: "lina@gmail.com", phone: "0666123789",plan:"Silver",joinDate:"2025-11-22" }
];
let members = JSON.parse(localStorage.getItem("members")) 
if (!members || members.length === 0) {
    members = defaultMembers;
    localStorage.setItem("members", JSON.stringify(members));
    function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members));
}
} 

function renderMembers(list = members) {
    let table = document.getElementById("membersTable")
    table.innerHTML = ""

    list.forEach((member, index) => {
    table.innerHTML += `
    <tr>
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.phone}</td>
        <td>${member.plan}</td>
        <td>${member.joinDate}</td>
        <td>
    <button onclick="editMember(${index})">Edit</button>
    <button onclick="deleteMember(${index})">Delete</button>
        </td>
    </tr>
    `
})


}


document.getElementById("memberForm").addEventListener("submit", function(e) {
e.preventDefault()

let name = document.getElementById("name").value
let email = document.getElementById("email").value
let phone = document.getElementById("phone").value
let plan = document.getElementById("plan").value
let joinDate = document.getElementById("date").value
members.push({ name, email, phone, plan,joinDate })

localStorage.setItem("members", JSON.stringify(members))//save in localStorage(swith intp array)

this.reset()
renderMembers()
})


function deleteMember(index) {
if (confirm("Are you sure?")) {
    members.splice(index, 1)
    localStorage.setItem("members", JSON.stringify(members))
    renderMembers()
}
}


function editMember(index) {
let newName = prompt("Enter new name:", members[index].name)
let newEmail = prompt("Enter new email:", members[index].email)

if (newName && newEmail) {
    members[index].name = newName
    members[index].email = newEmail

    localStorage.setItem("members", JSON.stringify(members))
    renderMembers()
}
}


document.getElementById("search").addEventListener("input", function() {
let value = this.value.toLowerCase()

let filtered = members.filter(m =>
    m.name.toLowerCase().includes(value)
)

renderMembers(filtered)
})

renderMembers()