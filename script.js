// ====== DATA STORAGE ======
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ====== SAVE TO LOCAL STORAGE ======
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ====== UPDATE COUNTER ======
function updateCounter() {
  const completed = tasks.filter(t => t.done).length;
  document.getElementById("counter").innerText =
    `Total: ${tasks.length} | Completed: ${completed}`;
}

// ====== RENDER TASKS ======
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.done) span.classList.add("completed");

    // mark complete
    span.onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    // edit task
    const editBtn = document.createElement("button");
    editBtn.innerText = "✏️";
    editBtn.onclick = () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    // delete task
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.append(span, editBtn, deleteBtn);
    list.appendChild(li);
  });

  updateCounter();
}

// ====== ADD TASK ======
function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({ text: input.value, done: false });
  input.value = "";
  document.getElementById("suggestions").innerHTML = "";
  saveTasks();
  renderTasks();
}

// ====== AI-LIKE SUGGESTIONS ======
const aiSuggestions = {
  study: ["Revise notes", "Practice coding", "Read textbook"],
  exercise: ["Morning walk", "Yoga", "Stretching"],
  health: ["Drink water", "Sleep early", "Meditation"],
  project: ["Push code to GitHub", "Write README", "Fix bugs"]
};

const input = document.getElementById("taskInput");
const suggestionBox = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const value = input.value.toLowerCase();
  suggestionBox.innerHTML = "";

  if (value.length === 0) return;

  for (let key in aiSuggestions) {
    if (value.includes(key)) {
      aiSuggestions[key].forEach(task => {
        const div = document.createElement("div");
        div.className = "suggestion";
        div.innerText = task;

        div.onclick = () => {
          input.value = task;
          suggestionBox.innerHTML = "";
        };

        suggestionBox.appendChild(div);
      });
    }
  }
});

// ====== INITIAL LOAD ======
renderTasks();
