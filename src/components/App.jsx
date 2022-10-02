import { Component } from 'react';
import { Box } from './common/Box';
import { nanoid } from 'nanoid';
import { ContactForm } from './PhonebookForm/ContactForm ';
import { ContactList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  addContact = ({ firstName, tel }) => {
    const contact = {
      id: nanoid(),
      name: firstName,
      number: tel,
    };
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toUpperCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toUpperCase().includes(normalizedFilter)
    );

    return (
      <Box display="flex" flexDirection="column" ml="20px">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <ContactList contacts={visibleContacts} />
      </Box>
    );
  }
}
