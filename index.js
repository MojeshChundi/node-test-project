// BACKEND DATA RENDER ON FRONT END
const resultDiv = document.getElementById("result");
function showOutput(newData) {
  const OutputHTML = `
<ul>
  <li>name: ${newData.name}</li>
  <li>number: ${newData.number}</li>
  <li>email: ${newData.email}</li>
  <li>
  <button class="delete-button" onclick="deleteData('${newData.id}')">Delete</button>
  <button class="edit-button" onclick="updateData(${newData.id})">Edit</button>
</li>
</ul>`;
  resultDiv.innerHTML += OutputHTML;
}

// POST REQUEST

const form = document
  .getElementById("registration-form")
  .addEventListener("submit", networkCall);

function networkCall(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const number = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const data = { name, number, email };
  axios
    .post("http://localhost:3000/user/add-user", data)
    .then(function (res) {
      showOutput(res.data.newData);
      console.log("user created!");
    })
    .catch(function (err) {
      console.log(err.name);
    });
}

// LOAD DATA

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/user/get-user")
    .then((res) => {
      const dataArray = res.data.newData;
      dataArray.forEach((data) => {
        showOutput(data);
        console.log(data);
      });
      console.log("response", dataArray);
    })
    .catch((error) => {
      console.log(error);
    });
});

//DELETE REQUEST

function deleteData(id) {
  axios
    .post("http://localhost:3000/user/delete-user", { id: id })
    .then((res) => {
      console.log("user deleted!");
    })
    .catch((err) => console.log(err));
}

function updateData(id) {
  const name = document.getElementById("name").value;
  const number = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  axios
    .post("http://localhost:3000/user/edit-user", {
      id: id,
      name: name,
      number: number,
      email: email,
    })
    .then((res) => {
      console.log("user deleted!");
    })
    .catch((err) => console.log(err));
}
