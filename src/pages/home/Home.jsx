import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getFanLetters } from "../../redux/modules/fanLettersSlice";
import styles from "./Home.module.css";
import ArticleList from "../../components/units/homeComponent/articleList/ArticleList";
import MemberSelect from "../../components/units/homeComponent/memberSelect/MemberSelect";
import SubmitForm from "../../components/units/homeComponent/submitForm/SubmitForm";
import { __getUser } from "../../redux/modules/authSlice";

const Home = () => {
  const [selected, setSelected] = useState("아이네");
  const { fanLetters } = useSelector((state) => state.fanLetters);
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  const dispatch = useDispatch();

  const filteredLetters = fanLetters.filter(
    (letter) => letter.writedTo === selected
  );

  useEffect(() => {
    dispatch(__getFanLetters());
    dispatch(__getUser(accessToken));
  }, []);

  return (
    <>
      <aside className={styles.banner} />
      <MemberSelect selected={selected} setSelected={setSelected} />
      <SubmitForm />
      <ArticleList fanLetters={filteredLetters} />
    </>
  );
};

export default Home;
