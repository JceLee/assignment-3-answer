import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MonthNavigation from "../components/molecules/MonthNavigation.jsx";
import ExpenseList from "../components/molecules/ExpenseList.jsx";
import CreateExpense from "../components/molecules/CreateExpense.jsx";
import DashBoard from "../components/molecules/DashBoard.jsx";
import axiosJsonServerInstance from "../lib/api/axiosJsonServer.js";

const Container = styled.main`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
`;

export const Section = styled.section`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
`;

const fetchExpenses = async () => {
  const { data } = await axiosJsonServerInstance.get("/expenses");
  return data;
};

export default function Home() {
  const [month, setMonth] = useState(1);
  const {
    data: expenses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const filteredExpenses = expenses.filter(
    (expense) => new Date(expense.date).getMonth() + 1 === month,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Container>
      <MonthNavigation month={month} setMonth={setMonth} />
      <CreateExpense month={month} />
      <DashBoard month={month} filteredExpenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} />
    </Container>
  );
}
