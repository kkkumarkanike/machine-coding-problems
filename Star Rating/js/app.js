const starsContainer = document.querySelector(".stars-container");
const ratingText = document.querySelector(".rating-text");
let rated = false;

const emptyStar = function (id) {
  const element = document.createElement("span");
  element.innerHTML = "&#9734;";
  element.setAttribute("id", id);
  element.setAttribute("class", "empty-star");
  starsContainer.appendChild(element);
};

for (i = 0; i < 5; i++) {
  emptyStar(i + 1);
}

starsContainer.addEventListener("mouseover", (e) => {
  const target = e.target.id;
  for (let i = 0; i < target; i++) {
    const element = document.getElementById(i + 1);
    if (!element.classList.contains("filled-star")) {
      element.innerHTML = "&#9733;";
      element.classList.add("hover-star");
    }
  }
});

starsContainer.addEventListener("mouseout", (e) => {
  const target = e.target.id;
  for (let i = 0; i < target; i++) {
    const element = document.getElementById(i + 1);
    if (
      element.classList.contains("hover-star") &&
      element.classList.contains("filled-star")
    ) {
     element.classList.remove("hover-star");
      element.innerHTML = "&#9733;";
      
    } else if (element.classList.contains("hover-star")) {
     element.classList.remove("hover-star");
     element.innerHTML = "&#9734";
     element.classList.add("empty-star");
    } else if(element.classList.contains("filled-star")){
      element.innerHTML = "&#9733";
    }
  }
});

starsContainer.addEventListener("click", (e) => {
  const target = e.target.id;

  for (let i = 0; i < target; i++) {
    const element = document.getElementById(i + 1);
    element.innerHTML = "&#9733;";
    element.classList.add("filled-star");
    element.classList.remove("hover-star");
  }
    for (let j = parseInt(target); j < 5; j++) {
      const element = document.getElementById(j + 1);
      element.innerHTML = "&#9734;";
      element.classList.remove("filled-star");
      element.classList.remove("hover-star");
      element.classList.add("empty-star");
    }

  ratingText.innerHTML = `${target}</strong>`;
  rated = true;
});
