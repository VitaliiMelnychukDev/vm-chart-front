import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="outline-modal-wrapper">
      <div className="modal-container">{children}</div>
    </div>,
    document.getElementById('root')
  );
}

export default Modal;