// BACKEND DATA RENDER ON FRONT END

const resultDiv = document.getElementById("result");
const total = document.getElementById("total");
let totalAmount = 0;
function showOutput(newData) {
  totalAmount += newData.Amount * 1;
  console.log(totalAmount);
  total.innerHTML = `total worth of the products :${totalAmount}`;
  const OutputHTML = `
<ul>
  <li>name: ${newData.name}</li>
  <li>Amount: ${newData.Amount}</li>
  <li>Desc: ${newData.Desc}</li>
  <li>
  <button class="delete-button" onclick="deleteData('${newData.id}')">Delete</button>
  <button class="edit-button" onclick="updateData(${newData.id})">Edit</button>
</li>
</ul>`;
  resultDiv.innerHTML += OutputHTML;
}

// POST REQUEST

const form = document
  .getElementById("expense-form")
  .addEventListener("submit", networkCall);

function networkCall(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const Amount = document.getElementById("Amount").value;
  const Desc = document.getElementById("Desc").value;
  const data = { name, Amount, Desc };
  axios
    .post("http://localhost:3000/user/add-prod", data)
    .then(function (res) {
      showOutput(res.data.newData);
      console.log("user created!");
    })
    .catch(function (err) {
      console.log(err.name);
    });

  document.getElementById("name").value = "";
  document.getElementById("Amount").value = "";
  document.getElementById("Desc").value = "";
}

// LOAD DATA

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/user/get-prod")
    .then((res) => {
      const dataArray = res.data.newData;
      dataArray.forEach((data) => {
        showOutput(data);
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
    .post("http://localhost:3000/user/delete-prod", { id: id })
    .then((res) => {
      console.log("user deleted!");
    })
    .catch((err) => console.log(err));
}

function updateData(id) {
  const name = document.getElementById("name").value;
  const Amount = document.getElementById("Amount").value;
  const Desc = document.getElementById("Desc").value;
  axios
    .post("http://localhost:3000/user/edit-prod", {
      id: id,
      name: name,
      Amount: Amount,
      Desc: Desc,
    })
    .then((res) => {
      console.log("user deleted!");
    })
    .catch((err) => console.log(err));
}
