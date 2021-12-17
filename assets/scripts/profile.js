import {Http, Message} from './utilities.js';
import config from './config.js';

try {
  const user = await Http.get(`https://api.github.com/users/${config.GitHubUsername}`);
  if (user) setUserInfo(user);
} catch (err) {
  Message.error('Failed to get user data');
  console.log(err);
}

function setUserInfo(user) {
  const titleElem = document.getElementById('title');
  const usernameElem = document.getElementById('username');
  const bioElem = document.getElementById('bio');
  const profileImageElem = document.getElementById('profile-image');
  const imageElem = document.createElement('img');
  
  titleElem.innerHTML = user.name;
  usernameElem.innerHTML = user.login;
  usernameElem.href = user.html_url;
  bioElem.innerHTML = user.bio;
  imageElem.src = user.avatar_url;
  profileImageElem.appendChild(imageElem);
}
