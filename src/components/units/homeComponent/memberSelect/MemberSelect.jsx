import styles from "./MemberSelect.module.css";
import { MEMBERS } from "../../../../constant/member";

const MemberSelect = ({ selected, setSelected }) => {
  const clickMember = (event) => {
    setSelected(event.currentTarget.id);
  };
  return (
    <nav className={styles.navigation}>
      <ul className={styles.memberBox}>
        {MEMBERS.map((member) => (
          <li
            key={member}
            id={member}
            className={`${styles.list} ${
              member === selected && styles[selected]
            }`}
            onClick={clickMember}
          >
            {member}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MemberSelect;
