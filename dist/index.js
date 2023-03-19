/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/modules/tvmaze.js
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/* harmony default export */ const tvmaze = (getData);

;// CONCATENATED MODULE: ./src/modules/involvement.js
const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
const appID = 'OQCl5yEXf3GxJhpasEHV';

const postLike = async (itemID) => {
  const response = await fetch(`${url}${appID}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: itemID }),
  });
  const post = await response.text();
  return post;
};

const getLikes = async () => {
  const response = await fetch(`${url}${appID}/likes`);
  const likes = await response.json();
  return likes;
};

const postComment = async (_id, _name, _comment) => {
  const response = await fetch(`${url}${appID}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: _id,
      username: _name,
      comment: _comment,
    }),
  });
  const post = await response.text();
  return post;
};

const getComments = async (_id) => {
  const response = await fetch(`${url}${appID}/comments?item_id=${_id}`);
  const comments = await response.json();
  return comments;
};



;// CONCATENATED MODULE: ./src/modules/add-elem.js
// Shorthand function for creating a DOM element
// elem = string, classes = array of string(s), parent = DOM element
const addElem = (elem, classes, parent) => {
  const createdElem = document.createElement(elem);
  if (classes !== undefined) {
    classes.forEach((cl) => createdElem.classList.add(cl));
  }
  parent.appendChild(createdElem);

  return createdElem;
};

/* harmony default export */ const add_elem = (addElem);

;// CONCATENATED MODULE: ./src/modules/popup.js



const clearPopups = () => {
  const popupContainer = document.querySelectorAll('.popup-container');

  if (popupContainer) {
    popupContainer.forEach((e) => {
      e.remove();
    });
  }
};

const updateComments = async (_id, _container) => {
  let comments = await getComments(_id);
  comments = Array.isArray(comments) ? comments : [];

  // Add comments section to the container
  const newContent = document.createElement('div');
  newContent.innerHTML = `
    <div class="comments-current flex-column">
      <h3>Reviews (${comments.length})</h3>
      <div class="comments-all flex-column"></div>
    </div>
    <div class="comments-add flex-column">
      <h3>Add a review</h3>
      <form class="form-add-comment flex-column" action="">
        <input class="input-comment-name" type="text" placeholder="Your name" required>
        <textarea
          class="input-comment-insight"
          placeholder="Your insights"
          rows="6"
          required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>`;

  _container.innerHTML = '';
  _container.appendChild(newContent);

  // Generate current comments
  const commentsAll = document.querySelector('.comments-all');
  if (comments) {
    comments.forEach((comment) => {
      commentsAll.innerHTML += `
        <div class="comment-instance flex-column">
          <h4 class="comment-name">${comment.username}</h4>
          <span class="comment-date">${comment.creation_date}</span>
          <p class="comment-content">${comment.comment}</p>
        </div>`;
    });
  }

  // Add form event listener
  const form = document.querySelector('.form-add-comment');
  const inputName = form.querySelector('.input-comment-name');
  const inputInsight = form.querySelector('.input-comment-insight');

  form.onsubmit = (e) => {
    e.preventDefault();
    postComment(_id, inputName.value, inputInsight.value);

    form.reset();
    setTimeout(() => updateComments(_id, _container), 1000);
  };
};

const showPopup = (_showData, _domRect) => {
  // Clear all other pop-ups if any
  clearPopups();
  // Calculate y position
  const posY = window.pageYOffset + _domRect.y - 50;

  // DOM manipulations
  const main = document.querySelector('main');
  const popupContainer = add_elem('div', ['popup-container'], main);
  popupContainer.style.top = `${posY}px`;

  popupContainer.innerHTML = `
    <div class="popup-close-container"></div>
    <div class="flex-column">
      <h2>${_showData.name}</h2>
      <div class="sub-title flex-row">
        <span>${_showData.premiered.substring(0, 4)}</span>
        <span>&middot;</span>
        <span>${_showData.status}</span>
        <span>&middot;</span>
        <div class="flex-row">
          <span class="material-icons-round icons">star</span>
          <span class="rating">${_showData.rating.average}</span>
          <span>/10</span>
        </div>
      </div>
    </div>
    <img class="popup-img" src="${_showData.image.original}" alt="show thumbnail">
    <div class="genres flex-row"></div>
    <div class="summary">${_showData.summary}</div>
    <hr>
    <div class="comments-container"></div>`;

  // Generate genres
  const genres = document.querySelector('.genres');
  _showData.genres.forEach((genre) => {
    genres.innerHTML += `<div class="tag-genre">${genre}</div>`;
  });

  // Generate comments
  const commentsContainer = document.querySelector('.comments-container');
  updateComments(_showData.id, commentsContainer);

  // Close button event listener
  const popupCloseContainer = document.querySelector('.popup-close-container');
  const popupClose = add_elem('button', ['popup-close'], popupCloseContainer);
  const closeIcon = add_elem('span', ['material-icons-round', 'icons'], popupClose);
  closeIcon.textContent = 'close';

  popupClose.onclick = () => {
    popupContainer.remove();
  };
};

const showPopupEpisodes = (_showData, _domRect) => {
  // Clear all other pop-ups if any
  clearPopups();
  // Calculate y position
  const posY = window.pageYOffset + _domRect.y - 50;

  // DOM manipulations
  const main = document.querySelector('main');
  const popupContainer = add_elem('div', ['popup-container'], main);
  popupContainer.style.top = `${posY}px`;

  popupContainer.innerHTML = `
    <div class="popup-close-container"></div>
    <div class="flex-column">
      <h2>${_showData.name}</h2>
      <div class="sub-title flex-row">
        <div class="flex-row">
          <span class="material-icons-round icons">star</span>
          <span class="rating">${_showData.rating.average}</span>
          <span>/10</span>
        </div>
      </div>
    </div>
    <img class="popup-img" src="${_showData.image.original}" alt="show thumbnail">
    <div class="genres flex-row"></div>
    <div class="summary">${_showData.summary}</div>
    <hr>
    <div class="comments-container"></div>`;

  // Generate comments
  const commentsContainer = document.querySelector('.comments-container');
  updateComments(_showData.id, commentsContainer);

  // Close button event listener
  const popupCloseContainer = document.querySelector('.popup-close-container');
  const popupClose = add_elem('button', ['popup-close'], popupCloseContainer);
  const closeIcon = add_elem('span', ['material-icons-round', 'icons'], popupClose);
  closeIcon.textContent = 'close';

  popupClose.onclick = () => {
    popupContainer.remove();
  };
};



