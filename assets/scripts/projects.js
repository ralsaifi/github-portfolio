import { Http, Message } from './utilities.js';
import { getElements, setHTML, addEvent } from './html-helpers.js';

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
    const projectListPlaceholder = getElements(config.placeholders.projectsContainer);
    const filterByTitlePlaceholder = getElements(config.placeholders.filterByTitle);
    setProjectList(repoList, projectListPlaceholder);
    setFilters(repoList, projectListPlaceholder, filterByTitlePlaceholder);
  } catch (e) {
    Message.error('Failed to set project list');
  }
}

/**
 * Render a list of cards to UI using the information in repoList 
 * @param {GitHubRepository[]} repoList 
 * @param {Node} projectListPlaceholder 
 */
function setProjectList(repoList, projectListPlaceholder) {
  if (!projectListPlaceholder) return;
  const htmlString = getReposHtml(repoList);
  setHTML(projectListPlaceholder, htmlString);
}

/**
 * Construct the html to be used in frontend containing repository information
 * @param {GitHubRepository[]} repo 
 * @returns string
 */
function getReposHtml(repoList) {
  let htmlString = '';
  if (!repoList.length)
    htmlString += `<h2 class="text-center">No Projects found :(</h2>`;
  else 
    for (const repo of repoList)
      htmlString += `<div class="project white-bg round-16 p-20 standard-shadow mb-16">
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

function setFilters(repoList, projectListPlaceholder, filterByTitlePlaceholder) {
  addEvent(filterByTitlePlaceholder, 'keyup', filterProjectsByTitle.bind(this, repoList, projectListPlaceholder))
}

function filterProjectsByTitle(repoList, projectListPlaceholder, {target}) {
  const filteredList = repoList.filter(repo => repo.name.includes(target.value));
  setProjectList(filteredList, projectListPlaceholder);
}

export default getProjectList;