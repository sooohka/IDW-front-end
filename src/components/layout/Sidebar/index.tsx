import React, { useContext } from "react";
import CategoryContext from "../../../utils/contexts/CategoryContext";
import Text from "../../common/Text";
import * as S from "./Style";

interface UlType {
  title: string;
  list: Category[];
}
const Ul: React.FC<UlType> = ({ title, list }) => (
  <S.List>
    <Text bold fontSize='heading'>
      {title}
    </Text>
    <S.Divider />
    {list.map((li) => (
      <S.List key={li.id}>
        <Text fontSize='strongBody'>{li.name}</Text>
      </S.List>
    ))}
  </S.List>
);

const Sidebar = () => {
  const { categories } = useContext(CategoryContext);
  const sortList = [
    { name: "인기순", id: 1 },
    { name: "오래된 날짜순", id: 2 },
  ];
  return (
    <S.Sidebar>
      <Ul title='카테고리' list={categories} />
      <Ul title='정렬' list={sortList} />
    </S.Sidebar>
  );
};

export default Sidebar;
