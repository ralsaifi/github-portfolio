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
    if (projectListPlaceholder) setProjectList(repoList, projectListPlaceholder);
    if (projectListPlaceholder) setFilters(repoList, config, projectListPlaceholder);
      
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
          <span class="button round-20">${repo.language}</span>
          <a href="${repo.html_url}" target="_new" class="link text-bold">Visit Repository</a>
        </footer>
      </div>`;
  return htmlString;
}

function setFilters(repoList, config, projectListPlaceholder) {
  const filtersPlaceholder = getElements(config.placeholders.projectFilters);
  if (!Object.keys(config.filters).length) return;
  let htmlString = '';
  for (const filter of config.filters) {
    console.log(filter);
    htmlString += '<div class="mb-8">';
    switch(filter) {
      case 'title':
        htmlString += '<input type="text" name="title" placeholder="Search project title...">';
        break;
      case 'description':
        htmlString += '<input type="text" name="description" placeholder="Search project description...">';
        break;
      case 'language':
        htmlString += getLanguageFilterHtml(repoList);
        break;
    }
    htmlString += '</div>';
  }
  setHTML(filtersPlaceholder, htmlString);
}

function getLanguageFilterHtml(repoList) {
  const languageSet = new Set();
  let htmlString = '<div>';
  repoList.forEach(repo => languageSet.add(repo.language));
  for (const language of languageSet) 
    htmlString += `
      <input type="checkbox" name="language" id="language-${language}">
      <label for="language-${language}">${language}</label>`;
  htmlString += '</div>';
  return htmlString;
}

function filterProjectsByTitle(repoList, projectListPlaceholder, {target}) {
  const filteredList = repoList.filter(repo => repo.name.includes(target.value));
  setProjectList(filteredList, projectListPlaceholder);
}

export default getProjectList;