;// CONCATENATED MODULE: ./src/index.js





// Search button
const searchIcon = document.querySelector('#search-btn');
const searchBarContainer = document.querySelector('.search-bar');
const searchCloseBtn = document.querySelector('#search-close-btn');
const menuIcon = document.querySelector('#menu-icon');
const header = document.querySelector('header');
const searchInput = document.querySelector('#search-input');

// Search Bar For Desktop
const isDesktop = window.innerWidth > 768;
window.onresize = () => {
  if (isDesktop && window.innerWidth <= 768) {
    window.location.reload();
  }

  if (!isDesktop && window.innerWidth > 768) {
    window.location.reload();
  }
};

if (window.innerWidth > 768) {
  searchBarContainer.classList.remove('hide');
  menuIcon.classList.remove('hide');
  const menuText = document.createElement('span');
  menuText.style.fontSize = '1.25rem';
  menuText.textContent += 'Menu';
  menuIcon.append(menuText);
  searchCloseBtn.classList.add('hide');
  searchIcon.classList.add('hide');

  // Add Search Icon
  const searchIconDesktopBtn = document.createElement('button');
  searchIconDesktopBtn.setAttribute('type', 'button');
  searchIconDesktopBtn.classList.add('searchIconDesktopBtn');
  const searchIconDesktopSpan = document.createElement('span');
  searchIconDesktopSpan.classList.add('material-icons-round', 'icons');
  searchIconDesktopSpan.textContent = 'search';

  searchIconDesktopBtn.append(searchIconDesktopSpan);
  header.append(searchIconDesktopBtn);
}

// Get Data from TVMAZE API
const rootUrl = 'https://api.tvmaze.com/singlesearch/shows?q=';
const searchResults = document.querySelector('h2');
let query = '';

// Update Likes
const updateLikes = async () => {
  const response = await getLikes();
  document.querySelectorAll('.starCount').forEach((button) => {
    for (let i = 0; i < response.length; i += 1) {
      if (response[i].item_id === Number(button.id)) {
        button.lastChild.textContent = response[i].likes;
      }
    }
  });
};

// Display Cards Dynamically
const cards = document.querySelector('.cards');
const createElement = async (requestURL) => {
  cards.innerHTML = '';
  await tvmaze(requestURL)
    .then((data) => {
      let searchCount = 0;
      const dataArray = data._embedded.episodes;
      dataArray.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('cardItem');
        const divImg = document.createElement('div');
        divImg.classList.add('cardImg');
        divImg.style.backgroundImage = `url(${el.image.original})`;
        const h2 = document.createElement('h2');
        h2.classList.add('cardName');
        h2.textContent = `S${el.season}E${el.number} ${el.name}`;
        const details = document.createElement('p');
        details.classList.add('cardDetails');
        details.innerHTML = `Plot Summary: <br>${el.summary}`;
        const h3 = document.createElement('h3');
        h3.classList.add('cardRuntime');
        h3.textContent = `Runtime: ${el.runtime} mins Rating: ${el.rating.average}`;

        const starContainer = document.createElement('div');
        starContainer.classList.add('starContainer');

        const starRate = document.createElement('span');
        starRate.classList.add('material-icons-round');
        starRate.classList.add('icons');
        starRate.classList.add('starRate');
        starRate.textContent = 'star_rate';

        const starCount = document.createElement('span');
        starCount.classList.add('starCount');
        starCount.setAttribute('id', el.id);
        starCount.textContent = '0';

        const starBorder = document.createElement('span');
        starBorder.classList.add('material-icons-round');
        starBorder.classList.add('icons');
        starBorder.classList.add('starBorder');
        starBorder.textContent = 'star_border';
        starBorder.setAttribute('id', el.id);

        // Like Event
        starBorder.addEventListener('click', () => {
          postLike(el.id);
          starBorder.classList.toggle('liked');
          starCount.setAttribute('disabled', true);
          setTimeout(updateLikes, 1000);
        });

        const cBtn = document.createElement('button');
        cBtn.classList.add('commentBtn');
        cBtn.textContent = 'Comments';
        starContainer.append(starRate, starCount, starBorder);
        div.append(divImg, starContainer, h2, h3, details, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;

        // Pop-up trigger event
        const showData = el;
        div.addEventListener('click', (e) => {
          if (!e.target.matches('.starBorder')) {
            showPopupEpisodes(showData, e.target.closest('.cardItem').getBoundingClientRect());
          }
        });
      });
    });
};

// Search Event - Mobile Version
if (window.innerWidth < 768) {
  searchIcon.onclick = () => {
    searchBarContainer.classList.remove('hide');

    // // Add event listener
    searchCloseBtn.onclick = () => {
      searchBarContainer.classList.add('hide');
    };
  };

  searchInput.oninput = () => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (!searchInput.value) {
          return null;
        }
        searchBarContainer.classList.add('hide');
        query = searchInput.value;
        searchInput.value = '';
        createElement(`${rootUrl}${query}&embed=episodes`);
        updateLikes();
      }
      return null;
    });
  };
}

// Search Event - Desktop Version
if (window.innerWidth > 768) {
  const searchIconDesktopBtn = document.querySelector('.searchIconDesktopBtn');
  searchIconDesktopBtn.onclick = () => {
    if (searchInput.value) {
      query = searchInput.value;
      searchInput.value = '';
      createElement(`${rootUrl}${query}&embed=episodes`);
      updateLikes();
    }
    if (!searchInput.value) {
      return null;
    }
    return null;
  };

  searchInput.oninput = () => {
    window.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (!searchInput.value) {
          return null;
        }
        query = searchInput.value;
        searchInput.value = '';
        createElement(`${rootUrl}${query}&embed=episodes`);
        updateLikes();
      }
      return null;
    });
  };
}

