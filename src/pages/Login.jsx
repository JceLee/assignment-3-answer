import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login, register } from "../lib/api/auth.js";
import useAuthStore from "../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    background-color: #a0a0a0;
  }
`;

const ToggleButton = styled(Button)`
  background-color: #6c757d;

  &:disabled {
    background-color: #a0a0a0;
  }
`;

export default function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { login: loginUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(id, password);
      loginUser(data.accessToken, {
        id: data.userId,
        avatar: data.avatar,
        nickname: data.nickname,
      });
      toast.success("로그인 성공!");
      navigate("/");
    } catch (error) {
      toast.error("로그인 실패. 다시 시도해주세요.");
    }
  };

  const handleRegister = async () => {
    try {
      await register(id, password, nickname);
      toast.success("회원가입 성공! 로그인 해주세요.");
      setIsLoginMode(true);
    } catch (error) {
      toast.error("회원가입 실패. 다시 시도해주세요.");
    }
  };

  const isLoginButtonEnabled =
    id.length >= 4 &&
    id.length <= 10 &&
    password.length >= 4 &&
    password.length <= 15;
  const isRegisterButtonEnabled =
    isLoginButtonEnabled && nickname.length >= 1 && nickname.length <= 10;

  return (
    <Container>
      <ToastContainer />
      <h2>{isLoginMode ? "로그인" : "회원가입"}</h2>
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          minLength="4"
          maxLength="10"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          minLength="4"
          maxLength="15"
        />
      </InputGroup>
      {!isLoginMode && (
        <InputGroup>
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            minLength="1"
            maxLength="10"
          />
        </InputGroup>
      )}
      {isLoginMode ? (
        <Button onClick={handleLogin} disabled={!isLoginButtonEnabled}>
          로그인
        </Button>
      ) : (
        <Button onClick={handleRegister} disabled={!isRegisterButtonEnabled}>
          회원가입
        </Button>
      )}
      <ToggleButton onClick={() => setIsLoginMode(!isLoginMode)}>
        {isLoginMode ? "회원가입" : "로그인"}
      </ToggleButton>
    </Container>
  );
}
