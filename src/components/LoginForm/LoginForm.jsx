import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectAuthError, selectAuthIsLoggedIn } from "../../redux/auth/selectors"; 
import css from "./LoginForm.module.css";
import Loader from "../Loader/Loader"; // 

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const loading = useSelector(selectAuthIsLoggedIn); 
  const initialValues = {
    email: "",
    password: "",
  };

  const loginFormValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(8, "Password must contain at least 8 characters")
      .max(100, "Password must be less than 100 characters"),
  });

  const handleFormSubmit = (value) => {
    dispatch(logIn(value)).then(() => {
      if (!error) {
        alert("Login successful!");
      }
    });
  };

  return (
    <>
      {loading && <Loader />} 
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        validationSchema={loginFormValidationSchema}
      >
        <Form className={css.form}>
          <label className={css.label}>
            <span>Email</span>
            <Field
              type="text"
              name="email"
              placeholder="testexample@gmail.com"
            />
            <ErrorMessage
              className={css.errorText}
              name="email"
              component="span"
            />
          </label>

          <label className={css.label}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={css.errorText}
              name="password"
              component="span"
            />
          </label>

          <button className={css.submitBtn} type="submit">
            Log In
          </button>
          {error && (
            <p className={css.errorText}>Oops, some error occurred... {error}</p>
          )}
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;

