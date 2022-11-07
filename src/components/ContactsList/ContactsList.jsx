import { Button } from '../ContactsList';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { deleteOneContact } from 'redux/contactSlice';
import { getFilter } from 'redux/filterSlice';
import { getContacts } from 'redux/contactSlice';

export const ContactsList = () => {
  const contacts = useSelector(getContacts).contacts;
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return visibleContacts.map(({ id, name, number }) => (
    <li key={id}>
      {name}: {number}
      <Button type="button" onClick={() => dispatch(deleteOneContact(id))}>
        Delete
      </Button>
    </li>
  ));
};
