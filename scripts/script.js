// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.getElementsByTagName("h1")[0].addEventListener('click', () => {
  router.setState({ page: "journal" }, false);
});

document.querySelector("[src='settings.svg']").addEventListener('click', () => {
  router.setState({ page: "settings"}, false);
});

window.addEventListener('popstate', (e) => {
  if (history.state !== null) {
    router.setState(history.state, true);
  } else {
    router.setState({ page: "journal" }, true);
  }
});

document.addEventListener('click', function(e){
  var num = 0;
  if(e.target.tagName=="JOURNAL-ENTRY"){

    var entries = document.getElementsByTagName("JOURNAL-ENTRY");

    for (var i = 0; i < entries.length; i++) {
      if (entries[i] === e.target) {
        num = i+1;
      }
    }

    var entry = e.target.entry;
    router.setState(num);
  }
})