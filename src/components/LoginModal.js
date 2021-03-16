import styled from 'styled-components';

const ModalBox = styled.div`
  display: ${props => props.show ? "block" : "none"};
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`

const ModalSection = styled.section`
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`

const LoginModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <ModalBox show={show}>
      <ModalSection>
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </ModalSection>
    </ModalBox>
  );
};

export default LoginModal
