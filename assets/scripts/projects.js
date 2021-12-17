import {setFilterFunction} from './filters.js';

let projects = [];

setFilterFunction(filterProjects, projects);

function filterProjects(filteredProjects) {
  projects = filteredProjects;
}