// Default Search On Page Load
const createElementForShows = async (requestURL) => {
  cards.innerHTML = '';
  await tvmaze(requestURL)
    .then((data) => {
      let searchCount = 0;
      data.forEach((el) => {
        const div = document.createElement('div');
        div.classList.add('cardItem');
        const divImg = document.createElement('div');
        divImg.classList.add('cardImg');
        divImg.style.backgroundImage = `url(${el.image.original})`;
        const h2 = document.createElement('h2');
        h2.classList.add('cardName');
        h2.textContent = el.name;

        const starContainer = document.createElement('div');
        starContainer.classList.add('starContainer');

        const starRate = document.createElement('span');
        starRate.classList.add('material-icons-round');
        starRate.classList.add('icons');
        starRate.classList.add('starRate');
        starRate.textContent = 'star_rate';

        const starCount = document.createElement('span');
        starCount.classList.add('starCount');
        starCount.setAttribute('id', el.id);
        starCount.textContent = '0';

        const starBorder = document.createElement('span');
        starBorder.classList.add('material-icons-round');
        starBorder.classList.add('icons');
        starBorder.classList.add('starBorder');
        starBorder.textContent = 'star_border';
        starBorder.setAttribute('id', el.id);

        // Like Event
        starBorder.addEventListener('click', () => {
          postLike(el.id);
          starBorder.classList.toggle('liked');
          starCount.setAttribute('disabled', true);
          setTimeout(updateLikes, 1000);
        });

        const cBtn = document.createElement('button');
        cBtn.classList.add('commentBtn');
        cBtn.textContent = 'Comments';
        starContainer.append(starRate, starCount, starBorder);
        div.append(divImg, starContainer, h2, cBtn);
        cards.append(div);
        searchCount += 1;
        searchResults.textContent = `Search Results (${searchCount})`;

        // Pop-up trigger event
        const showData = el;
        div.addEventListener('click', (e) => {
          if (!e.target.matches('.starBorder')) {
            showPopup(showData, e.target.closest('.cardItem').getBoundingClientRect());
          }
        });
      });
    });
};

window.onload = () => {
  const defaultURL = 'https://api.tvmaze.com/shows';
  createElementForShows(defaultURL);
  setTimeout(updateLikes, 1000);
};

// Homepage Link
const h1 = document.querySelector('h1');
h1.addEventListener('click', () => {
  window.location.reload();
});

// Event listener on the document
// If the click is not on the cardItem and not on the popup-container, clear the popups
document.addEventListener('click', (e) => {
  if (!e.target.closest('.cardItem') && !e.target.closest('.popup-container')) {
    clearPopups();
  }
});

// Mobile Menu Popup
const dropdownMenuContainer = document.querySelector('#dropdown-menu-container');
menuIcon.onclick = () => {
  dropdownMenuContainer.innerHTML = '';

  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobileMenu');
  mobileMenu.style.display = 'block';

  const mobileMenuContainer = document.createElement('div');
  mobileMenuContainer.classList.add('mobileMenuContainer');

  const cancel = document.createElement('span');
  cancel.classList.add('material-icons-round', 'icons', 'cancel');
  cancel.textContent = 'cancel';
  cancel.onclick = () => {
    mobileMenu.style.display = 'none';
  };
  const ul = document.createElement('ul');
  ul.classList.add('list');
  ul.innerHTML = '<li><a href="https://mavericks-db.github.io/capstone02/dist/">Home</a></li><li><a href="https://www.tvmaze.com/api">TvMaze API</a></li><li><a href="https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270">Involvement API</a></li><li><a href="https://github.com/mavericks-db/capstone02">Source Code</a></li>';

  mobileMenuContainer.append(cancel, ul);
  mobileMenu.append(mobileMenuContainer);
  dropdownMenuContainer.append(mobileMenu);
};

