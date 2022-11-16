import { Contact } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectStatusFilter } from 'redux/selectors';
import { removeContact } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const statusFilter = useSelector(selectStatusFilter);

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = statusFilter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const visibleContacts = getVisibleContacts();
  return (
    <ul>
      {visibleContacts.map(({ id, name, phone }) => {
        return (
          <Contact key={id}>
            {name} {phone}
            <button onClick={() => deleteContact(id)}>Delete</button>
          </Contact>
        );
      })}
    </ul>
  );
};
