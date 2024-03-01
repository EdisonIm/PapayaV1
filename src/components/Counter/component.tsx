import React, { SetStateAction } from "react";
import styled, { useTheme } from "styled-components/native";
import Typography from "../Typography";
import { Minus, Plus } from "../Icon";

interface ICounterProps {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>
}

const Component = ({ count, setCount }: ICounterProps) => {
  const themeApp = useTheme();
  return <Container>
    <Button onPress={() => {
      if (count > 1) setCount((prev) => prev - 1)
    }}>
      <Minus active={count > 1} />
    </Button>
    <Typography text="Button10R" textColor={themeApp.colors.gray[2]}>{count}개</Typography>
    <Button onPress={() => setCount((prev) => prev + 1)}>
      <Plus active />
    </Button>

  </Container>
}

export default Component

const Container = styled.View`
  width: 140px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.gray[7]};
  background-color: white;
  border-radius: 8px;
  align-items: center;

`
const Button = styled.Pressable`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`