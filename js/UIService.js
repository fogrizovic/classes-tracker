import StorageService from "./StorageService.js";

export default class UIService {
  static updateClassesElementsIfCompleted() {
    const classesElements = document.querySelectorAll(".classItem");

    classesElements.forEach((classEl) => {
      const elId = Number(classEl.id);
      const classItem = StorageService.getClassItemById(elId);
      if (classItem && classItem.isCompleted) {
        classEl.classList.add("classItem-complete");
        const itemTitleEl = classEl.querySelector(".item-title");
        itemTitleEl.insertAdjacentHTML("beforeend", "<span>&#9989;</span>");
      }
    });
  }

  static displayClassesList() {
    const classesListEl = document.getElementById("classes-list");
    classesListEl.innerHTML = "";
    const classesList = StorageService.getClassesList();

    classesList.forEach((classItem) => {
      classesListEl.insertAdjacentHTML(
        "beforeend",
        `
          <div id="${classItem.id}" class="classItem">
            <div class="item-id">${classItem.id}</div>
            <div class="item-info">
              <div class="item-title">Title: ${classItem.title}</div>
              <div class="item-description">Description: ${classItem.description}</div>
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

    this.updateClassesElementsIfCompleted();
    this.addDeleteListeners();
  }

  static addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const classItem = event.target.closest(".classItem");
        StorageService.removeClassFromListById(Number(classItem.id));
        this.displayClassesList();
      });
    });
  }
}
