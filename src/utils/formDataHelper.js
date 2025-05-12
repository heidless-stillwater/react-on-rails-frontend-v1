import { func } from "prop-types";

export function objectToFormData(
  obj,
  namespace=null,
  formData=new FormData()
) {
  for (let propertyName in obj) {
    if (isValidProperty(obj, propertyName)) {
      const formKey = getFormKey(propertyName, namespace);
      // post[key] = value;
      // post[title] = "Hello World!";
      appendToFormData(
        formData,
        formKey,
        obj[propertyName]
      );
    }
  }
  return formData;
} 

function isValidProperty(obj, propertyName) {
  return (
    Object.prototype.hasOwnProperty.call(obj, propertyName) &&
    obj[propertyName] !== undefined &&
    obj[propertyName] !== null
  );
}

function getFormKey(propertyName, namespace) {
    return namespace ? `${namespace}[${propertyName}]` : propertyName;
}

function appendToFormData(formData, formKey, value) {
  // handle type of 'value': Date || Object != file || Array
  if (value instanceof Date) {
    appendAsDate(formData, formKey, value);
  } else if (isObjectButNotFile(value)) {
    objectToFormData(value, formKey, formData);
  } else {
    formData.append(formKey, value);
  }

function appendAsDate(formData, formKey, value) {
  const date = value.toISOString();
  formData.append(formKey, date);
}

function isObjectButNotFile(value) {
    return (
      typeof value === "object" &&
      // !(value instanceof Blob) &&
      !(value instanceof File)
    );
  }
}

export function formDataToObject(formData) {
  const obj = {};
  for (let key of formData.keys()) {
    obj[key] = formData.get(key);
  }
  return obj;
}

