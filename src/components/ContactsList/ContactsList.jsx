import { Contact } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getVisibleContacts } from 'redux/selectors';
import { removeContact } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();

  const deleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const visibleContacts = useSelector(getVisibleContacts);
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
