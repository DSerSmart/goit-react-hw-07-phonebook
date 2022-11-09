import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from './operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};
const extraActions = [addContact, fetchContacts, removeContact];
const getActions = type => extraActions.map(extraAction => extraAction[type]);

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const fetchContactsReducer = (state, action) => {
  state.items = action.payload;
};

const addContactReducer = (state, action) => {
  state.items.push(action.payload);
};

const removeContactReducer = (state, action) => {
  const index = state.items.findIndex(
    contact => contact.id === action.payload.id
  );
  state.items.splice(index, 1);
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, fetchContactsReducer)
      .addCase(addContact.fulfilled, addContactReducer)
      .addCase(removeContact.fulfilled, removeContactReducer)
      .addMatcher(isAnyOf(...getActions('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getActions('pending')), handlePending)
      .addMatcher(isAnyOf(...getActions('rejected')), handleRejected),
});

export const contactsReducer = contactsSlice.reducer;
