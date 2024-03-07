import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');
const saveContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await saveContacts(contacts);

  return deletedContact;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contacts.push(newContact);
  await saveContacts(contacts);
  return newContact;
}

export async function updateContact(contactId, contactData) {
  const newData = contactData;
  const contacts = await listContacts();
  const chosenContact =
    contacts.find((contact) => contact.id === contactId) || null;
  if (chosenContact) {
    for (const key in newData) {
      chosenContact[key] = newData[key];
    }
  }
  await saveContacts(contacts);
  return chosenContact;
}
