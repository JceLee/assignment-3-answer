import { useState, useEffect } from "react";
import styled from "styled-components";
import { getUserInfo, updateProfile } from "../lib/api/auth.js";
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
`;

export default function Profile() {
  const { user, login } = useAuthStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setNickname(userInfo.nickname);
      } catch (error) {
        toast.error("사용자 정보를 가져오는데 실패했습니다.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await updateProfile(avatar, nickname);
      login(user.token, updatedUser);
      toast.success("프로필 업데이트 성공!");
    } catch (error) {
      toast.error("프로필 업데이트 실패. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h2>프로필 수정</h2>
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
      <InputGroup>
        <label htmlFor="avatar">아바타 이미지</label>
        <input
          type="file"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files[0])}
          accept="image/*"
        />
      </InputGroup>
      <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
    </Container>
  );
}
