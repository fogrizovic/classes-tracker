export default class StorageService {
  static CLASSES_LIST_KEY = "course_classes_list";

  static getClassesList() {
    const result = localStorage.getItem(this.CLASSES_LIST_KEY);
    return result ? JSON.parse(result) : [];
  }

  static storeClassesList(classesList) {
    const classesString = JSON.stringify(classesList);
    localStorage.setItem(this.CLASSES_LIST_KEY, classesString);
  }

  static getClassItemById(id) {
    const classesList = this.getClassesList();
    return classesList.find((classItem) => classItem.id === id);
  }

  static removeClassFromListById(id) {
    let classesList = this.getClassesList();
    classesList = classesList.filter((item) => item.id != id);
    this.storeClassesList(classesList);
  }
}
