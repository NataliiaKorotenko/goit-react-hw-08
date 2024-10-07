import { FaUser, FaPhoneVolume } from "react-icons/fa6";
import css from '../Contact/Contact.module.css';

export default function Contact({ name, number, id, deleteContact }) {
  return (
    <li className={css.contactItem}>
      <div className={css.contactWrapper}>
        <div className={css.contactUser}>
          <FaUser className={css.icon} size="16" />
          <p className={css.contactName}>{name}</p>
        </div>
        <div className={css.contactUser}> 
          <FaPhoneVolume className={css.icon} size="16" />
          <p className={css.contactNumber}>{number}</p>
        </div>
      </div>
      <button 
        type="button"
        onClick={() => deleteContact(id)} 
        className={css.deleteButton}
      >
        Delete
      </button>
    </li>
  );
};
