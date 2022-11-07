import { Input } from '../Filter';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { filterContact, getFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const handleChange = e => {
    dispatch(filterContact(e.currentTarget.value));
  };

  return (
    <>
      <p>Find contacts by name</p>
      <Input type="text" onChange={handleChange} value={filter} />
    </>
  );
};
