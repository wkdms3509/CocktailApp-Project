import styled from "styled-components";

type SearchProps = {
  click: boolean;
};
export const SearchContainer = styled.div<SearchProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: ${(props) => (props.click ? "1px solid blue;" : "none")};
  background-color: ${(props) => (props.click ? "white" : "none")};
  padding: 0.3rem;
  margin-right: ${(props) => (props.click ? "1.25rem" : 0)};
  > input {
    transition: 0.3s width linear !important;
    width: ${(props) => (props.click ? "12.5rem" : 0)};
    background-color: ${(props) => (props.click ? "white" : "none")};
    color: #888;
    border: none;
    outline: none;
    opacity: ${(props) => (props.click ? "1" : 0)};
    margin-left: 0.625rem;
    padding: 0.3rem;
  }
`;

export const SearchContainer2 = styled.div<SearchProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15rem;
  margin: auto;
  border-bottom: 1px solid blue;
  background-color: blue;
  padding: 0.5rem;
  margin-right: 1.25rem;
  margin-bottom: 1rem;
  > input {
    width: 15rem;
    background-color: white;
    color: #888;
    border: none;
    outline: none;
    margin-left: 0.625rem;
    padding: 0.3rem;
  }
`;
