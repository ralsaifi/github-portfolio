import {Http, Message} from './utilities.js';
import {getElements, createElem, setHTML, setAttribute, appendElement} from './html-helpers.js';

/**
 * Gets the user details from github and call setUserInfo with the github user
 * @param {ConfigurationObject} config
 */
async function getUserFromGitHub(config) {
  try {
    const username = config.GitHubUsername;
    const user = await Http.get(`https://api.github.com/users/${username}`);
    if (!user) return;
    setUserInfo(user, config);
    setSocialLinks(config);
    setGeneralLinks(config);
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
  const titleElems = getElements(config.placeholders.title);
  const usernameElems = getElements(config.placeholders.username);
  const bioElems = getElements(config.placeholders.bio);
  const profileImageElems = getElements(config.placeholders.profileImage);

  setHTML(titleElems, user.name);
  setHTML(usernameElems, user.login);
  setAttribute(usernameElems, 'href', user.html_url);
  setHTML(bioElems, user.bio);

  const imageElem = createElem('img', {src: user.avatar_url});
  appendElement(profileImageElems, imageElem);

  setUserStats(user, config);
}

/**
 * Gets the stats from the configuration object, build the html for the them, and append them to the stats placeholder
 * @param {GitHubUser} user 
 * @param {ConfigurationObject} config 
 * @returns 
 */
function setUserStats(user, config) {
  if (!Object.keys(config.stats).length) return;
  const statsPlaceholderElems = getElements(config.placeholders.stats);
  let htmlString = '';
  for (const stat of config.stats) {
    // stat eg: {"name": "Repositories", "propertyName": "public_repos", "fontawesomeIcon": "fa-list-ul"}
    htmlString += `<div class="flex space-between">
      <span><i class="fas ${stat.fontawesomeIcon}"></i> ${stat.name}</span>
      <span class="repo-count-placeholder">${user[stat.propertyName]}</span>
    </div>`;
  }

  setHTML(statsPlaceholderElems, htmlString);
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
  const socialLinksElems = getElements(config.placeholders.socialLinks);
  if (!socialLinksElems) return;
  setHTML(socialLinksElems, '');
  for (const name in socialMedia) {
    const linkElem = createElem('a', {target: '_new', href: socialMedia[name]}, name);
    appendElement(socialLinksElems, linkElem)
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
  const navLinksElems = getElements(config.placeholders.navLinks);
  if (!navLinksElems.length) return;
  setHTML(navLinksElems, '');
  for (let item of navLinks) {
    const linkElem = createElem('a', {target: '_new', href: item.link}, item.name);
    appendElement(navLinksElems, linkElem);
  }
}


export default getUserFromGitHub;