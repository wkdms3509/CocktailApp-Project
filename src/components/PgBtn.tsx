import styled from "styled-components";
export const PgBtn = styled.button`
  padding: 4px 6px;
  // background-color: ${({ selected }) => (selected ? "#000" : "transparent")};
  color: ${({ selected }) => (selected ? "grey" : "#000")};
  border-bottom: ${({ selected }) => (selected ? "1px solid #fff" : "")};
  // transition: ${({ selected }) => (selected ? "4s ease-in" : "")};
  font-size: 20px;
  // & + & {
  //   margin-left: 4px;
  // }
  // &:disabled {
  //   cursor: default;
  // }
`;
