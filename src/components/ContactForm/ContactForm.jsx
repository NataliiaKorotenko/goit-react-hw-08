import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import css from '../ContactForm/ContactForm.module.css';
import toast from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  username: Yup.string().min(3).max(50).required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, "Phone number must be at least 10 digits")
    .required("Number is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    const newContact = {
      name: values.username,
      number: values.number,
    };
    try {
      await dispatch(addContact(newContact)).unwrap();
      actions.resetForm();
      toast.success("Contact added successfully!");
    } catch (error) {
      console.error("Failed to add contact:", error);
      toast.error("Failed to add contact. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{ username: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.inputForm}>
          <label className={css.inputLabel} htmlFor="username">Name</label>
          <Field className={css.inputName} type="text" name="username" id="username" />
          <ErrorMessage className={css.inputMessage} name="username" component="span" />
        </div>
        <div className={css.inputForm}>
          <label className={css.inputLabel} htmlFor="number">Number</label>
          <Field className={css.inputName} type="tel" name="number" id="number" />
          <ErrorMessage className={css.inputMessage} name="number" component="span" />
        </div>
        <button className={css.buttonForm} type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
