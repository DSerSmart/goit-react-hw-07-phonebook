import { Form, Formik, ErrorMessage } from 'formik';
import { InputText } from './ContactForm.styled';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts } from 'redux/contactsSlice';
import { selectContacts } from 'redux/selectors';

const initialValues = {
  firstName: '',
  tel: '',
};
const rePhoneNumber =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}?$/;
const reLastName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

const schema = Yup.object().shape({
  firstName: Yup.string()
    .matches(reLastName, 'Last Name is not valid')
    .required('Required'),
  tel: Yup.string()
    .matches(rePhoneNumber, 'Phone number is not valid')
    .required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const handleSubmit = (value, { resetForm }) => {
    const isContact = contacts.filter(contact =>
      contact.name.includes(value.firstName)
    );
    if (isContact.length) {
      alert(`${value.firstName} is alredy in contacts`);
      return;
    }
    dispatch(addContacts(value));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label htmlFor="firstName">Name</label>
        <InputText name="firstName" type="text" />
        <ErrorMessage name="firstName" component="div" />
        <br />
        <label htmlFor="tel">Number</label>
        <InputText name="tel" type="tel" />
        <ErrorMessage name="tel" component="div" />
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};
