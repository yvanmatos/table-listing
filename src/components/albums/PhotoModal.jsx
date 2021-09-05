import { Modal } from "@material-ui/core";
import styled from "styled-components";

const Wrapper = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhotoModal = ({ show, hide, photo }) => {
  return (
    <Wrapper open={show} onClose={hide}>
      <img src={photo.url} alt={`Photo number` + photo.id} />
    </Wrapper>
  );
};

export default PhotoModal;
