import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  flex-direction: column;
`;
export const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  flex-direction: column;
  width: 100%;
  position: fixed;
  background-color: white;
  z-index: 1000;
`;
export const Title = styled.label`
  color: #0066ab;
  font-size: 30px;
  z-index: 1000;
`;
export const ButtonAddContact = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  background-color: #003d66;
  border: none;
  padding: 5px;
  border-radius: 5px;
  font-size: 25px;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 20px;

  z-index: 1000;
  @media (max-width: 600px) {
    width: 98%;
  }
`;
export const CardContact = styled.div`
  display: flex;
  justify-content: space-between;

  flex-direction: column;
  background-color: #0066ab;
  color: white;
  font-size: 20px;
  padding: 20px;
  border-radius: 10px;
  margin-top: 5px;
  width: 50%;
  position: relative;
  top: 120px;
  @media (max-width: 600px) {
    width: 98%;
  }
`;
export const CardContactTop = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
`;
export const CardContactBottom = styled.div`
  display: flex;

  flex-wrap: wrap;
`;
export const CardItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;
export const ButtonEdit = styled.button`
  margin-right: 5px;
  font-size: 25px;
  border: none;
  color: white;
  background-color: transparent;
`;
export const ButtonDelete = styled.button`
  margin-right: 5px;
  font-size: 25px;
  border: none;
  color: white;
  background-color: transparent;
`;
