/**
 * @jest-environment jsdom
 */
import countObj from './countFunction.js';

// Sample API Data
// Searched show = Grimm
// Showing 7 episodes
const searchQuery = [
  {
    id: 414,
    url: 'https://www.tvmaze.com/episodes/414/grimm-1x01-pilot',
    name: 'Pilot',
    season: 1,
    number: 1,
    type: 'regular',
    airdate: '2011-10-28',
    airtime: '21:00',
    airstamp: '2011-10-29T01:00:00+00:00',
    runtime: 60,
    rating: {
      average: 8.5,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39286.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39286.jpg',
    },
    summary: "<p>After the mysterious brutal attack of a local college co-ed, Portland homicide Detective Nick Burkhardt discovered he is descendant of an elite line of criminal profilers known as \"Grimms,\" charged with keeping balance between humanity and the mythological creatures of the world. As he tries to hide the dangers of his new found calling from his fiance's, Juliette Silverton, and his partner, Hank Griffin, he becomes ever more entrenched in the ancient rivalries and alliances of the Grimm world. With help from his reluctant confidant, Monroe, a reformed Grimm creature himself, Nick must navigate through the forces of a larger-than-life mythology.</p>",
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/414',
      },
    },
  },
  {
    id: 415,
    url: 'https://www.tvmaze.com/episodes/415/grimm-1x02-bears-will-be-bears',
    name: 'Bears Will Be Bears',
    season: 1,
    number: 2,
    type: 'regular',
    airdate: '2011-11-04',
    airtime: '21:00',
    airstamp: '2011-11-05T01:00:00+00:00',
    runtime: 60,
    rating: {
      average: 7.4,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39287.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39287.jpg',
    },
    summary: '<p>A case of breaking and entering introduces Nick and Hank to a mysterious family whose cultural background blurs the line of right and wrong. Meanwhile, Nick tasks Monroe with safeguarding Aunt Marie</p>',
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/415',
      },
    },
  },
  {
    id: 416,
    url: 'https://www.tvmaze.com/episodes/416/grimm-1x03-beeware',
    name: 'Beeware',
    season: 1,
    number: 3,
    type: 'regular',
    airdate: '2011-11-11',
    airtime: '21:00',
    airstamp: '2011-11-12T02:00:00+00:00',
    runtime: 60,
    rating: {
      average: 8.3,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39288.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39288.jpg',
    },
    summary: '<p>The station is abuzz as Nick and Hank are called to a case where an innocent flash mob results in a gruesome homicide. As Nick delves further into the investigation, he learns more about his unique family history, and finds himself at odds when he and Hank are assigned to protect a dark character from his recent past.</p>',
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/416',
      },
    },
  },
  {
    id: 417,
    url: 'https://www.tvmaze.com/episodes/417/grimm-1x04-lonelyhearts',
    name: 'Lonelyhearts',
    season: 1,
    number: 4,
    type: 'regular',
    airdate: '2011-11-18',
    airtime: '21:00',
    airstamp: '2011-11-19T02:00:00+00:00',
    runtime: 60,
    rating: {
      average: 6.8,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39289.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39289.jpg',
    },
    summary: "<p>After investigating a strange cluster of female deaths and disappearances, Nick sends Monroe undercover to get a whiff of a hypnotic suspect. In the meantime, a stranger shows up looking to avenge the death of his friend at the hands of a Grimm, but he'll have to get past Captain Renard.</p>",
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/417',
      },
    },
  },
  {
    id: 418,
    url: 'https://www.tvmaze.com/episodes/418/grimm-1x05-danse-macabre',
    name: 'Danse Macabre',
    season: 1,
    number: 5,
    type: 'regular',
    airdate: '2011-12-08',
    airtime: '22:00',
    airstamp: '2011-12-09T03:00:00+00:00',
    runtime: 60,
    rating: {
      average: 7.1,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39290.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39290.jpg',
    },
    summary: "<p>Nick and Hank's investigation of a dead high school teacher leads them to the school's outcast, Roddy. Nick realizes that there's more to Roddy than meets the eye, and enlists Monroe's help to get through to the troubled teenager before he exacts revenge on the students who wronged him. Meanwhile, Nick learns that his presence is beginning to affect the creature world.</p>",
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/418',
      },
    },
  },
  {
    id: 419,
    url: 'https://www.tvmaze.com/episodes/419/grimm-1x06-the-three-bad-wolves',
    name: 'The Three Bad Wolves',
    season: 1,
    number: 6,
    type: 'regular',
    airdate: '2011-12-09',
    airtime: '21:00',
    airstamp: '2011-12-10T02:00:00+00:00',
    runtime: 60,
    rating: {
      average: 8.2,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39291.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39291.jpg',
    },
    summary: "<p>Nick is called to a suspected arson case, which exposes a longstanding family feud that brings Monroe face-to-face with characters from his troubled past. While Monroe wrestles with restraining his wild side, it's up to Nick to keep everything from going up in flames.</p>",
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/419',
      },
    },
  },
  {
    id: 420,
    url: 'https://www.tvmaze.com/episodes/420/grimm-1x07-let-your-hair-down',
    name: 'Let Your Hair Down',
    season: 1,
    number: 7,
    type: 'regular',
    airdate: '2011-12-16',
    airtime: '21:00',
    airstamp: '2011-12-17T02:00:00+00:00',
    runtime: 60,
    rating: {
      average: 8.2,
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_landscape/15/39292.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/15/39292.jpg',
    },
    summary: '<p>Mysterious homicide deep in the woods leads to Nick and Hank reopening a long-aborted missing persons case. When Nick suspects this abducted person might be a feral creature, he asks Monroe to help remind this wild child of her human nature.</p>',
    _links: {
      self: {
        href: 'https://api.tvmaze.com/episodes/420',
      },
    },
  },
];

