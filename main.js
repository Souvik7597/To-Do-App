const input = document.querySelector(".input-text");

const output = document.querySelector(".task-list");

const button = document.querySelector(".add-btn");

const array = [];

let editIndex = null;

function check(title, array) {
    if (title === "") {
        return false;
    };

    if (editIndex === null) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].title === title) {
                alert("Same Task Already Exists!");
                return false;
            };
        };
    };

    return true;
};

function add() {
    const title = input.value.trim();
    if (check(title, array)) {
        array.push({ title, completed: false });
    } else {
        array[editIndex].title = title;
        editIndex = null;
        button.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    };
    input.value = "";
    render(array)
};

function deleteTask(i) {
    array.splice(i, 1);
    render(array);
};

function doneTask(i) {
    array[i].completed = !array[i].completed;
    render(array);
};

function editTask(i) {
    input.value = array[i].title;
    button.innerHTML = `<i class="fa-solid fa-check"></i>`;
};

button.addEventListener("click", add);



// function render(array) {
//     output.innerHTML = "";

//     array.forEach((item, i) => {
//         output.innerHTML += `
//                             <div class="task ${item.completed ? 'line-through' : ''}">
//                                 <h3>${item.title}</h3>
//                                 <div class="icons">
//                                 <i onclick=doneTask(${i}) class="fa-solid fa-check complete"></i>
//                                 <i onclick=editTask(${i}) class="fa-solid fa-pen-to-square edit"></i>
//                                 <i onclick=deleteTask(${i}) class="fa-solid fa-trash delete"></i>
//                                 </div>
//                             </div>
//     `;
//     });
// };


function render(array) {
    output.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const taskBox = document.createElement("div");
        const textBox = document.createElement("div");
        const buttonDiv = document.createElement("div");
        const completeBtn = document.createElement("i");
        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");

        taskBox.className = array[i].completed ? "line-through" : "task";

        textBox.textContent = `${array[i].title}`
        buttonDiv.className = "icons";
        completeBtn.className = array[i].completed ? "fa-solid fa-xmark complete" :"fa-solid fa-check complete";
        editBtn.className = "fa-solid fa-pen-to-square edit";
        deleteBtn.className = "fa-solid fa-trash delete";
        buttonDiv.append(completeBtn, editBtn, deleteBtn);
        taskBox.append(textBox, buttonDiv);
        output.appendChild(taskBox);

        completeBtn.addEventListener("click", () => doneTask(i));
        editBtn.addEventListener("click", () => editTask(i));
        deleteBtn.addEventListener("click", () => deleteTask(i));
    };
};

input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') add();
});
