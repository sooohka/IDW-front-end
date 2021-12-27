import React, { useContext } from "react";
import styled from "styled-components";
import CategoryContext from "../../utils/contexts/CategoryContext";
import Text from "../common/Text";

const StyledSidebar = styled.div`
  height: 100%;
`;

const StyledList = styled.li`
  margin: 1.5rem 0 0 0;
  &:last-child {
    margin: 1.5rem 0 5rem 0;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 0.6rem solid black;
`;

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
`;

interface UlType {
  title: string;
  list: Category[];
}
const Ul: React.FC<UlType> = ({ title, list }) => (
  <StyledUl>
    <Text bold fontSize='heading'>
      {title}
    </Text>
    <Divider />
    {list.map((li) => (
      <StyledList key={li.id}>
        <Text fontSize='strongBody'>{li.name}</Text>
      </StyledList>
    ))}
  </StyledUl>
);

const Sidebar = () => {
  const { categories } = useContext(CategoryContext);
  const sortList = [
    { name: "인기순", id: 1 },
    { name: "오래된 날짜순", id: 2 },
  ];
  return (
    <StyledSidebar>
      <Ul title='카테고리' list={categories} />
      <Ul title='정렬' list={sortList} />
    </StyledSidebar>
  );
};

export default Sidebar;
