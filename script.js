const CLASSES_LIST_KEY = "course_classes_list";

function getClassesList() {
  let result = localStorage.getItem(CLASSES_LIST_KEY);
  return result ? JSON.parse(result) : [];
}

function storeClassesList(classesList) {
  classesString = JSON.stringify(classesList);
  localStorage.setItem(CLASSES_LIST_KEY, classesString);
}

function displayClassesList() {
  const classesListEl = document.getElementById("classes-list");
  classesListEl.innerHTML = "";

  const classesList = getClassesList();

  classesList.forEach((classItem) => {
    classesListEl.insertAdjacentHTML(
      "beforeend",
      `
        <div id="${classItem.id}" class="classItem">
          <div class="item-info">
            <div class="item-id">Id: ${classItem.id}</div>
            <div class="item-title">Title: ${classItem.title}</div>
            <div class="item-description">Description: ${classItem.description}</div>
            <div class="item-isCompleted">Completed: ${classItem.isCompleted}</div>
          </div>
          <img class="item-img" src="http://img.youtube.com/vi/${classItem.videoId}/maxresdefault.jpg">
          <div class="item-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">Mark Complete</button>
          </div>      
        </div>
      `
    );
  });
}

function removeClassFromListById(id) {
  let classesList = getClassesList();
  classesList = classesList.filter((item) => item.id != id);
  storeClassesList(classesList);
}

// Delete class
function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        
      const classItem = event.target.closest(".classItem");
      removeClassFromListById(Number(classItem.id));

      displayClassesList();
    });
  });
}

// Add class
var form = document.getElementById("addClassForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let classesList = getClassesList();

  let obj = {
    id: classesList.length + 1,
    title: document.getElementById("title").value,
    isCompleted: false,
    videoId: document.getElementById("videoId").value,
  };

  classesList.push(obj);

  storeClassesList(classesList);

  displayClassesList();
});

// 1st time display classes
displayClassesList();
addDeleteListeners();
