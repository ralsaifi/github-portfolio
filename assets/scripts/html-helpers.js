
/**
 * Look in the document for the element with the CSS selector (selector). 
 * return the node element found
 * @param {string} selector 
 * @returns Node
 */
export function getElement(selector) {
  return document.querySelector(selector);
}

/**
 * Look in the document for the elements with the CSS selector (seletor). 
 * return NodeList
 * @param {string} selector 
 * @returns NodeList
 */
export function getElements(selector) {
  return document.querySelectorAll(selector);
}

/**
 * assign the html string (htmlString) to the NodeList or node passed (elems)
 * @param {NodeList | Node} elems 
 * @param {string} htmlString 
 * @returns 
 */
 export function setHTML(elems, htmlString) {
  if (elems && !elems.length && elems.ELEMENT_NODE)
    elems.innerHTML = htmlString;
  else if (elems && elems.length)
    for (const elem of elems) 
      elem.innerHTML = htmlString;
}

/**
 * Assign the attribute (attrName) with value (value) to the node list or node passed
 * (elems)
 * @param {NodeList | Node} elems 
 * @param {string} attrName 
 * @param {string} value 
 */
export function setAttribute(elems, attrName, value) {
  if (elems && !elems.length && elems.ELEMENT_NODE) 
    elems.setAttribute(attrName, value);
  else if (elems && elems.length)
    for (const elem of elems) 
      elem.setAttribute(attrName, value);
}

/**
 * Create a node element, asign it the attributes in attrs and append any html (htmlString) to it. 
 * Returns the created node
 * @param {string} elemName 
 * @param {AttributeObject} attrs 
 * @param {string} htmlString 
 * @returns Node
 */
export function createElem(elemName, attrs={}, htmlString='') {
  const elem = document.createElement(elemName);
  for (const attr in attrs)
    elem.setAttribute(attr, attrs[attr]);
  if (htmlString) 
    elem.innerHTML = htmlString;
  return elem;
}

/**
 * Appends childElem node into parentElems. If parentElems is a node list, it loops 
 * through them and clone the childElem node into them
 * @param {NodeList | Node} parentElems 
 * @param {Node} childElem 
 */
export function appendElement(parentElems, childElem) {
  if (parentElems && !parentElems.length && parentElems.ELEMENT_NODE) {
    const clonedChild = childElem.cloneNode(true);
    parentElems.appendChild(clonedChild);
  } else if (parentElems && parentElems.length)
    for (const parentElem of parentElems) {
      const clonedChild = childElem.cloneNode(true);
      parentElem.appendChild(clonedChild);
    }
}

/**
 * Attach the event listener (eventName) to the element (elems) and call function (func) 
 * when the event fires
 * @param {NodeList | Node} elems 
 * @param {string} eventName 
 * @param {Function} func
 */
export function addEvent(elems, eventName, func) {
  if (elems && !elems.length && elems.ELEMENT_NODE) 
    elem.addEventListener(eventName, func);
  else if (elems && elems.length) 
    for (const elem of elems)
      elem.addEventListener(eventName, func);
}