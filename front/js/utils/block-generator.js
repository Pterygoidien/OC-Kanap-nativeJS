export const blockGenerator = element => {
  const { type, attributes } = element;
  const DOMElement = document.createElement(type);

  for (const attribute in attributes) {
    DOMElement.setAttribute(attribute, attributes[attribute]);
  }
  return DOMElement;
};

export const generateAndAppend = (element, parent) => {
  const DOMElement = blockGenerator(element);
  parent.appendChild(DOMElement);
};
