let filterFunction;
const filterByNameElem = document.getElementById('filterByName');

filterByNameElem?.addEventListener('keyup', (e) => {
  const value = filterByNameElem.value;
  if (!filtreFunction) { return; }
  filterProjects(filterFunction, projects, value);
});

/**
 * filterProjects: filter projects array using the the value parameter and call filterFunction 
 * with the results of the filter
 * @param {function} filterFunction 
 * @param {array} projects 
 * @param {string} value 
 */
function filterProjects(filterFunction, projects, value) {
  value = value.toLowerCase();
  projects = projects.filter(project => project.name.toLowerCase().includes(value));
  filterFunction(projects);
}

/**
 * set the list of projects and the filterFunctions to be used later
 * @param {function} filterFunc 
 * @param {array} projectList 
 */
export function setFilterFunction(filterFunc, projectList) {
  projects = projectList
  filterFunction = filterFunc;
}