import styled from '@emotion/styled';

interface SideDrawerProps {
  opened: boolean;
}

interface BarWrap {
  opened: boolean;
}

export const Container = styled.div<SideDrawerProps>`
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 4);
  justify-content: space-between;
  width: 100%;
  min-height: 100dvh;
  padding: calc(var(--offset-xl) * 2);
  background-color: var(--color-header-background);
  transform: translateX(-100%);
  animation-duration: var(--transition-duration-normal);
  animation-timing-function: ease-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;

  @media screen and (max-width: 729px) {
    animation-name: ${(props) => (!props.opened ? 'slide-out-left' : 'slide-in-left')};
  }

  @media screen and (min-width: 730px) {
    animation-name: ${(props) => (props.opened ? 'slide-out-left' : 'none')};
  }
`;

export const BarOpenWrap = styled.button<BarWrap>`
  position: absolute;
  top: 14rem;
  left: 100%;
  width: 3.7rem;
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: width var(--transition-duration-normal) ease-in-out;

  @media screen and (min-width: 730px) {
    width: 0;
  }
`;

export const BarCloseWrap = styled.button<BarWrap>`
  position: absolute;
  top: 14rem;
  right: 0;
  width: ${(props) => (props.opened ? '3.7rem' : '0')};
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: width var(--transition-duration-normal) ease-in-out;

  @media screen and (min-width: 730px) {
    width: 0;
  }
`;

export const Group = styled.div`
  display: flex;
  gap: calc(var(--offset-xl) * 4);
  justify-content: space-between;
`;

export const ProfileWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
