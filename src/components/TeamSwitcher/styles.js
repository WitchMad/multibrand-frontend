import styled from 'styled-components';

export const Container = styled.aside`
  background:#202225;
  padding: 20px 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Team = styled.button`
  border: 0;
  background: none;
  margin: 0 0 8px;

  img {
    transition: all 0.2s;
    border-radius: 50%;
    width:50px;
    height: 50px;
  }
  &:hover img {
    border-radius: 30%;
  }
`;

export const NewTeam = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed rgba(255,255,255,.3);
  margin: 0 0 8px;
  background: transparent;
  color: rgba(255,255,255,.3);
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255,255,255,.6);
    color:rgba(255,255,255,.6);
  }
`;

export const Logout = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed #e04848;
  background: none;
  color: #e04848;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    color: #a43d3d;
    border-color: #a43d3d;
  }
`;
