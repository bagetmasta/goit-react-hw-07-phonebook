import { Button } from '../ContactsList';
import { useSelector } from 'react-redux/es/exports';
import { getFilter } from 'redux/filterSlice';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from 'redux/contactsApi';

export const ContactsList = () => {
  const { data: contacts } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const filter = useSelector(getFilter);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    visibleContacts &&
    visibleContacts.map(({ id, name, phone }) => (
      <li key={id}>
        {name}: {phone}
        <Button type="button" onClick={() => deleteContact(id)}>
          Delete
        </Button>
      </li>
    ))
  );
};
