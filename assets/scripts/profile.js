import {Message} from './utilities.js';
import {getElement, createElem, setHTML, setAttribute, appendElement} from './html-helpers.js';

/**
 * set user profile using user info and config
 * @param {GitHubUser} user
 * @param {ConfigurationObject} config
 */
function setUserProfile(user, config) {
  try {
    setUserInfo(user, config);
    setSocialLinks(config);
    setGeneralLinks(config);
  } catch (err) {
    Message.error('Failed to set user data');
  }
}

/**
 * Sets the info of the user in the approperiate elements. 
 * Call setSocalMediaLinks and setGeneralLinks method
 * @param {GitHubUser} user 
 * @param {ConfigurationObject} config
 */
function setUserInfo(user, config) {
  const titleElem = getElement('.user-title-placeholder');
  const usernameElem = getElement('.user-username-placeholder');
  const bioElem = getElement('.user-bio-placeholder');
  const profileImageElem = getElement('.user-image-placeholder');

  setHTML(titleElem, user.name);
  setHTML(usernameElem, user.login);
  setAttribute(usernameElem, 'href', user.html_url);
  setHTML(bioElem, user.bio);

  const imageElem = createElem('img', {src: user.avatar_url});
  appendElement(profileImageElem, imageElem);

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
  const statsPlaceholderElem = getElement('.user-stats-placeholder');
  let htmlString = '';
  for (const stat of config.stats) {
    // stat eg: {"name": "Repositories", "propertyName": "public_repos", "fontawesomeIcon": "fa-list-ul"}
    htmlString += `<div class="flex space-between">
      <span><i class="fas ${stat.fontawesomeIcon}"></i> ${stat.name}</span>
      <span class="repo-count-placeholder">${user[stat.propertyName]}</span>
    </div>`;
  }

  setHTML(statsPlaceholderElem, htmlString);
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
  const socialLinksElem = getElement('.social-links-placeholder');
  if (!socialLinksElem) return;
  setHTML(socialLinksElem, '');
  for (const name in socialMedia) {
    const linkElem = createElem('a', {target: '_new', href: socialMedia[name]}, name);
    appendElement(socialLinksElem, linkElem)
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
  const navLinksElem = getElement('.nav-links-placeholder');
  if (!navLinksElem) return;
  setHTML(navLinksElem, '');
  for (let item of navLinks) {
    const linkElem = createElem('a', {target: '_new', href: item.link}, item.name);
    appendElement(navLinksElem, linkElem);
  }
}


export default setUserProfile;