const createElement = () => {
  document.body.innerHTML = '<h2>Search Results()</h2><main class="cards"></main>';
  const searchResults = document.querySelector('h2');
  const cards = document.querySelector('.cards');
  const dataArray = searchQuery;
  let searchCount = 0;
  dataArray.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add('cardItem');
    const divImg = document.createElement('div');
    divImg.classList.add('cardImg');
    divImg.style.backgroundImage = `url(${el.image.original})`;
    const h1 = document.createElement('h1');
    h1.classList.add('cardName');
    h1.textContent = `S${el.season}E${el.number} ${el.name}`;
    const details = document.createElement('p');
    details.classList.add('cardDetails');
    details.innerHTML = `Plot Summary: <br>${el.summary}`;
    const h2 = document.createElement('h2');
    h2.classList.add('cardRuntime');
    h2.textContent = `Runtime: ${el.runtime} mins Rating: ${el.rating.average}`;

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
    // starBorder.addEventListener('click', () => {
    //   postLike(el.show.id);
    //   starBorder.classList.toggle('liked');
    //   starCount.setAttribute('disabled', true);
    //   setTimeout(updateLikes, 1000);
    // });

    const cBtn = document.createElement('button');
    cBtn.classList.add('commentBtn');
    cBtn.textContent = 'Comments';
    starContainer.append(starRate, starCount, starBorder);
    div.append(divImg, starContainer, h1, h2, details, cBtn);
    cards.append(div);
    searchCount += 1;
    searchResults.textContent = `Search Results (${searchCount})`;
  });
};

// Test for Counting of Search Results or Card Item Objects ('div')
describe('To test number of search results', () => {
  test('Test the functionality of countObj function', () => {
    expect(countObj(searchQuery)).toBe(7);
  });

  test('Count number of divs with a class of cardItem', () => {
    createElement();
    expect(document.querySelectorAll('.cardItem').length).toEqual(7);
  });

  test('Result for countObj function is equal to the number of divs with a class of cardItem', () => {
    createElement();
    const count = countObj(searchQuery);
    expect(count === document.querySelectorAll('.cardItem').length).toBe(true);
  });

  test('Search Results content should reflect the number of divs created', () => {
    const searchResults = document.querySelector('h2');
    createElement();
    expect(searchResults.textContent).toBe('Search Results (7)');
  });
});