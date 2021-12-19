import { getConfig } from './assets/scripts/config.js'; 
import getUserProfile from './assets/scripts/profile.js';
import getProjectList from './assets/scripts/projects.js';
import { Message } from './assets/scripts/utilities.js';

async function init() {
  const config = await getConfig();
  if (!config) {
    Message.error('Failed to load data: No config found');
    return;
  }
  getUserProfile(config);
  getProjectList(config);
}

init();