// If clicked outside, close the dropdown menu
document.addEventListener('click', (e) => {
  const mobileMenu = document.querySelector('.mobileMenu');
  if (mobileMenu && !e.target.closest('#menu-icon') && !e.target.closest('.mobileMenu')) {
    mobileMenu.style.display = 'none';
  }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVEsRUFBRSxNQUFNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsTUFBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGtCQUFrQjtBQUNoRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsWUFBWTs7QUFFbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksV0FBVztBQUNmO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy90dm1hemUuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9tb2R1bGVzL2ludm9sdmVtZW50LmpzIiwid2VicGFjazovL2NhcHN0b25lMDIvLi9zcmMvbW9kdWxlcy9hZGQtZWxlbS5qcyIsIndlYnBhY2s6Ly9jYXBzdG9uZTAyLy4vc3JjL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vY2Fwc3RvbmUwMi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXREYXRhID0gYXN5bmMgKHVybCkgPT4ge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0YTtcbiIsImNvbnN0IHVybCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy8nO1xuY29uc3QgYXBwSUQgPSAnT1FDbDV5RVhmM0d4SmhwYXNFSFYnO1xuXG5jb25zdCBwb3N0TGlrZSA9IGFzeW5jIChpdGVtSUQpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vbGlrZXNgLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgaXRlbV9pZDogaXRlbUlEIH0pLFxuICB9KTtcbiAgY29uc3QgcG9zdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgcmV0dXJuIHBvc3Q7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHt1cmx9JHthcHBJRH0vbGlrZXNgKTtcbiAgY29uc3QgbGlrZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIHJldHVybiBsaWtlcztcbn07XG5cbmNvbnN0IHBvc3RDb21tZW50ID0gYXN5bmMgKF9pZCwgX25hbWUsIF9jb21tZW50KSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2NvbW1lbnRzYCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBfaWQsXG4gICAgICB1c2VybmFtZTogX25hbWUsXG4gICAgICBjb21tZW50OiBfY29tbWVudCxcbiAgICB9KSxcbiAgfSk7XG4gIGNvbnN0IHBvc3QgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gIHJldHVybiBwb3N0O1xufTtcblxuY29uc3QgZ2V0Q29tbWVudHMgPSBhc3luYyAoX2lkKSA9PiB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7dXJsfSR7YXBwSUR9L2NvbW1lbnRzP2l0ZW1faWQ9JHtfaWR9YCk7XG4gIGNvbnN0IGNvbW1lbnRzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICByZXR1cm4gY29tbWVudHM7XG59O1xuXG5leHBvcnQge1xuICBwb3N0TGlrZSxcbiAgZ2V0TGlrZXMsXG4gIHBvc3RDb21tZW50LFxuICBnZXRDb21tZW50cyxcbn07XG4iLCIvLyBTaG9ydGhhbmQgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgRE9NIGVsZW1lbnRcbi8vIGVsZW0gPSBzdHJpbmcsIGNsYXNzZXMgPSBhcnJheSBvZiBzdHJpbmcocyksIHBhcmVudCA9IERPTSBlbGVtZW50XG5jb25zdCBhZGRFbGVtID0gKGVsZW0sIGNsYXNzZXMsIHBhcmVudCkgPT4ge1xuICBjb25zdCBjcmVhdGVkRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbSk7XG4gIGlmIChjbGFzc2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjbGFzc2VzLmZvckVhY2goKGNsKSA9PiBjcmVhdGVkRWxlbS5jbGFzc0xpc3QuYWRkKGNsKSk7XG4gIH1cbiAgcGFyZW50LmFwcGVuZENoaWxkKGNyZWF0ZWRFbGVtKTtcblxuICByZXR1cm4gY3JlYXRlZEVsZW07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhZGRFbGVtO1xuIiwiaW1wb3J0IGFkZEVsZW0gZnJvbSAnLi9hZGQtZWxlbS5qcyc7XG5pbXBvcnQgeyBwb3N0Q29tbWVudCwgZ2V0Q29tbWVudHMgfSBmcm9tICcuL2ludm9sdmVtZW50LmpzJztcblxuY29uc3QgY2xlYXJQb3B1cHMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvcHVwLWNvbnRhaW5lcicpO1xuXG4gIGlmIChwb3B1cENvbnRhaW5lcikge1xuICAgIHBvcHVwQ29udGFpbmVyLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUucmVtb3ZlKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUNvbW1lbnRzID0gYXN5bmMgKF9pZCwgX2NvbnRhaW5lcikgPT4ge1xuICBsZXQgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50cyhfaWQpO1xuICBjb21tZW50cyA9IEFycmF5LmlzQXJyYXkoY29tbWVudHMpID8gY29tbWVudHMgOiBbXTtcblxuICAvLyBBZGQgY29tbWVudHMgc2VjdGlvbiB0byB0aGUgY29udGFpbmVyXG4gIGNvbnN0IG5ld0NvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbmV3Q29udGVudC5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWN1cnJlbnQgZmxleC1jb2x1bW5cIj5cbiAgICAgIDxoMz5SZXZpZXdzICgke2NvbW1lbnRzLmxlbmd0aH0pPC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1hbGwgZmxleC1jb2x1bW5cIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudHMtYWRkIGZsZXgtY29sdW1uXCI+XG4gICAgICA8aDM+QWRkIGEgcmV2aWV3PC9oMz5cbiAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS1hZGQtY29tbWVudCBmbGV4LWNvbHVtblwiIGFjdGlvbj1cIlwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC1jb21tZW50LW5hbWVcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiWW91ciBuYW1lXCIgcmVxdWlyZWQ+XG4gICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgIGNsYXNzPVwiaW5wdXQtY29tbWVudC1pbnNpZ2h0XCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIllvdXIgaW5zaWdodHNcIlxuICAgICAgICAgIHJvd3M9XCI2XCJcbiAgICAgICAgICByZXF1aXJlZD48L3RleHRhcmVhPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgIDwvZm9ybT5cbiAgICA8L2Rpdj5gO1xuXG4gIF9jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIF9jb250YWluZXIuYXBwZW5kQ2hpbGQobmV3Q29udGVudCk7XG5cbiAgLy8gR2VuZXJhdGUgY3VycmVudCBjb21tZW50c1xuICBjb25zdCBjb21tZW50c0FsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1hbGwnKTtcbiAgaWYgKGNvbW1lbnRzKSB7XG4gICAgY29tbWVudHMuZm9yRWFjaCgoY29tbWVudCkgPT4ge1xuICAgICAgY29tbWVudHNBbGwuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW5zdGFuY2UgZmxleC1jb2x1bW5cIj5cbiAgICAgICAgICA8aDQgY2xhc3M9XCJjb21tZW50LW5hbWVcIj4ke2NvbW1lbnQudXNlcm5hbWV9PC9oND5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbW1lbnQtZGF0ZVwiPiR7Y29tbWVudC5jcmVhdGlvbl9kYXRlfTwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzcz1cImNvbW1lbnQtY29udGVudFwiPiR7Y29tbWVudC5jb21tZW50fTwvcD5cbiAgICAgICAgPC9kaXY+YDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFkZCBmb3JtIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1hZGQtY29tbWVudCcpO1xuICBjb25zdCBpbnB1dE5hbWUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1jb21tZW50LW5hbWUnKTtcbiAgY29uc3QgaW5wdXRJbnNpZ2h0ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtY29tbWVudC1pbnNpZ2h0Jyk7XG5cbiAgZm9ybS5vbnN1Ym1pdCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBvc3RDb21tZW50KF9pZCwgaW5wdXROYW1lLnZhbHVlLCBpbnB1dEluc2lnaHQudmFsdWUpO1xuXG4gICAgZm9ybS5yZXNldCgpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlQ29tbWVudHMoX2lkLCBfY29udGFpbmVyKSwgMTAwMCk7XG4gIH07XG59O1xuXG5jb25zdCBzaG93UG9wdXAgPSAoX3Nob3dEYXRhLCBfZG9tUmVjdCkgPT4ge1xuICAvLyBDbGVhciBhbGwgb3RoZXIgcG9wLXVwcyBpZiBhbnlcbiAgY2xlYXJQb3B1cHMoKTtcbiAgLy8gQ2FsY3VsYXRlIHkgcG9zaXRpb25cbiAgY29uc3QgcG9zWSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIF9kb21SZWN0LnkgLSA1MDtcblxuICAvLyBET00gbWFuaXB1bGF0aW9uc1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwb3B1cENvbnRhaW5lciA9IGFkZEVsZW0oJ2RpdicsIFsncG9wdXAtY29udGFpbmVyJ10sIG1haW4pO1xuICBwb3B1cENvbnRhaW5lci5zdHlsZS50b3AgPSBgJHtwb3NZfXB4YDtcblxuICBwb3B1cENvbnRhaW5lci5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLWNsb3NlLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbHVtblwiPlxuICAgICAgPGgyPiR7X3Nob3dEYXRhLm5hbWV9PC9oMj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzdWItdGl0bGUgZmxleC1yb3dcIj5cbiAgICAgICAgPHNwYW4+JHtfc2hvd0RhdGEucHJlbWllcmVkLnN1YnN0cmluZygwLCA0KX08L3NwYW4+XG4gICAgICAgIDxzcGFuPiZtaWRkb3Q7PC9zcGFuPlxuICAgICAgICA8c3Bhbj4ke19zaG93RGF0YS5zdGF0dXN9PC9zcGFuPlxuICAgICAgICA8c3Bhbj4mbWlkZG90Ozwvc3Bhbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtcm93XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJtYXRlcmlhbC1pY29ucy1yb3VuZCBpY29uc1wiPnN0YXI8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJyYXRpbmdcIj4ke19zaG93RGF0YS5yYXRpbmcuYXZlcmFnZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4+LzEwPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxpbWcgY2xhc3M9XCJwb3B1cC1pbWdcIiBzcmM9XCIke19zaG93RGF0YS5pbWFnZS5vcmlnaW5hbH1cIiBhbHQ9XCJzaG93IHRodW1ibmFpbFwiPlxuICAgIDxkaXYgY2xhc3M9XCJnZW5yZXMgZmxleC1yb3dcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeVwiPiR7X3Nob3dEYXRhLnN1bW1hcnl9PC9kaXY+XG4gICAgPGhyPlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50cy1jb250YWluZXJcIj48L2Rpdj5gO1xuXG4gIC8vIEdlbmVyYXRlIGdlbnJlc1xuICBjb25zdCBnZW5yZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2VucmVzJyk7XG4gIF9zaG93RGF0YS5nZW5yZXMuZm9yRWFjaCgoZ2VucmUpID0+IHtcbiAgICBnZW5yZXMuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwidGFnLWdlbnJlXCI+JHtnZW5yZX08L2Rpdj5gO1xuICB9KTtcblxuICAvLyBHZW5lcmF0ZSBjb21tZW50c1xuICBjb25zdCBjb21tZW50c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21tZW50cy1jb250YWluZXInKTtcbiAgdXBkYXRlQ29tbWVudHMoX3Nob3dEYXRhLmlkLCBjb21tZW50c0NvbnRhaW5lcik7XG5cbiAgLy8gQ2xvc2UgYnV0dG9uIGV2ZW50IGxpc3RlbmVyXG4gIGNvbnN0IHBvcHVwQ2xvc2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2UtY29udGFpbmVyJyk7XG4gIGNvbnN0IHBvcHVwQ2xvc2UgPSBhZGRFbGVtKCdidXR0b24nLCBbJ3BvcHVwLWNsb3NlJ10sIHBvcHVwQ2xvc2VDb250YWluZXIpO1xuICBjb25zdCBjbG9zZUljb24gPSBhZGRFbGVtKCdzcGFuJywgWydtYXRlcmlhbC1pY29ucy1yb3VuZCcsICdpY29ucyddLCBwb3B1cENsb3NlKTtcbiAgY2xvc2VJY29uLnRleHRDb250ZW50ID0gJ2Nsb3NlJztcblxuICBwb3B1cENsb3NlLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgcG9wdXBDb250YWluZXIucmVtb3ZlKCk7XG4gIH07XG59O1xuXG5jb25zdCBzaG93UG9wdXBFcGlzb2RlcyA9IChfc2hvd0RhdGEsIF9kb21SZWN0KSA9PiB7XG4gIC8vIENsZWFyIGFsbCBvdGhlciBwb3AtdXBzIGlmIGFueVxuICBjbGVhclBvcHVwcygpO1xuICAvLyBDYWxjdWxhdGUgeSBwb3NpdGlvblxuICBjb25zdCBwb3NZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgX2RvbVJlY3QueSAtIDUwO1xuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25zXG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIGNvbnN0IHBvcHVwQ29udGFpbmVyID0gYWRkRWxlbSgnZGl2JywgWydwb3B1cC1jb250YWluZXInXSwgbWFpbik7XG4gIHBvcHVwQ29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3Bvc1l9cHhgO1xuXG4gIHBvcHVwQ29udGFpbmVyLmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY2xvc2UtY29udGFpbmVyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImZsZXgtY29sdW1uXCI+XG4gICAgICA8aDI+JHtfc2hvd0RhdGEubmFtZX08L2gyPlxuICAgICAgPGRpdiBjbGFzcz1cInN1Yi10aXRsZSBmbGV4LXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1yb3dcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLWljb25zLXJvdW5kIGljb25zXCI+c3Rhcjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInJhdGluZ1wiPiR7X3Nob3dEYXRhLnJhdGluZy5hdmVyYWdlfTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj4vMTA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGltZyBjbGFzcz1cInBvcHVwLWltZ1wiIHNyYz1cIiR7X3Nob3dEYXRhLmltYWdlLm9yaWdpbmFsfVwiIGFsdD1cInNob3cgdGh1bWJuYWlsXCI+XG4gICAgPGRpdiBjbGFzcz1cImdlbnJlcyBmbGV4LXJvd1wiPjwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJzdW1tYXJ5XCI+JHtfc2hvd0RhdGEuc3VtbWFyeX08L2Rpdj5cbiAgICA8aHI+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRzLWNvbnRhaW5lclwiPjwvZGl2PmA7XG5cbiAgLy8gR2VuZXJhdGUgY29tbWVudHNcbiAgY29uc3QgY29tbWVudHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tbWVudHMtY29udGFpbmVyJyk7XG4gIHVwZGF0ZUNvbW1lbnRzKF9zaG93RGF0YS5pZCwgY29tbWVudHNDb250YWluZXIpO1xuXG4gIC8vIENsb3NlIGJ1dHRvbiBldmVudCBsaXN0ZW5lclxuICBjb25zdCBwb3B1cENsb3NlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNsb3NlLWNvbnRhaW5lcicpO1xuICBjb25zdCBwb3B1cENsb3NlID0gYWRkRWxlbSgnYnV0dG9uJywgWydwb3B1cC1jbG9zZSddLCBwb3B1cENsb3NlQ29udGFpbmVyKTtcbiAgY29uc3QgY2xvc2VJY29uID0gYWRkRWxlbSgnc3BhbicsIFsnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnXSwgcG9wdXBDbG9zZSk7XG4gIGNsb3NlSWNvbi50ZXh0Q29udGVudCA9ICdjbG9zZSc7XG5cbiAgcG9wdXBDbG9zZS5vbmNsaWNrID0gKCkgPT4ge1xuICAgIHBvcHVwQ29udGFpbmVyLnJlbW92ZSgpO1xuICB9O1xufTtcblxuZXhwb3J0IHsgc2hvd1BvcHVwLCBjbGVhclBvcHVwcywgc2hvd1BvcHVwRXBpc29kZXMgfTtcbiIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCBnZXREYXRhIGZyb20gJy4vbW9kdWxlcy90dm1hemUuanMnO1xuaW1wb3J0IHsgZ2V0TGlrZXMsIHBvc3RMaWtlIH0gZnJvbSAnLi9tb2R1bGVzL2ludm9sdmVtZW50LmpzJztcbmltcG9ydCB7IHNob3dQb3B1cCwgY2xlYXJQb3B1cHMsIHNob3dQb3B1cEVwaXNvZGVzIH0gZnJvbSAnLi9tb2R1bGVzL3BvcHVwLmpzJztcblxuLy8gU2VhcmNoIGJ1dHRvblxuY29uc3Qgc2VhcmNoSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtYnRuJyk7XG5jb25zdCBzZWFyY2hCYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJhcicpO1xuY29uc3Qgc2VhcmNoQ2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2VhcmNoLWNsb3NlLWJ0bicpO1xuY29uc3QgbWVudUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS1pY29uJyk7XG5jb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1pbnB1dCcpO1xuXG4vLyBTZWFyY2ggQmFyIEZvciBEZXNrdG9wXG5jb25zdCBpc0Rlc2t0b3AgPSB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2ODtcbndpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IHtcbiAgaWYgKGlzRGVza3RvcCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3NjgpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gIH1cblxuICBpZiAoIWlzRGVza3RvcCAmJiB3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfVxufTtcblxuaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gIHNlYXJjaEJhckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIG1lbnVJY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgY29uc3QgbWVudVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG1lbnVUZXh0LnN0eWxlLmZvbnRTaXplID0gJzEuMjVyZW0nO1xuICBtZW51VGV4dC50ZXh0Q29udGVudCArPSAnTWVudSc7XG4gIG1lbnVJY29uLmFwcGVuZChtZW51VGV4dCk7XG4gIHNlYXJjaENsb3NlQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgc2VhcmNoSWNvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgLy8gQWRkIFNlYXJjaCBJY29uXG4gIGNvbnN0IHNlYXJjaEljb25EZXNrdG9wQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNlYXJjaEljb25EZXNrdG9wQnRuLnNldEF0dHJpYnV0ZSgndHlwZScsICdidXR0b24nKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uY2xhc3NMaXN0LmFkZCgnc2VhcmNoSWNvbkRlc2t0b3BCdG4nKTtcbiAgY29uc3Qgc2VhcmNoSWNvbkRlc2t0b3BTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBzZWFyY2hJY29uRGVza3RvcFNwYW4uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnKTtcbiAgc2VhcmNoSWNvbkRlc2t0b3BTcGFuLnRleHRDb250ZW50ID0gJ3NlYXJjaCc7XG5cbiAgc2VhcmNoSWNvbkRlc2t0b3BCdG4uYXBwZW5kKHNlYXJjaEljb25EZXNrdG9wU3Bhbik7XG4gIGhlYWRlci5hcHBlbmQoc2VhcmNoSWNvbkRlc2t0b3BCdG4pO1xufVxuXG4vLyBHZXQgRGF0YSBmcm9tIFRWTUFaRSBBUElcbmNvbnN0IHJvb3RVcmwgPSAnaHR0cHM6Ly9hcGkudHZtYXplLmNvbS9zaW5nbGVzZWFyY2gvc2hvd3M/cT0nO1xuY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJyk7XG5sZXQgcXVlcnkgPSAnJztcblxuLy8gVXBkYXRlIExpa2VzXG5jb25zdCB1cGRhdGVMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhckNvdW50JykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHJlc3BvbnNlW2ldLml0ZW1faWQgPT09IE51bWJlcihidXR0b24uaWQpKSB7XG4gICAgICAgIGJ1dHRvbi5sYXN0Q2hpbGQudGV4dENvbnRlbnQgPSByZXNwb25zZVtpXS5saWtlcztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLy8gRGlzcGxheSBDYXJkcyBEeW5hbWljYWxseVxuY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMnKTtcbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBhc3luYyAocmVxdWVzdFVSTCkgPT4ge1xuICBjYXJkcy5pbm5lckhUTUwgPSAnJztcbiAgYXdhaXQgZ2V0RGF0YShyZXF1ZXN0VVJMKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBsZXQgc2VhcmNoQ291bnQgPSAwO1xuICAgICAgY29uc3QgZGF0YUFycmF5ID0gZGF0YS5fZW1iZWRkZWQuZXBpc29kZXM7XG4gICAgICBkYXRhQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXJkSXRlbScpO1xuICAgICAgICBjb25zdCBkaXZJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2SW1nLmNsYXNzTGlzdC5hZGQoJ2NhcmRJbWcnKTtcbiAgICAgICAgZGl2SW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5pbWFnZS5vcmlnaW5hbH0pYDtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBoMi5jbGFzc0xpc3QuYWRkKCdjYXJkTmFtZScpO1xuICAgICAgICBoMi50ZXh0Q29udGVudCA9IGBTJHtlbC5zZWFzb259RSR7ZWwubnVtYmVyfSAke2VsLm5hbWV9YDtcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QuYWRkKCdjYXJkRGV0YWlscycpO1xuICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBQbG90IFN1bW1hcnk6IDxicj4ke2VsLnN1bW1hcnl9YDtcbiAgICAgICAgY29uc3QgaDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBoMy5jbGFzc0xpc3QuYWRkKCdjYXJkUnVudGltZScpO1xuICAgICAgICBoMy50ZXh0Q29udGVudCA9IGBSdW50aW1lOiAke2VsLnJ1bnRpbWV9IG1pbnMgUmF0aW5nOiAke2VsLnJhdGluZy5hdmVyYWdlfWA7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG4gICAgICAgIHN0YXJDb3VudC50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICBjb25zdCBzdGFyQm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdzdGFyQm9yZGVyJyk7XG4gICAgICAgIHN0YXJCb3JkZXIudGV4dENvbnRlbnQgPSAnc3Rhcl9ib3JkZXInO1xuICAgICAgICBzdGFyQm9yZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG5cbiAgICAgICAgLy8gTGlrZSBFdmVudFxuICAgICAgICBzdGFyQm9yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHBvc3RMaWtlKGVsLmlkKTtcbiAgICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2VkJyk7XG4gICAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRCdG4nKTtcbiAgICAgICAgY0J0bi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kKHN0YXJSYXRlLCBzdGFyQ291bnQsIHN0YXJCb3JkZXIpO1xuICAgICAgICBkaXYuYXBwZW5kKGRpdkltZywgc3RhckNvbnRhaW5lciwgaDIsIGgzLCBkZXRhaWxzLCBjQnRuKTtcbiAgICAgICAgY2FyZHMuYXBwZW5kKGRpdik7XG4gICAgICAgIHNlYXJjaENvdW50ICs9IDE7XG4gICAgICAgIHNlYXJjaFJlc3VsdHMudGV4dENvbnRlbnQgPSBgU2VhcmNoIFJlc3VsdHMgKCR7c2VhcmNoQ291bnR9KWA7XG5cbiAgICAgICAgLy8gUG9wLXVwIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgY29uc3Qgc2hvd0RhdGEgPSBlbDtcbiAgICAgICAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoJy5zdGFyQm9yZGVyJykpIHtcbiAgICAgICAgICAgIHNob3dQb3B1cEVwaXNvZGVzKHNob3dEYXRhLCBlLnRhcmdldC5jbG9zZXN0KCcuY2FyZEl0ZW0nKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuLy8gU2VhcmNoIEV2ZW50IC0gTW9iaWxlIFZlcnNpb25cbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICBzZWFyY2hJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgc2VhcmNoQmFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcblxuICAgIC8vIC8vIEFkZCBldmVudCBsaXN0ZW5lclxuICAgIHNlYXJjaENsb3NlQnRuLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgIH07XG4gIH07XG5cbiAgc2VhcmNoSW5wdXQub25pbnB1dCA9ICgpID0+IHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGlmICghc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzZWFyY2hCYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBzZWFyY2hJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICAgICAgdXBkYXRlTGlrZXMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0pO1xuICB9O1xufVxuXG4vLyBTZWFyY2ggRXZlbnQgLSBEZXNrdG9wIFZlcnNpb25cbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICBjb25zdCBzZWFyY2hJY29uRGVza3RvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hJY29uRGVza3RvcEJ0bicpO1xuICBzZWFyY2hJY29uRGVza3RvcEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICBjcmVhdGVFbGVtZW50KGAke3Jvb3RVcmx9JHtxdWVyeX0mZW1iZWQ9ZXBpc29kZXNgKTtcbiAgICAgIHVwZGF0ZUxpa2VzKCk7XG4gICAgfVxuICAgIGlmICghc2VhcmNoSW5wdXQudmFsdWUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBzZWFyY2hJbnB1dC5vbmlucHV0ID0gKCkgPT4ge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgaWYgKCFzZWFyY2hJbnB1dC52YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIHNlYXJjaElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoYCR7cm9vdFVybH0ke3F1ZXJ5fSZlbWJlZD1lcGlzb2Rlc2ApO1xuICAgICAgICB1cGRhdGVMaWtlcygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH07XG59XG5cbi8vIERlZmF1bHQgU2VhcmNoIE9uIFBhZ2UgTG9hZFxuY29uc3QgY3JlYXRlRWxlbWVudEZvclNob3dzID0gYXN5bmMgKHJlcXVlc3RVUkwpID0+IHtcbiAgY2FyZHMuaW5uZXJIVE1MID0gJyc7XG4gIGF3YWl0IGdldERhdGEocmVxdWVzdFVSTClcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgbGV0IHNlYXJjaENvdW50ID0gMDtcbiAgICAgIGRhdGEuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjYXJkSXRlbScpO1xuICAgICAgICBjb25zdCBkaXZJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2SW1nLmNsYXNzTGlzdC5hZGQoJ2NhcmRJbWcnKTtcbiAgICAgICAgZGl2SW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtlbC5pbWFnZS5vcmlnaW5hbH0pYDtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgICAgICBoMi5jbGFzc0xpc3QuYWRkKCdjYXJkTmFtZScpO1xuICAgICAgICBoMi50ZXh0Q29udGVudCA9IGVsLm5hbWU7XG5cbiAgICAgICAgY29uc3Qgc3RhckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3N0YXJDb250YWluZXInKTtcblxuICAgICAgICBjb25zdCBzdGFyUmF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhclJhdGUuY2xhc3NMaXN0LmFkZCgnc3RhclJhdGUnKTtcbiAgICAgICAgc3RhclJhdGUudGV4dENvbnRlbnQgPSAnc3Rhcl9yYXRlJztcblxuICAgICAgICBjb25zdCBzdGFyQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHN0YXJDb3VudC5jbGFzc0xpc3QuYWRkKCdzdGFyQ291bnQnKTtcbiAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG4gICAgICAgIHN0YXJDb3VudC50ZXh0Q29udGVudCA9ICcwJztcblxuICAgICAgICBjb25zdCBzdGFyQm9yZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC5hZGQoJ21hdGVyaWFsLWljb25zLXJvdW5kJyk7XG4gICAgICAgIHN0YXJCb3JkZXIuY2xhc3NMaXN0LmFkZCgnaWNvbnMnKTtcbiAgICAgICAgc3RhckJvcmRlci5jbGFzc0xpc3QuYWRkKCdzdGFyQm9yZGVyJyk7XG4gICAgICAgIHN0YXJCb3JkZXIudGV4dENvbnRlbnQgPSAnc3Rhcl9ib3JkZXInO1xuICAgICAgICBzdGFyQm9yZGVyLnNldEF0dHJpYnV0ZSgnaWQnLCBlbC5pZCk7XG5cbiAgICAgICAgLy8gTGlrZSBFdmVudFxuICAgICAgICBzdGFyQm9yZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIHBvc3RMaWtlKGVsLmlkKTtcbiAgICAgICAgICBzdGFyQm9yZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2xpa2VkJyk7XG4gICAgICAgICAgc3RhckNvdW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjQnRuLmNsYXNzTGlzdC5hZGQoJ2NvbW1lbnRCdG4nKTtcbiAgICAgICAgY0J0bi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgICAgIHN0YXJDb250YWluZXIuYXBwZW5kKHN0YXJSYXRlLCBzdGFyQ291bnQsIHN0YXJCb3JkZXIpO1xuICAgICAgICBkaXYuYXBwZW5kKGRpdkltZywgc3RhckNvbnRhaW5lciwgaDIsIGNCdG4pO1xuICAgICAgICBjYXJkcy5hcHBlbmQoZGl2KTtcbiAgICAgICAgc2VhcmNoQ291bnQgKz0gMTtcbiAgICAgICAgc2VhcmNoUmVzdWx0cy50ZXh0Q29udGVudCA9IGBTZWFyY2ggUmVzdWx0cyAoJHtzZWFyY2hDb3VudH0pYDtcblxuICAgICAgICAvLyBQb3AtdXAgdHJpZ2dlciBldmVudFxuICAgICAgICBjb25zdCBzaG93RGF0YSA9IGVsO1xuICAgICAgICBkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmICghZS50YXJnZXQubWF0Y2hlcygnLnN0YXJCb3JkZXInKSkge1xuICAgICAgICAgICAgc2hvd1BvcHVwKHNob3dEYXRhLCBlLnRhcmdldC5jbG9zZXN0KCcuY2FyZEl0ZW0nKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xufTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgY29uc3QgZGVmYXVsdFVSTCA9ICdodHRwczovL2FwaS50dm1hemUuY29tL3Nob3dzJztcbiAgY3JlYXRlRWxlbWVudEZvclNob3dzKGRlZmF1bHRVUkwpO1xuICBzZXRUaW1lb3V0KHVwZGF0ZUxpa2VzLCAxMDAwKTtcbn07XG5cbi8vIEhvbWVwYWdlIExpbmtcbmNvbnN0IGgxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDEnKTtcbmgxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59KTtcblxuLy8gRXZlbnQgbGlzdGVuZXIgb24gdGhlIGRvY3VtZW50XG4vLyBJZiB0aGUgY2xpY2sgaXMgbm90IG9uIHRoZSBjYXJkSXRlbSBhbmQgbm90IG9uIHRoZSBwb3B1cC1jb250YWluZXIsIGNsZWFyIHRoZSBwb3B1cHNcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuY2FyZEl0ZW0nKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLnBvcHVwLWNvbnRhaW5lcicpKSB7XG4gICAgY2xlYXJQb3B1cHMoKTtcbiAgfVxufSk7XG5cbi8vIE1vYmlsZSBNZW51IFBvcHVwXG5jb25zdCBkcm9wZG93bk1lbnVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHJvcGRvd24tbWVudS1jb250YWluZXInKTtcbm1lbnVJY29uLm9uY2xpY2sgPSAoKSA9PiB7XG4gIGRyb3Bkb3duTWVudUNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuICBjb25zdCBtb2JpbGVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG1vYmlsZU1lbnUuY2xhc3NMaXN0LmFkZCgnbW9iaWxlTWVudScpO1xuICBtb2JpbGVNZW51LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIGNvbnN0IG1vYmlsZU1lbnVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbW9iaWxlTWVudUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2JpbGVNZW51Q29udGFpbmVyJyk7XG5cbiAgY29uc3QgY2FuY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBjYW5jZWwuY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtaWNvbnMtcm91bmQnLCAnaWNvbnMnLCAnY2FuY2VsJyk7XG4gIGNhbmNlbC50ZXh0Q29udGVudCA9ICdjYW5jZWwnO1xuICBjYW5jZWwub25jbGljayA9ICgpID0+IHtcbiAgICBtb2JpbGVNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH07XG4gIGNvbnN0IHVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgdWwuY2xhc3NMaXN0LmFkZCgnbGlzdCcpO1xuICB1bC5pbm5lckhUTUwgPSAnPGxpPjxhIGhyZWY9XCJodHRwczovL21hdmVyaWNrcy1kYi5naXRodWIuaW8vY2Fwc3RvbmUwMi9kaXN0L1wiPkhvbWU8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHBzOi8vd3d3LnR2bWF6ZS5jb20vYXBpXCI+VHZNYXplIEFQSTwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cHM6Ly93d3cubm90aW9uLnNvL21pY3JvdmVyc2UvSW52b2x2ZW1lbnQtQVBJLTg2OWU2MGI1YWQxMDQ2MDNhYTZkYjU5ZTA4MTUwMjcwXCI+SW52b2x2ZW1lbnQgQVBJPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vbWF2ZXJpY2tzLWRiL2NhcHN0b25lMDJcIj5Tb3VyY2UgQ29kZTwvYT48L2xpPic7XG5cbiAgbW9iaWxlTWVudUNvbnRhaW5lci5hcHBlbmQoY2FuY2VsLCB1bCk7XG4gIG1vYmlsZU1lbnUuYXBwZW5kKG1vYmlsZU1lbnVDb250YWluZXIpO1xuICBkcm9wZG93bk1lbnVDb250YWluZXIuYXBwZW5kKG1vYmlsZU1lbnUpO1xufTtcblxuLy8gSWYgY2xpY2tlZCBvdXRzaWRlLCBjbG9zZSB0aGUgZHJvcGRvd24gbWVudVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBjb25zdCBtb2JpbGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZU1lbnUnKTtcbiAgaWYgKG1vYmlsZU1lbnUgJiYgIWUudGFyZ2V0LmNsb3Nlc3QoJyNtZW51LWljb24nKSAmJiAhZS50YXJnZXQuY2xvc2VzdCgnLm1vYmlsZU1lbnUnKSkge1xuICAgIG1vYmlsZU1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=