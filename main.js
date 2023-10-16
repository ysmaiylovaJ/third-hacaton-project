const movies = [];
const titleMovie = document.getElementById("title");
const urlImageMovie = document.getElementById("image-url");
const ratingMovie = document.getElementById("rating");
const url = " http://ec2-52-59-255-156.eu-central-1.compute.amazonaws.com:5500/api/v1/movies";
let editButton;
const movieList = document.getElementById("movie-list");
const updateBtn = document.getElementById("update-movie");
const openModalButton = document.getElementById("openModalBtn");
const background = document.getElementById("background");
const cancelModalBtn = document.getElementById("cancel");
const addMovieButton = document.getElementById("add-movie");
const createMovieHandler = (movie) => {
const { title, id, rating, imageUrl } = movie;
const li = document.createElement("li");
li.classList.add("movie-element");
li.id = id;
const imageContainer = document.createElement("div");
imageContainer.classList.add("movie-element__image");
const infoContainer = document.createElement("div");
infoContainer.classList.add("movie-element__info");
const imageNode = document.createElement("img");
imageNode.setAttribute("src", imageUrl);
const titleNode = document.createElement("h2");
titleNode.innerText = title;
titleNode.style.color = 'white'
const ratingNode = document.createElement("p");
ratingNode.innerText = `${rating}/5 stars`;
const deleteButton = document.createElement("button");
deleteButton.className = "btn btn--danger";
deleteButton.textContent = "Delete";
editButton = document.createElement("button");
editButton.className = "btn btn--danger";
editButton.textContent = "Edit";
imageContainer.appendChild(imageNode);
infoContainer.appendChild(titleNode);
infoContainer.appendChild(ratingNode);
li.appendChild(imageContainer);
li.appendChild(infoContainer);
infoContainer.appendChild(deleteButton);
infoContainer.appendChild(editButton);
movieList.appendChild(li);
const deleteKey = () => {
deleteData(id);
};
ditButton.addEventListener("click", secondModalHandler);
deleteButton.addEventListener("click", () => {
const itemToDelete = document.getElementById(`${id}`);
movieList.removeChild(itemToDelete);
deleteKey();
});
return li;
};
const openModalHandler = () => {
const modal = document.getElementById("add-modal");
modal.classList.add("visible");
const background = document.getElementById("background");
background.classList.add("visible");
addMovieButton.style.display = "block";
updateBtn.style.display = "none";
titleMovie.value = "";
urlImageMovie.value = "";
ratingMovie.value = "";
};
const closeModalHandler = () => {
const modal = document.getElementById("add-modal");
modal.classList.remove("visible");
const background = document.getElementById("background");
background.classList.remove("visible");
};
const addMovieHandler = () => {
const notIdealId = titleMovie.value + new Date().getTime().toString();
const ID = notIdealId.replace(/ /g, " ");
const movie = {
title: titleMovie.value,
imageUrl: urlImageMovie.value,
rating: +ratingMovie.value,
};
closeModalHandler();
let liValue = createMovieHandler(movie);
liValue.addEventListener("click", () => {
liValue.classList.toggle("selected");
});
if (movies.length > 0) {
const entryText = document.getElementById("entry-text");
entryText.style.display = "none";
}
titleMovie.value = "";
urlImageMovie.value = "";
ratingMovie.value = "";
sendMyDate(movie);
};
const secondModalHandler = (event) => {
const movieId = event.target.parentElement.parentElement.getAttribute("id");
const modal = document.getElementById("add-modal");
modal.classList.add("visible");
const background = document.getElementById("background");
background.classList.add("visible");
addMovieButton.style.display = "none";
updateBtn.style.display = "block";
getThisMovieById(movieId);
updateBtn.addEventListener("click", () => {
UpdateBYId(movieId);
closeModalHandler();
});
};
openModalButton.addEventListener("click", openModalHandler);
background.addEventListener("click", closeModalHandler);
cancelModalBtn.addEventListener("click", closeModalHandler);
addMovieButton.addEventListener("click", addMovieHandler);
const sendMyDate = async (cat) => {
const response = await fetch(url, {
method: "POST",
headers: {"Content-type": "application/json",
UserID: "Jibek"
},
body: JSON.stringify(cat),
  });
  const res = await response.json();
  console.log(res);
};


const getThisMovieById = async (id) => {
  const response = await fetch(`${url}/${id}`, {
    headers: {
      "Content-type": "application/json",
      UserID: "Jibek",

      },
  });
  const result = await response.json();
  console.log(result);
  titleMovie.value = result.data.title;
  urlImageMovie.value = result.data.imageUrl;
  ratingMovie.value = result.data.rating;
};


const getAllData = async () => {
  movieList.innerHTML = "";
  let response = await fetch(url, {
    headers: {
      "Content-type": "application/json",
      UserID: "Jibek",

    },
  });
  let result = await response.json();
  result.data.forEach((element) => {
    createMovieHandler(element);
  });
  console.log(result);
};


getAllData();

const deleteData = async (id) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      UserID: "Jibek",

    },
  });
  const result = await response.json();
  console.log(result);
};


const UpdateBYId = async (id) => {
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      UserID: "Jibek",

    },
    body: JSON.stringify({
      title: titleMovie.value,
      imageUrl: urlImageMovie.value,
      rating: +ratingMovie.value,
    }),
  });
  const result = await response.json();
  console.log(result);
  getAllData();
};


 