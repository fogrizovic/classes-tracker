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
            <div id="${classItem.id}" class="classesList__item">
                <div class="item-id">Id: ${classItem.id}</div>
                <div class="item-title">Title: ${classItem.title}</div>
                <div class="item-isCompleted">Completed: ${classItem.isCompleted}</div>
                <iframe class="item-video" src="${classItem.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                <div class="item-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
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
        
      const classItem = event.target.closest(".classesList__item");
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
    url: document.getElementById("url").value,
  };

  classesList.push(obj);

  storeClassesList(classesList);

  displayClassesList();
});

// 1st time display classes
displayClassesList();
addDeleteListeners();
