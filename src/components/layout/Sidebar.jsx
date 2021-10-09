import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Text from "../common/Text";
import { theme } from "../../style/theme";
import CategoryContext from "../../utils/contexts/CategoryContext";

const sidebarWidth = "20rem";

const StyledSidebar = styled.div`
  width: ${sidebarWidth};
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

const Ul = ({ title, list }) => (
  <StyledUl>
    <Text bold fontSize={theme.fonts.heading} text={title} />
    <Divider />
    {list.map((li) => (
      <StyledList key={li.id}>
        <Text text={li.name} fontSize={theme.fonts.strongBody} />
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
      <Ul title="카테고리" list={categories} />
      <Ul title="정렬" list={sortList} />
    </StyledSidebar>
  );
};

export default Sidebar;

Ul.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
