import { Contact } from './ContactsList.styled';

export const ContactList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            {name} {number}
          </Contact>
        );
      })}
    </ul>
  );
};
