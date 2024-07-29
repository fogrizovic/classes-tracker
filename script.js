const CLASSES_LIST_KEY = "course_classes_list";

function getClassesList() {
  let result = localStorage.getItem(CLASSES_LIST_KEY);
  if (result != null) {
    result = JSON.parse(result);
  } else {
    result = [];
  }

  return result;
}

function storeClassesList(classesList) {
  classesString = JSON.stringify(classesList);
  localStorage.setItem(CLASSES_LIST_KEY, classesString);
}

// populate #classes-list element
const classesListEl = document.getElementById("classes-list");

const classesList = getClassesList();

classesList.forEach((classItem) => {
  classesListEl.insertAdjacentHTML(
    "beforeend",
    `
        <div id="${classItem.id}" class="classesList__item">
            <div class="item-title">Title: ${classItem.title}</div>
            <div class="item-isCompleted">Completed: ${classItem.isCompleted}</div>
            <iframe class="item-video" src="${classItem.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <div class="item-actions">
                <button>Edit</button>
                <button>Delete</button>
            </div> 
        </div>
        `
  );
});
