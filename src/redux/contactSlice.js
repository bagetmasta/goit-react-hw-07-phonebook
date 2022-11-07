import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactSlice = createSlice({
  name: 'contactsList',
  initialState: {
    contacts: [
      { id: 'id-1', name: 'Mukola Trush', number: '777-77-77' },
      { id: 'id-2', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-3', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-4', name: 'Eden Clements', number: '645-17-79' },
    ],
  },
  reducers: {
    addOneContact(state, { payload }) {
      state.contacts = [payload, ...state.contacts];
    },
    deleteOneContact(state, { payload }) {
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
  },
});

const persistConfig = {
  key: 'contacts-list',
  storage,
};

export const contactReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { addOneContact, deleteOneContact } = contactSlice.actions;

// Selectors
export const getContacts = state => state.contactsList;
