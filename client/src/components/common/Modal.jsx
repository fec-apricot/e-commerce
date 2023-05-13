import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(children, document.querySelector('#modal-container'));
}

export default Modal;
