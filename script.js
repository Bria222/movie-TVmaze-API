function searchShow(query) {
  const url = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(url)
    .then(response => response.json())
    .then((jsonData) => {
      let shows = jsonData.map(element => element.show);
      renderShows(shows);
      document.getElementById("errorMessage").innerHTML = "";
    })
    .catch((error) => {
      document.getElementById("errorMessage").innerHTML = error;
    })
}

function renderShows(shows) {
  const list = document.getElementById("resultsList");
  list.innerHTML = "";
  shows.forEach(show => {
    const element = document.createElement("div");
    const img = document.createElement("img");
    img.classList.add('images');
    const text = document.createElement("span");
    
    img.src = show.image.original;
    text.innerText = show.name;
    
    element.appendChild(text);
    element.appendChild(img);
    
    list.appendChild(element);

  });
}

let searchTimeoutToken = 0;

window.onload = () => {
  const searchFieldElement = document.getElementById("searchField")
  searchFieldElement.onkeyup = (event) => {
    clearTimeout(searchTimeoutToken);
    searchTimeoutToken = setTimeout(() => {
      searchShow(searchFieldElement.value);
    }, 250);

  };
}