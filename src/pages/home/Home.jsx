import { useEffect, useState } from "react";
import ArticleList from "../../components/units/homeComponent/articleList/ArticleList";
import MemberSelect from "../../components/units/homeComponent/memberSelect/MemberSelect";
import { useDispatch, useSelector } from "react-redux";
import { __getFanLetters } from "../../redux/modules/fanLettersSlice";
import SubmitForm from "../../components/units/homeComponent/submitForm/SubmitForm";

const Home = () => {
  const [selected, setSelected] = useState("아이네");
  const { fanLetters } = useSelector((state) => state.fanLetters);
  const dispatch = useDispatch();

  const filteredLetters = fanLetters.filter(
    (letter) => letter.writedTo === selected
  );

  useEffect(() => {
    dispatch(__getFanLetters());
  }, []);

  return (
    <>
      <MemberSelect selected={selected} setSelected={setSelected} />
      <SubmitForm />
      <ArticleList fanLetters={filteredLetters} />
    </>
  );
};

export default Home;
