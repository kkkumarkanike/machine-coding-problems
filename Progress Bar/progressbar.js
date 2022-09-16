class ProgressBar {
  constructor(element, initialValue = 0) {
    this.progressValue = element.querySelector(".progress-bar-value");
    this.progressFill = element.querySelector(".progress-bar-fill");

    this.setValue(initialValue);
  }

  setValue(newValue) {
    if (newValue < 0) {
      newValue = 0;
    }
    if (newValue > 100) {
      newValue = 100;
    }
    this.value = newValue;
    this.update();
  }

  update() {
    let percentage = this.value + "%";
    this.progressFill.style.width = percentage;
    this.progressValue.textContent = percentage;
  }
}

let pbv = new ProgressBar(document.querySelector(".progress-bar"), 20);

// window.addEventListener("resize", () => {
//   console.log(window.innerHeight, window.innerWidth);
// });

let myList = document.querySelector("#my-list");
function createListElement(text) {
  let listElement = document.createElement("li");
  listElement.textContent = text;
  return listElement;
}

function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);  
  });
}

const children = [
  createListElement("Orange"),
  createListElement("Mango"),
  createListElement("Apple"),
];

appendChildren(myList, children);

myList.addEventListener("click", (e) => {
  console.log(e.target);
});
