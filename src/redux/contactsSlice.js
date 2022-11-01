import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = [
  { id: 'Iq63MyDa2qhL3hgLafGQ-', name: 'Rosie Simpson', number: '35353535' },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContacts: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare({ firstName, tel }) {
        return {
          payload: {
            id: nanoid(),
            name: firstName,
            number: tel,
          },
        };
      },
    },
    deleteContacts(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
