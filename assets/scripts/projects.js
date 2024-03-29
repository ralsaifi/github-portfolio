import { Message } from './utilities.js';
import { getElement, setHTML, addEvent } from './html-helpers.js';

/**
 * Renders the list of repos as project using the approperiate functions
 * @param {GitHubRepository[]} repoList 
 * @param {ConfigurationObject} config 
 * @returns 
 */
function setProjectList(repoList, config) {
  try {
    const projectListPlaceholder = getElement('.projects-container-placeholder');
    if (!projectListPlaceholder) { return; }
    renderProjectList(repoList, projectListPlaceholder);
    setFilters(repoList, config, projectListPlaceholder);
  } catch (e) {
    Message.error('Failed to set project list');
  }
}

/**
 * Render a list of cards to UI using the information in repoList 
 * @param {GitHubRepository[]} repoList 
 * @param {Node} projectListPlaceholder 
 */
function renderProjectList(repoList, projectListPlaceholder) {
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
    for (const repo of repoList) {
      const updatedAt = new Date(repo.updated_at).toDateString();
      htmlString += `<div class="project white-bg round-16 p-20 standard-shadow mb-16">
        <header>
          <h2 class="mt-0 text-thin">${repo.name}</h2>
        </header>
        <div>
          <p>${repo.description ? repo.description : 'no description :('} </p>
        </div>
        <footer class="flex space-between vertical-center">
          <div>
            <span class="button round-20">${repo.language}</span>
            <span class="button round-20">${updatedAt}</span>
          </div>
          <a href="${repo.html_url}" target="_new" class="link text-bold">Visit Repository</a>
        </footer>
      </div>`;
    }
  return htmlString;
}

function setFilters(repoList, config, projectsPlaceholder) {
  const filterForm = getElement('.project-filters-placeholder');
  if (!filterForm) return;
  addEvent(filterForm, 'input', filterProjects.bind(this, repoList, filterForm, projectsPlaceholder));
  const queryFilterPlaceholder = getElement('.filter-by-title-placeholder');
  const languageFilterPlaceholder = getElement('.filter-by-language-placeholder');
  const dateFilterPlaceholder = getElement('.filter-by-date-placeholder');

  queryFilterPlaceholder.innerHTML = setQueryFilterHTML();
  languageFilterPlaceholder.innerHTML = setLanguageFilterHTML(repoList);
  dateFilterPlaceholder.innerHTML = setDateFilterHTML();
}

function filterProjects(repoList, filtersPlaceholder, projectsPlaceholder) {
  const values = new FormData(filtersPlaceholder);
  let filteredList = repoList;
  let filterDateValue;
  for (const [key, value] of values) {
    if (!value.trim()) continue;
    switch(key) {
      case 'query':
        filteredList = filteredList.filter(repo => repo.name
          ?.toLowerCase().includes(value.toLowerCase()) || 
        repo.description
          ?.toLowerCase().includes(value.toLowerCase()));
        break;
      case 'language':
        filteredList = filteredList.filter(repo => repo.language
          ?.toLowerCase().includes(value.toLowerCase()));
        break;
      case 'updatedOn':
        const periodElements = getElement('[name="updatedPeriod"]:checked').value ?? 'on';
        filterDateValue = new Date(value);
        filteredList = filterProjectsByDate(filteredList, filterDateValue, periodElements);
        break;
    }
  }
  renderProjectList(filteredList, projectsPlaceholder);
}

function filterProjectsByDate(repoList, filterDate, datePeriod) {
  console.log(filterDate, datePeriod);
  const filteredList = repoList.filter(repo => {
    const updatedOn = new Date(repo.updated_at);
    if (datePeriod === 'before') 
      return updatedOn < filterDate;
    else if (datePeriod === 'after')
      return updatedOn > filterDate;
    else 
      return updatedOn.toDateString() === filterDate.toDateString();
  });
  return filteredList;
}

function setQueryFilterHTML() {
  return `<input type="text" name="query" class="full-width" placeholder="Search project...">`;
}

function setLanguageFilterHTML(repoList) {
  const languageSet = new Set();
  repoList.forEach(repo => languageSet.add(repo.language));
  let htmlString = '';
  for (const language of languageSet) 
    htmlString += `
      <input type="checkbox" name="language" id="language-${language}"  value="${language}">
      <label for="language-${language}">${language}</label>`;
  return htmlString;
}

function setDateFilterHTML() {
  return `<div class="mb-8">
      <input type="date" name="updatedOn" class="full-width">
    </div>
    <div>
      <input type="radio" id="update-on-option" name="updatedPeriod" value="on" checked>
      <label for="update-on-option">On</label>
      <input type="radio" id="update-before-option" name="updatedPeriod" value="before">
      <label for="update-before-option">Before</label>
      <input type="radio" id="update-after-option" name="updatedPeriod" value="after">
      <label for="update-after-option">After</label>
    </div>`;
}

export default setProjectList;