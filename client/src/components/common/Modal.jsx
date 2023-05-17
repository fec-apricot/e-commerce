import ReactDOM from 'react-dom';

function Modal({ children }) {
  const modalContainer = document.createElement('div');
  modalContainer.setAttribute('id', 'modal-container');
  document.body.appendChild(modalContainer);

  return ReactDOM.createPortal(children, modalContainer);
}

export default Modal;
