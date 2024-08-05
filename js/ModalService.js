import StorageService from './StorageService.js';
import UIService from './UIService.js';

export default class ModalService {
  static initModal() {
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