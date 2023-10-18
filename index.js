const contacts = require("./db/contacts"); // Import modułu contacts.js

// Wywołanie funkcji listContacts, która wyświetli listę kontaktów
contacts.listContacts();

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  const contacts = require("./db/contacts");

  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      if (!id) {
        console.error("Please provide the contact ID using the --id option.");
      } else {
        contacts.getContactById(id, (err, contact) => {
          if (err) {
            console.error(err);
          } else {
            console.log(contact);
          }
        });
      }
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error(
          "Please provide all contact details using --name, --email, and --phone options."
        );
      } else {
        contacts.addContact(name, email, phone, (err, newContact) => {
          if (err) {
            console.error(err);
          } else {
            console.log("New contact added:", newContact);
          }
        });
      }
      break;

    case "remove":
      if (!id) {
        console.error("Please provide the contact ID using the --id option.");
      } else {
        contacts.removeContact(id, (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Contact with ID", id, "has been removed.");
          }
        });
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
