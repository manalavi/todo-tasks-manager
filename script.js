// script.js for Todo Manager

function loadVariables() {
  const dialogBox = document.querySelector("#createTaskDialogBox");
  const newBlock = document.querySelector(".newblock");
  const inProgressBlock = document.querySelector(".inprogressblock");
  const inReviewBlock = document.querySelector(".inreviewblock");
  const completedBlock = document.querySelector(".completedblock");

  return {
    dialogBox,
    newBlock,
    inProgressBlock,
    inReviewBlock,
    completedBlock,
  };
}

function openModal(edit = false) {
  const { dialogBox } = loadVariables();
  if (edit) {
    document.querySelector("#priority").removeAttribute("disabled");
  } else {
    document.querySelector("#priority").setAttribute("disabled", "");
  }
  dialogBox.showModal();
  openDialogCheck(dialogBox);
}

function openDialogCheck(dialog) {
  if (dialog.open) {
    console.log("Dialog opened");
  } else {
    console.log("Dialog closed");
  }
}

function confirmTaskCreation() {
  const {
    dialogBox,
    newBlock,
    inProgressBlock,
    inReviewBlock,
    completedBlock,
  } = loadVariables();

  const formInputs = document.getElementById("createtaskform").elements;
  const title = formInputs["title"].value;
  const priority = formInputs["priority"].value;
  const description = formInputs["description"].value;

  const id = dialogBox.getAttribute("data-id") || null;
  let taskBlock = null;
  if (id) {
    taskBlock = updateTaskNode(id, title, priority, description);
  } else {
    taskBlock = createTaskNode(title, priority, description);
  }

  switch (priority) {
    case "New":
      newBlock.insertBefore(taskBlock, newBlock.children[0]);
      // console.log("New", priority);
      break;
    case "In progress":
      inProgressBlock.insertBefore(taskBlock, inProgressBlock.children[0]);
      // console.log("progress", priority);
      break;
    case "In review":
      inReviewBlock.insertBefore(taskBlock, inReviewBlock.children[0]);
      // console.log("review", priority);
      break;
    case "Completed":
      completedBlock.insertBefore(taskBlock, completedBlock.children[0]);
      // console.log("completed", priority);
      break;
    default:
      break;
  }

  formInputs["title"].value = "";
  formInputs["priority"].value = "New";
  formInputs["description"].value = "";
  dialogBox.setAttribute("data-id", "");
}

function cancelTaskCreation() {
  const { dialogBox } = loadVariables();
  const formInputs = document.getElementById("createtaskform").elements;
  formInputs["title"].value = "";
  formInputs["priority"].value = "New";
  formInputs["description"].value = "";

  dialogBox.close();
  openDialogCheck(dialogBox);
}

function createTaskNode(title, priority, description) {
  const taskBlock = document.createElement("div");
  const taskTitle = document.createElement("p");
  const taskPriority = document.createElement("span");
  const titleText = document.createTextNode(title);
  const priorityText = document.createTextNode(priority);
  taskTitle.setAttribute("onclick", "editTaskDetails(event);");
  taskTitle.setAttribute("class", "taskTitle");
  taskTitle.appendChild(titleText);
  taskPriority.appendChild(priorityText);
  taskBlock.appendChild(taskTitle);
  taskBlock.appendChild(taskPriority);
  taskBlock.setAttribute("data-title", title);
  taskBlock.setAttribute("data-description", description);
  taskBlock.setAttribute("data-priority", priority);
  taskBlock.setAttribute("class", `${priority}-task`);
  taskBlock.style.cssText = `text-align: center;
  padding: 20px;
  margin: 10px;
  background-color: yellow;`;

  taskBlock.setAttribute("id", new Date().getTime());

  return taskBlock;
}

function editTaskDetails(e) {
  const { dialogBox } = loadVariables();
  const eventObj = e.target;
  const taskTitle = eventObj.innerText;
  const taskId = eventObj.parentNode.id;
  const taskPriority = eventObj.parentNode.dataset.priority;
  const taskDescription = eventObj.parentNode.dataset.description;
  // console.log(e);
  document.querySelector("#priority").removeAttribute("disabled");
  const formInputs = document.getElementById("createtaskform").elements;
  formInputs["title"].value = taskTitle;
  formInputs["priority"].value = taskPriority;
  formInputs["description"].value = taskDescription;
  dialogBox.setAttribute("data-id", taskId);

  openModal(true);
}

function updateTaskNode(id, title, priority, description) {
  // console.log("update", id);
  const taskBlock = document.getElementById(id);
  taskBlock.setAttribute("data-title", title);
  taskBlock.setAttribute("data-priority", priority);
  taskBlock.setAttribute("data-description", description);
  taskBlock.childNodes[0].innerText = title;
  taskBlock.childNodes[1].innerText = priority;

  return taskBlock;
}
