import { items } from "./data.js";

const listEle = document.getElementById("list-container");
const formEle = document.getElementById("item-form");
const placeInput = document.getElementById("place");
const locationInput = document.getElementById("location");
const planInput = document.getElementById("plan");
const imageInput = document.getElementById("image");
const dateInput = document.getElementById("date");
const linkInput = document.getElementById("link");

function addItem(e) {
  e.preventDefault();

  if (!formEle.dataset.editIndex) {
    const place = placeInput.value;
    const location = locationInput.value;
    const plan = planInput.value;
    const image = imageInput.value;
    const date = dateInput.value;
    const link = linkInput.value;

    items.push({
      place: place,
      location: location,
      plan: plan,
      image: image,
      date: date,
      link: link,
    }); 
  } else {
    const index = parseInt(formEle.dataset.editIndex);
    items[index] = {
      place: placeInput.value,
      location: locationInput.value,
      plan: planInput.value,
      image: imageInput.value,
      date: dateInput.value,
      link: linkInput.value,
    };

    formEle.removeAttribute("data-edit-index"); 
  }

  renderList(); 
  formEle.reset(); 
}

function editItem(index) {
  const item = items[index];
  placeInput.value = item.place;
  locationInput.value = item.location;
  planInput.value = item.plan;
  imageInput.value = item.image;
  dateInput.value = item.date;
  linkInput.value = item.link;

  formEle.dataset.editIndex = index; 
}

function deleteItem(index) {
  items.splice(index, 1);
  renderList(); 
}

function renderList() {
  listEle.innerHTML = items
    .map(
      (item) => `
    <div class="card">
      <img src=${item.image} alt=${item.place} />
      <div class="card-content">
        <div class="card-header">
          <div class="card-header-text">
            <a href={item.link} target="_blank">
              ${item.place}
            </a>
            <p>${item.location}</p>
          </div>
          <div class="card-header-actions">
            <button class="edit-button">
              <img src="/assets/edit-icon.svg" alt="edit" />
            </button>
            <button class="delete-button">
              <img src="/assets/trash-icon.svg" alt="delete" />
            </button>
          </div>
        </div>
        <p>${item.plan}</p>
        <p class="card-footer">${item.date}</p>
      </div>
    </div>
    `
    )
    .join("");

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => deleteItem(index));
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button, index) => {
    button.addEventListener("click", () => editItem(index));
  });
}

renderList(); 
formEle.addEventListener("submit", addItem);