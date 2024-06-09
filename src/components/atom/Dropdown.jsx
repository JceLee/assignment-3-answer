// src/components/StyledDropdown.jsx
import styled from "styled-components";

const Dropdown = styled.select`
  margin-top: 20px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:hover {
    background-color: #f1f1f1;
  }

  option {
    padding: 10px;
  }
`;

export default Dropdown;
