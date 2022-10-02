import { Contact } from './ContactsList.styled';

export const ContactList = ({ contacts, onButtomClick }) => {
  return (
    <ul>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact key={id}>
            {name} {number}
            <button onClick={() => onButtomClick(id)}>Delete</button>
          </Contact>
        );
      })}
    </ul>
  );
};
