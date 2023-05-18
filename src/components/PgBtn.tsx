import styled from "styled-components";

export const PgBtn = styled.button`
  width: 2.3rem;
  border: 1px solid #666;
  border-radius: 8px;
  margin: 0;
  padding: 8px;
  background: ${({ selected }: { selected: boolean }) =>
    selected ? "#000" : "transparent"};
  color: ${({ selected }: { selected: boolean }) => (selected ? "#fff" : "")};

  &:hover {
    color: #fff;
    background: #000;
  }
`;

export const PageNum = styled.button`
  width: 2.3rem;
  border: 1px solid #666;
  border-radius: 8px;
  margin: 0 1px;
  padding: 8px;
  background: ${({ selected }: { selected: boolean }) =>
    selected ? "#000" : "transparent"};
  color: ${({ selected }: { selected: boolean }) => (selected ? "#fff" : "")};

  &:hover {
    color: #fff;
    background: #000;
  }
`;

export const Button = styled.button`
  width: 2.3rem;
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  font-size: 1rem;
  color: #fff;
  background: #000;

  &:hover {
    background: rgb(115 115 115);
    cursor: pointer;
    // transform: translateY(-2px);
  }

  &[disabled] {
    background: rgb(115 115 115);
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

//   padding: 4px 6px;
//   font-size: 20px;
//   background-color: ${({ selected }: { selected: boolean }) =>
//     selected ? "#000" : "transparent"};
//   color: ${({ selected }: { selected: boolean }) =>
//     selected ? "grey" : "#000"};
//   border-bottom: ${({ selected }: { selected: boolean }) =>
//     selected ? "1px solid #fff" : ""};
//   transition: ${({ selected }: { selected: boolean }) =>
//     selected ? "200ms ease-in" : ""};
//    & + & {
//      margin-left: 4px;
//    }
//    &:disabled {
//      cursor: default;
//    }
//  }
