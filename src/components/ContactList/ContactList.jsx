import { useDispatch, useSelector } from "react-redux";
import Contact from '../Contact/Contact';
import { selectFilteredContacts, selectLoading, selectError } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";
import css from '../ContactList/ContactList.module.css';

export default function ContactList () {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) {
    return <p>Loading contacts...</p>;
  }
  
  if (error) {
    return <p>Loading error: {error}</p>;
  }
  
  if (filteredContacts.length === 0) {
    return <p>No contacts found</p>;
  }

  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to delete contact: ${error.message}`);
      });
  };
  
  return (
    <ul className={css.contactCont}>
      {filteredContacts.map(({ id, name, number }) => (
        <Contact
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={() => handleDelete(id)}
        />
      ))}
    </ul>
  );
}
