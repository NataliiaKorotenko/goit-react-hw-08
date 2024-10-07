import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from "../../redux/contacts/operations";
import { selectContacts } from '../../redux/contacts/selectors';
import ContactList from '../../components/ContactList/ContactList';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox'; 
import css from "../ContactsPage/ContactsPage.module.css";
import toast, { Toaster } from 'react-hot-toast';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        toast.success("Phonebook loaded successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to load contacts: ${error.message}`);
      });
  }, [dispatch]);

  return (
    <div className={css.contForm}>
      <>
        {loading && <p>Loading contacts...</p>}
        {error && <p>Error loading contacts: {error}</p>} 
        <Toaster />
        <ContactForm />
        <SearchBox /> 
        {items.length > 0 ? (
          <ContactList />
        ) : (
          <p>You don&apos;t have contacts yet!</p>
        )}
      </>
    </div>
  );
};

export default ContactsPage;
