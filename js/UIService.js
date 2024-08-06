import StorageService from "./StorageService.js";

export default class UIService {
  static updateClassesElementsIfCompleted() {
    const classesElements = document.querySelectorAll(".classItem");

    classesElements.forEach((classEl) => {
      const elId = Number(classEl.id);
      const classItem = StorageService.getClassItemById(elId);
      if (classItem && classItem.isCompleted) {
        classEl.classList.add("classItem-complete");
      }
    });
  }

  static displayClassesList() {
    const classesListEl = document.getElementById("classes-list");
    classesListEl.innerHTML = "";
    const classesList = StorageService.getClassesList();

    classesList.forEach((classItem) => {

      const completeBtnText = classItem.isCompleted ? "Mark Not Complete" : "Mark Completed"

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
              <button class="complete-btn">${completeBtnText}</button>
            </div>      
          </div>
        `
      );
    });

    this.updateClassesElementsIfCompleted();
    this.addDeleteListeners();
    this.addCompleteListeners()
  }

  static addDeleteListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const classItemEl = event.target.closest(".classItem");
        StorageService.removeClassFromListById(Number(classItemEl.id));
        this.displayClassesList();
      });
    });
  }

  static addCompleteListeners() {
    const completeButtons = document.querySelectorAll(".complete-btn");

    completeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const classItemEl = event.target.closest(".classItem");
        const classItem = StorageService.getClassItemById(Number(classItemEl.id))
        
        classItem.isCompleted = classItem.isCompleted ? false : true

        StorageService.updateClass(classItem);
        this.displayClassesList();
      });
    });
  }

  static initAddClassModal() {
    const addClassModal = document.getElementById("addClassModal");
    const addClassBtn = document.getElementById("addClassBtn");
    const closeModalBtn = document.getElementsByClassName("close")[0];

    addClassBtn.onclick = () => {
      addClassModal.style.display = "block";
    }

    closeModalBtn.onclick = () => {
      addClassModal.style.display = "none";
    }

    window.onclick = (event) => {
      if (event.target == addClassModal) {
        addClassModal.style.display = "none";
      }
    }

    const form = document.getElementById("addClassForm");

    form.addEventListener("submit", event => {
      event.preventDefault();

      const classesList = StorageService.getClassesList();

      const newClass = {
        id: classesList.length + 1,
        title: document.getElementById("title").value,
        isCompleted: false,
        videoId: document.getElementById("videoId").value,
      };

      classesList.push(newClass);
      StorageService.storeClassesList(classesList);
      addClassModal.style.display = "none";
      
      UIService.displayClassesList();
    });
  }

}
