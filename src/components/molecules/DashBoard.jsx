// src/components/DashBoard.jsx
import { useState } from "react";
import styled from "styled-components";
import Dropdown from "../atom/Dropdown.jsx";

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

const SummaryItemContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
`;

const BarSegment = styled.div`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}%;
  transition: width 0.2s ease-in-out;
`;

const getColor = (index) => {
  const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"];
  return colors[index % colors.length];
};

export default function DashBoard({ month, filteredExpenses }) {
  const [groupBy, setGroupBy] = useState("category");

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  const groupByCategory = filteredExpenses.reduce((acc, expense) => {
    if (acc[expense.item]) {
      acc[expense.item] += expense.amount;
    } else {
      acc[expense.item] = expense.amount;
    }
    return acc;
  }, {});

  const groupByUser = filteredExpenses.reduce((acc, expense) => {
    if (acc[expense.createdBy]) {
      acc[expense.createdBy] += expense.amount;
    } else {
      acc[expense.createdBy] = expense.amount;
    }
    return acc;
  }, {});

  const data = groupBy === "category" ? groupByCategory : groupByUser;

  const sortedItems = Object.entries(data).sort((a, b) => b[1] - a[1]);

  const top4Items = sortedItems.slice(0, 4);
  const otherItemsTotal = sortedItems
    .slice(4)
    .reduce((sum, [, amount]) => sum + amount, 0);

  return (
    <Container>
      {month}월 총 지출: {totalAmount.toLocaleString()} 원
      <Dropdown value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="category">카테고리별</option>
        <option value="user">사용자별</option>
      </Dropdown>
      <BarContainer>
        {top4Items.map(([item, amount], index) => {
          const percentage = ((amount / totalAmount) * 100).toFixed(2);
          return (
            <BarSegment key={item} color={getColor(index)} width={percentage} />
          );
        })}
        {otherItemsTotal > 0 && (
          <BarSegment
            color={getColor(4)}
            width={((otherItemsTotal / totalAmount) * 100).toFixed(2)}
          />
        )}
      </BarContainer>
      <SummaryItemContainer>
        {top4Items.map(([item, amount], index) => {
          const percentage = ((amount / totalAmount) * 100).toFixed(2);
          return (
            <SummaryItem key={item}>
              <ColorBox color={getColor(index)} />
              {item}: {amount.toLocaleString()} 원 ({percentage}%)
            </SummaryItem>
          );
        })}
        {otherItemsTotal > 0 && (
          <SummaryItem>
            <ColorBox color={getColor(4)} />
            기타: {otherItemsTotal.toLocaleString()} 원 (
            {((otherItemsTotal / totalAmount) * 100).toFixed(2)}%)
          </SummaryItem>
        )}
      </SummaryItemContainer>
    </Container>
  );
}
