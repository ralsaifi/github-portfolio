import {Http, Message} from './utilities.js';
import config from './config.js';

/**
 * Gets the user details from github and call setUserInfo with the github user
 */
async function getUserFromGitHub() {
  try {
    const user = await Http.get(`https://api.github.com/users/${config.GitHubUsername}`);
    if (!user) return;
    setUserInfo(user);
  } catch (err) {
    Message.error('Failed to get user data');
    console.log(err);
  }
}

/**
 * Sets the info of the user in the approperiate elements. 
 * Call setSocalMediaLinks and setGeneralLinks method
 * @param {GitHubUser} user 
 */
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

  setSocialMediaLinks();
  setGeneralLinks();
}

/**
 * Creates links for the social media links in the configuration and 
 * append them to the element with the class 'social-media-links'
 * @returns null
 */
function setSocialMediaLinks() {
  const socialMedia = config.socialMediaLinks ?? {};
  if (!Object.keys(socialMedia).length) { return; }
  const socialMediaLinksElem = document.querySelector('.social-media-links');
  socialMediaLinksElem.innerHTML = '';
  for (const name in socialMedia) {
    const linkElem = document.createElement('a');
    linkElem.target = '_new';
    linkElem.innerHTML = name;
    linkElem.href = socialMedia[name];
    socialMediaLinksElem.appendChild(linkElem);
  }
}

/**
 * Creates links for the navigation links in the configuration.
 * Append the links to the element with the claSS'nav-links'
 * @returns null
 */
function setGeneralLinks() {
  const navLinks = config.navLinks ?? [];
  if (!navLinks.length) { return; }
  const navLinksElem = document.querySelector('.nav-links');
  navLinksElem.innerHTML = '';
  for (let item of navLinks) {
    const linkElem = document.createElement('a');
    linkElem.target = '_new';
    linkElem.innerHTML = item.name;
    linkElem.href = item.link;
    navLinksElem.appendChild(linkElem);
  }

}

/**
 * createLinkForSocialMedia: Create an anchor element and uses the name and value 
 * passed to construct the href attribute. Return the anchor element created
 * @param {string} name 
 * @param {string} value 
 * @returns Node
 */
function createLinkForSocialMedia(name, value) {
  const linkElem = document.createElement('a');
  linkElem.target = '_new';
  linkElem.innerHTML = name;
  linkElem.href = value;

  return linkElem;
}

export default getUserFromGitHub;