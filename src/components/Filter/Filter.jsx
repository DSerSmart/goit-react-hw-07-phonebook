import { Form, Formik, ErrorMessage } from 'formik';
import { InputFilter } from './Filter.styled';

const initialValues = {
  filter: '',
};

export const Filter = ({ onChange }) => {
  const handleOnChange = event => {
    const { value: filter } = event.target;
    onChange(filter);
  };
  return (
    <Formik initialValues={initialValues}>
      <Form onChange={handleOnChange}>
        <label htmlFor="filter">Find contact by Name</label>
        <InputFilter name="filter" type="text" />
        <ErrorMessage name="filter" component="div" />
      </Form>
    </Formik>
  );
};
