const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");


function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

/**
 *
 * @param {string} contactId 
 * @param {function} callback 
 */

function getContactById(contactId, callback) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.log("Błąd odczytu pliku:", err);
      return callback(err, null);
    }

    const contacts = JSON.parse(data);
    const foundContact = contacts.find((contact) => contact.id === contactId);
    if (foundContact) {
      return callback(null, foundContact);
    } else {
      return callback("Kontakt o podanym ID nie istnieje.", null);
    }
  });
}

/**
 * 
 *
 * @param {string} contactId 
 * @param {function} callback 
 */

function removeContact(contactId, callback) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return callback(err);
    }
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      contacts.splice(index, 1);
      fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
        if (err) {
          console.error("Błąd zapisu pliku:", err);
          return callback(err);
        }
        return callback(null);
      });
    } else {
      return callback("Kontakt o podanym ID nie istnieje.", null);
    }
  });
}

/**
 * 
 *
 * @param {string} name 
 * @param {string} email 
 * @param {string} phone 
 * @param {function} callback 
 */

function addContact(name, email, phone, callback) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Błąd odczytu pliku:", err);
      return callback(err);
    }
    const contacts = JSON.parse(data);
    const newContact = {
      id: generateContactId(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
      if (err) {
        console.error("Błąd zapisu pliku:", err);
        return callback(err);
      }
      return callback(null, newContact);
    });
  });
}
function generateContactId() {
  return uuidv4(); 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
