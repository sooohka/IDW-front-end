import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledContent = styled.div`
  padding: 3rem 5rem;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Content = ({ children }) => <StyledContent>{children}</StyledContent>;

Content.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Content;
