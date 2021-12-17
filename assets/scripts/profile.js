import {Http, Message} from './utilities.js';
import {createElem, setHTML, setAttribute, appendElement} from './html-helpers.js';
import configuration from './config.js';

/**
 * Gets the user details from github and call setUserInfo with the github user
 */
async function getUserFromGitHub() {
  try {
    const username = configuration.GitHubUsername;
    const user = await Http.get(`https://api.github.com/users/${username}`);
    if (!user) return;
    setUserInfo(user, configuration);
    setSocialLinks(configuration);
    setGeneralLinks(configuration);
  } catch (err) {
    Message.error('Failed to get user data');
    console.log(err);
  }
}

/**
 * Sets the info of the user in the approperiate elements. 
 * Call setSocalMediaLinks and setGeneralLinks method
 * @param {GitHubUser} user 
 * @param {ConfigurationObject} config
 */
function setUserInfo(user, config) {
  const titleElems = document.querySelectorAll(config.placeholders.title);
  const usernameElems = document.querySelectorAll(config.placeholders.username);
  const bioElems = document.querySelectorAll(config.placeholders.bio);
  const profileImageElems = document.querySelectorAll(config.placeholders.profileImage);

  setHTML(titleElems, user.name);
  setHTML(usernameElems, user.login);
  setAttribute(usernameElems, 'href', user.html_url);
  // setHTML(titleElems, user.name);
  setHTML(bioElems, user.bio);

  const imageElem = createElem('img', {src: user.avatar_url});
  appendElement(profileImageElems, imageElem);
}

/**
 * Creates links for the social media links in the configuration and 
 * append them to the element with the class 'social-media-links'
 * @param {ConfigurationObject} config
 * @returns null
 */
function setSocialLinks(config) {
  const socialMedia = config.socialLinks ?? {};
  if (!Object.keys(socialMedia).length) return;
  const socialLinksElem = document.querySelector(config.placeholders.socialLinks);
  if (!socialLinksElem) return;
  socialLinksElem.innerHTML = '';
  for (const name in socialMedia) {
    const linkElem = document.createElement('a');
    linkElem.target = '_new';
    linkElem.innerHTML = name;
    linkElem.href = socialMedia[name];
    socialLinksElem.appendChild(linkElem);
  }
}

/**
 * Creates links for the navigation links in the configuration.
 * Append the links to the element with the claSS'nav-links'
 * @returns null
 */
function setGeneralLinks(config) {
  const navLinks = config.navLinks ?? [];
  if (!navLinks.length) { return; }
  const navLinksElem = document.querySelector(config.placeholders.navLinks);
  if (!navLinksElem) return;
  navLinksElem.innerHTML = '';
  for (let item of navLinks) {
    const linkElem = document.createElement('a');
    linkElem.target = '_new';
    linkElem.innerHTML = item.name;
    linkElem.href = item.link;
    navLinksElem.appendChild(linkElem);
  }
}


export default getUserFromGitHub;