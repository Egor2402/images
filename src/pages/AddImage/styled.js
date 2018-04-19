import styled from 'styled-components';

export const HeaderWithControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ControlsBlock = styled.div`
  > *:not(:last-child) {
    margin-right: 10px;
  }
`;
