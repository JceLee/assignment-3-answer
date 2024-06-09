import { Section } from "../../pages/Home.jsx";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoExpenseMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const ExpenseItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ExpenseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  span {
    font-size: 16px;
    color: #333;
  }

  span:last-child {
    font-weight: bold;
    color: #007bff;
    flex-shrink: 0;
  }
`;

const ExpenseDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    &:first-child {
      margin-bottom: 5px;
      color: #666;
      font-size: 14px;
    }

    &:last-child {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }
  }
`;

export default function ExpenseList({ expenses }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleItemClick = (expense) => {
    console.log(user);
    console.log(expense.createdBy);
    if (user.id === expense.createdBy) {
      navigate(`/detail/${expense.id}`);
    } else {
      toast.error("본인의 지출만 수정할 수 있습니다.");
    }
  };

  return (
    <Section>
      <ToastContainer />
      {expenses.length === 0 ? (
        <NoExpenseMessage>지출이 없습니다.</NoExpenseMessage>
      ) : (
        <ExpenseItemList>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              onClick={() => handleItemClick(expense)}
            >
              <ExpenseDetails>
                <span>{expense.date}</span>
                <span>{`${expense.item} - ${expense.description} (by ${expense.createdBy})`}</span>
              </ExpenseDetails>
              <span>{expense.amount.toLocaleString()} 원</span>
            </ExpenseItem>
          ))}
        </ExpenseItemList>
      )}
    </Section>
  );
}
