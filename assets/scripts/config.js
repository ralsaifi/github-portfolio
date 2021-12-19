import {Http, Message} from './utilities.js';
const configPath = '/config.json';

export async function getConfig() {
  try {
    const config = await Http.get(configPath);
    return config;
  } catch (e) {
    Message.error('Failed to load configuration file');
    return undefined;
  }
}