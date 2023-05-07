//128
//get
// const apiUrl = "https://jsonplaceholder.typicode.com/todos";

// const getTodos = () => {
//   fetch(apiUrl + "?_limit=5")
//     .then((res) => res.json())
//     .then((data) => {
//       data.forEach((todo) => {
//         addToDoToDOM(todo);
//       });
//     });
// };

// const addToDoToDOM = (todo) => {
//   const div = document.createElement("div");
//   div.appendChild(document.createTextNode(todo.title));
//   div.setAttribute("data-id", todo.id);

//   if (todo.completed) {
//     div.classList.add("done");
//   }

//   document.getElementById("todo-list").appendChild(div);
// };

// const createTodo = (e) => {
//   e.preventDefault();

//   const newTodo = {
//     title: e.target.firstElementChild.value,
//     completed: false,
//   };

//   fetch(apiUrl , {
//     method: 'POST',
//     body: JSON.stringify(newTodo),
//     headers: {
//         'content-type' : 'application/json'
//     }
//   })
//   .then(res => res.json())
//   .then(data => addToDoToDOM(data))
// };

// const init = () => {
//   document.addEventListener("DOMContentLoaded", getTodos);
//   document.querySelector("#todo-form").addEventListener("submit", createTodo);
// };

// init();

//128
//get

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const getTodos = () => {
  fetch(apiUrl + "?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => addToDoToDOM(element));
    });
};

const addToDoToDOM = (element) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(element.title));
  div.classList.add("todo");
  div.setAttribute("data-id", element.id);

  document.getElementById("todo-list").appendChild(div);

  if (element.completed) {
    div.classList.add("done");
  }
};

const createTodo = (e) => {
  e.preventDefault();

  const newToDo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newToDo),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => res.json)
    .then((data) => addToDoToDOM(data));
};

const toggleCompleted = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");
  }

  updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
};

const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // .then((res) => res.json())
  // .then((data) => console.log(data));
};

const deleteTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => e.target.remove()); 
  }
};

const init = function () {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document
    .querySelector("#todo-list")
    .addEventListener("click", toggleCompleted);
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
};

init();

