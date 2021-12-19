export class Http {
  static async get(url, headers={}) {
    const response = await fetch(url, {method: 'GET', headers});
    return await Http.parseResponseData(response);
  }

  static async post(url, body={}, headers={}) {
    const response = await fetch(url, {method: 'POST', body, headers});
    return await Http.parseResponseData(response);
  }

  static async delete(url, body={}, headers={}) {
    const response = await fetch(url, {method: 'DELETE', body, headers});
    return await Http.parseResponseData(response);
  }

  static async put(url, body={}, headers={}) {
    const response = await fetch(url, {method: 'PUT', body, headers});
    return await Http.parseResponseData(response);
  }

  static async parseResponseData(response) {
    switch (response.status) {
      case 401:
        Message.error('Failed to load data: Unauthorized');
        return undefined;
      case 404:
        Message.error('Failed to load data: Not found');
        return undefined;
      case 500:
        Message.error('Failed to load data: GitHub Internal error');
        return undefined;
      default:
        return await response.json();
    }
  }
}

export class Message {
  static warning(message) {
    window.alert(message);
  }

  static success(message) {
    window.alert(message);
  }
  
  static error(message) {
    window.alert(message);
  }

  static ask(message) {
    return window.prompt(message);
  }

  static confirm(message) {
    return window.confirm(message);
  }
}