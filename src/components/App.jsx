import { Box } from './common/Box';
import { nanoid } from 'nanoid';
import { ContactForm } from './PhonebookForm/ContactForm ';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (!contacts.length) {
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ firstName, tel }) => {
    const isContact = contacts.filter(contact =>
      contact.name.includes(firstName)
    );
    if (isContact.length) {
      alert(`${firstName} is alredy in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: firstName,
      number: tel,
    };
    setContacts(state => [contact, ...state]);
  };

  const handelFilter = filterText => {
    setFilter(filterText);
    console.log(filter);
  };

  const deleteContact = id => {
    const newContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newContacts);
  };
  const normalizedFilter = filter.toUpperCase();
  const visibleContacts = contacts.filter(({ name }) =>
    name.toUpperCase().includes(normalizedFilter)
  );

  return (
    <Box display="flex" flexDirection="column" ml="20px">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={handelFilter} />
      <ContactList contacts={visibleContacts} onButtomClick={deleteContact} />
    </Box>
  );
};
