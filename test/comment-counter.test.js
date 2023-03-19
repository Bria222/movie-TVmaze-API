/**
 * @jest-environment jsdom
 */

import { showPopup } from '../src/modules/popup.js';
import { getComments } from '../src/modules/involvement.js';
import addElem from '../src/modules/add-elem.js';

const dataCard = {
  id: 1,
  url: 'https://www.tvmaze.com/shows/1/under-the-dome',
  name: 'Under the Dome',
  type: 'Scripted',
  language: 'English',
  genres: [
    'Drama',
    'Science-Fiction',
    'Thriller',
  ],
  status: 'Ended',
  runtime: 60,
  averageRuntime: 60,
  premiered: '2013-06-24',
  ended: '2015-09-10',
  officialSite: 'http://www.cbs.com/shows/under-the-dome/',
  schedule: {
    time: '22:00',
    days: [
      'Thursday',
    ],
  },
  rating: {
    average: 6.5,
  },
  weight: 98,
  network: {
    id: 2,
    name: 'CBS',
    country: {
      name: 'United States',
      code: 'US',
      timezone: 'America/New_York',
    },
    officialSite: 'https://www.cbs.com/',
  },
  webChannel: null,
  dvdCountry: null,
  externals: {
    tvrage: 25988,
    thetvdb: 264492,
    imdb: 'tt1553656',
  },
  image: {
    medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg',
    original: 'https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg',
  },
  summary: "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
  updated: 1631010933,
  _links: {
    self: {
      href: 'https://api.tvmaze.com/shows/1',
    },
    previousepisode: {
      href: 'https://api.tvmaze.com/episodes/185054',
    },
  },
};
const dataComments = {
  json: () => [
    {
      creation_date: '2022-05-17',
      comment: 'Great series!',
      username: 'Yoyo',
    },
    {
      username: 'Benedict',
      comment: 'As you can see from the rating, this one is probably not for everyone. But, if you do like sci-fi thrillers with a spice of drama, this show is for you!',
      creation_date: '2022-05-18',
    },
  ],
};
const pattern = /[0-9]/;

jest.mock('../src/modules/involvement.js');
getComments.fetch = jest.fn().mockResolvedValue(dataComments);

// Create main DOM element
const main = addElem('main', [], document.body);
// Call the show popup function
showPopup(dataCard, main.getBoundingClientRect());

describe('Comments counter test', () => {
  test('comments count from API matches the number of elements created', () => {
    // Get the DOM elements
    const commentsSectionTitle = document.querySelector('.comments-current h3').textContent;
    const commentInstances = document.querySelectorAll('.comment-instance');

    // Extract the number of comments (that's coming from the API)
    const commentCountAPI = parseInt(commentsSectionTitle.split('').filter((e) => pattern.test(e)).join(''), 10);
    // Count the number of comment instances created
    const commentCountInstances = commentInstances.length || 0;

    expect(commentCountAPI)
      .toEqual(commentCountInstances);
  });
});
