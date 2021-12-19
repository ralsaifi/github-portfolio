import { Http, Message } from './utilities.js';
import { getElement, getElements, setHTML, setAttribute, appendElement } from './html-helpers.js';

/**
 * Gets the list of public repositories from github and call 
 * setProject list to render the list to UI
 * @param {ConfigurationObject} config 
 * @returns 
 */
async function getProjectList(config) {
  try {
    const repoList = await Http.get(`${config.GitHubApiUrl}/users/${config.GitHubUsername}/repos?type=owner`);
    if (!repoList) {
      Message.error('Failed to set project list: No projects found');
      return;
    }
    setProjectList(repoList, config);
  } catch (e) {
    Message.error('Failed to set project list');
  }
}

/**
 * Render a list of cards to UI using the information in repoList 
 * @param {GitHubRepository[]} repoList 
 * @param {ConfigurationObject} config 
 */
function setProjectList(repoList, config) {
  const projectListPlaceholder = getElements(config.placeholders.projectsContainer);
  if (!projectListPlaceholder) return;
  let htmlString = '';
  for (const repo of repoList) {
    htmlString += getRepoHtml(repo);
  }
  setHTML(projectListPlaceholder, htmlString);
}

/**
 * Construct the html to be used in frontend containing repository information
 * @param {GitHubRepository} repo 
 * @returns string
 */
function getRepoHtml(repo) {
  let htmlString = `<div class="project white-bg round-16 p-20 standard-shadow mb-16">
    <header>
      <h2 class="mt-0 text-thin">${repo.name}</h2>
    </header>
    <div>
      <p>${repo.description ? repo.description : 'no description :('} </p>
    </div>
    <footer class="flex space-between vertical-center">
      <span class="button read-more-btn">Read Full Content</span>
      <a href="${repo.html_url}" target="_new" class="link text-bold">Visit Repository</a>
    </footer>
  </div>`;

  return htmlString;
}

export default getProjectList;