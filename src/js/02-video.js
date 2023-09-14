// IMPORTAM LIBRARIILE NPM
import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

// SELECTAM din HTML IFRAME
const iframe = document.querySelector('iframe');

// SE CREAZA O INSTANTA IFRAMEPLAYER PENTRU A CONTROLA VIDEO DIN IFRAME
const iframePlayer = new Player(iframe);

// DEFINIM O CONSTANTA CARE SE MA NUMI VIDEOPLAYER-CURENT-TIME
const PLAYBACK_TIME_KEY = 'videoplayer-current-time';

// VERIFICAM IN LOCALSTORAGE DACA EXISTA DEJA O KEY CU VALOARE PE CARE O VOM RETURNA DACA NU PUNEM 0
const currentTime = localStorage.getItem(PLAYBACK_TIME_KEY)
  ? localStorage.getItem(PLAYBACK_TIME_KEY)
  : 0;

//   AFISEZ TIMPUL CURENT DIN LOCAL STORAGE
console.log(currentTime);

// FACEM O FUNCTIE CARE PRIMESTE UN EVENT(TIMEUPDATE) SI SETEAZA TIMPUL IN LOCAL STORAGE IN SECUNDE
function setCurrentTimeInLocalStorage(event) {
  localStorage.setItem(PLAYBACK_TIME_KEY, event.seconds);
}

//FACEM IN LISTENER CARE apeleaza functia de mai sus la cel mult 1000 ms/1s
iframePlayer.on('timeupdate', Throttle(setCurrentTimeInLocalStorage, 1000));

// LISTENER CARE SETEAZA IN LOCAL STORAGE TIMPUL CURENT
iframePlayer.setCurrentTime(currentTime);
