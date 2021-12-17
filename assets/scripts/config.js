import {Http, Message} from './utilities.js';
const configPath = '/config.json';
let config;

try {
  config = await Http.get(configPath);
} catch (e) {
  Message.error('Failed to load configuration file');
}

export default config;