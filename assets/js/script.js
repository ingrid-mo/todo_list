const inputTask = document.getElementById("input_tarea");
const btnAdd = document.getElementById("btn_green");
const listTask = document.getElementById("list_task");
let taskidcounter = 0;

let tasks = [
  { id: 16, name: "hacer mercado" },
  {
    id: 9,
    name: "estudiar para la prueba",
  },
  {
    id: 12,
    name: "sacar a pasear a toby",
  },
];

let totalTask = 3;
let totalComplete = 0;

const createList = (tasks) => {
  let html = "";

  for (const task of tasks) {
    const taskStatus = task.ready ? "Completada" : "";

    html += `
    <tr>
      <th scope="row">${task.id}</th>
      <td>${task.name}</td>
      <td>${taskStatus}</td>
      <td>
        <div class="buttons">
          <input class=checkbox type="checkbox" id="checkbox_${task.id}" ${
      task.ready ? "checked" : ""
    }>
          <button onclick="borrar(${task.id})">
            <img src="./assets/img/x-circle.svg" alt="circle">
          </button>
        </div>
      </td>
    </tr>
    `;
  }
  listTask.innerHTML = html;

  for (const task of tasks) {
    const toggler = document.getElementById(`checkbox_${task.id}`);
    toggler.addEventListener("change", function () {
      task.ready = toggler.checked;
      createList(tasks);
      if (task.ready) {
        getComplete(1);
      } else {
        getComplete(-1);
      }
    });
  }
};

btnAdd.addEventListener("click", () => {
  getTotal(1);

  for (const task of tasks) {
    let id = task.id;
    if (id == taskidcounter) {
      taskidcounter++;
    }
  }

  const newTask = { id: taskidcounter++, name: inputTask.value, ready: false };
  tasks.push(newTask);
  inputTask.value = "";

  createList(tasks);
});

createList(tasks);

function borrar(id) {
  const index = tasks.findIndex((element) => element.id == id);
  if (index !== -1) {
    tasks.splice(index, 1);
    createList(tasks);
    getTotal(-1);
  }
}

function getTotal(operacion) {
  totalTask = totalTask + operacion;
  let totalScore = document.getElementById("seccion_total");
  let html = "";

  html += `<div class=total_title>
    <strong>Total:</strong>
    <p>${totalTask}</p>
    </div>`;

  totalScore.innerHTML = html;
}
function getComplete(operacion) {
  totalComplete = totalComplete + operacion;
  let html = "";

  let totalScore = document.getElementById("seccion_total2");

  html += `<div class=total_title>
    <strong>Realizado:</strong>
    <p>${totalComplete}</p>
    </div>`;

  totalScore.innerHTML = html;
}

getTotal(0);
getComplete(0);
