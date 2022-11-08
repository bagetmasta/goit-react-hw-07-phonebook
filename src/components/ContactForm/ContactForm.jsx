import { useState } from 'react';
import { Form, Button } from '../ContactForm';
import { nanoid } from 'nanoid';
import { useAddContactMutation, useGetContactsQuery } from 'redux/contactsApi';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { data: contacts } = useGetContactsQuery();
  const [addContact] = useAddContactMutation();

  const handleSubmit = e => {
    e.preventDefault();

    addOneContact({ name, phone });
    setName('');
    setPhone('');
  };

  const addOneContact = ({ name, phone }) => {
    const oneContact = {
      id: nanoid(),
      name,
      phone,
    };

    checkForSameName(oneContact);
  };

  const checkForSameName = oneContact => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === oneContact.name.toLowerCase()
      )
    ) {
      alert(`${oneContact.name} is already in contacts`);

      return;
    }

    addContact(oneContact);
  };

  const handleChange = e => {
    e.currentTarget.type === 'text'
      ? setName(e.currentTarget.value)
      : setPhone(e.currentTarget.value);
  };

  return (
    <>
      <p>Name</p>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <p>Number</p>
        <input
          value={phone}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
};
