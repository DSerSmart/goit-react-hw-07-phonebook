import { Form, Formik, ErrorMessage } from 'formik';
import { InputFilter } from './Filter.styled';
import PropTypes from 'prop-types';
import { setStatusFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';

const initialValues = {
  filter: '',
};

export const Filter = () => {
  const dispatch = useDispatch();
  const handleOnChange = event => {
    const { value: filter } = event.target;

    dispatch(setStatusFilter(filter));
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

Filter.propTypes = {
  onChange: PropTypes.func,
};
