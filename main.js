import { getConfig } from './assets/scripts/config.js'; 
import setUserProfile from './assets/scripts/profile.js';
import setProjectList from './assets/scripts/projects.js';
import { Message, Http } from './assets/scripts/utilities.js';

async function init() {
  const config = await getConfig();
  if (!config) {
    showErrorMessage(`Failed to load data: No config found`);
    return;
  }
  const user = await getUserFromGitHub(config);
  if (!user) {
    showErrorMessage(`Failed to load data: No user found`);
    return;
  }
  const repoList = await getRepoList(config);
  if (!repoList) {
    showErrorMessage(`Failed to load data: No repository information found`);
    return;
  }

  setUserProfile(user, config);
  setProjectList(repoList, config);
}


/**
 * Gets the user details from github
 * @param {ConfigurationObject} config
 * @returns {GitHubUser}
 */
async function getUserFromGitHub(config) {
  try {
    const user = await Http.get(`${config.GitHubApiUrl}/users/${config.GitHubUsername}`);
    return user;
  } catch (err) {
    Message.error('Failed to set user data');
  }
}

/**
 * Gets the list of public repositories from github and call 
 * setProject list to render the list to UI
 * @param {ConfigurationObject} config 
 * @returns {GitHubRepository[]}
 */
 async function getRepoList(config) {
  try {
    const repoList = await Http.get(`${config.GitHubApiUrl}/users/${config.GitHubUsername}/repos?type=owner`);
    return repoList;
  } catch (e) {
    Message.error('Failed to set project list');
  }
}

function showErrorMessage(message = '') {
  const configErrorPlaceholder = getElement('.config-error-placeholder');
  if (!configErrorPlaceholder) { return; }
  configErrorPlaceholder.innerHTML = message;
}

init();