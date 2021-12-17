export class Http {
  static async get(url, payload={}) {
    return (await fetch(url, {method: 'GET', payload})).json();
  }

  static async post(url, payload={}) {
    return (await fetch(url, {method: 'POST', payload})).json();
  }

  static async delete(url, payload={}) {
    return (await fetch(url, {method: 'DELETE', payload})).json();
  }

  static async put(url, payload={}) {
    return (await fetch(url, {method: 'PUT', payload})).json();
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