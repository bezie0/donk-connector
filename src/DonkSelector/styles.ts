import styled from "@emotion/styled";

export const PopperContainer = styled.div`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-color: white;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  font-family: monospace;

  .arrow {
    position: absolute;
    width: 10px;
    height: 10px;

    &:after {
      content: " ";
      position: absolute;
      top: -25px;
      left: 0;
      transform: rotate(45deg);
      width: 10px;
      height: 10px;
      background-color: white;
      box-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  &[data-popper-placement^="top"] > .arrow {
    bottom: -30px;
    :after {
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }
`;

export const AvatarButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #222222;

  &:hover {
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 5px;
  }
`;

export const ListContainer = styled.div`
  height: 200px;
  width: 300px;
  overflow: auto;
`;

export const VirtualizedListContainer = styled.div<{ height: string }>`
  width: 100%;
  position: relative;
  height: ${(props) => props.height};
`;

export const ListItem = styled.div<{
  height: string;
  transform: string;
  selected: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  height: ${(props) => props.height};
  transform: ${(props) => props.transform};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};

  &:hover {
    background: #dedede;
  }

  img {
    height: 50px;
    width: 50px;
    margin-right: 10px;
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
`;

export const EmptyStateHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  img {
    height: 40px;
    width: 40px;
    margin-right: 5px;
  }
`;
