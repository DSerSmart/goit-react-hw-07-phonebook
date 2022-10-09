import { Component } from 'react';
import { Box } from './common/Box';
import { nanoid } from 'nanoid';
import { ContactForm } from './PhonebookForm/ContactForm ';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    this.setState({ contacts: parsedContacts });
  }
  addContact = ({ firstName, tel }) => {
    const contact = {
      id: nanoid(),
      name: firstName,
      number: tel,
    };
    const isContact = this.state.contacts.filter(contact =>
      contact.name.includes(firstName)
    );
    if (isContact.length) {
      alert(`${firstName} is alredy in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  handelFilter = filterText => {
    this.setState(prevState => ({
      filter: filterText,
    }));
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toUpperCase();
    const visibleContacts = contacts.filter(({ name }) =>
      name.toUpperCase().includes(normalizedFilter)
    );

    return (
      <Box display="flex" flexDirection="column" ml="20px">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter onChange={this.handelFilter} />
        <ContactList
          contacts={!filter ? contacts : visibleContacts}
          onButtomClick={this.deleteContact}
        />
      </Box>
    );
  }
}
