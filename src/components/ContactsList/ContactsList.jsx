import { Contact } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getStatusFilter } from 'redux/selectors';
import { deleteContacts } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const statusFilter = useSelector(getStatusFilter);

  const normalizedFilter = statusFilter.toUpperCase();
  const visibleContacts = contacts.filter(({ name }) =>
    name.toUpperCase().includes(normalizedFilter)
  );
  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            {name} {number}
            <button onClick={() => dispatch(deleteContacts(id))}>Delete</button>
          </Contact>
        );
      })}
    </ul>
  );
};
