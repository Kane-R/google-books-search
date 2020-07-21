import React, {useContext} from 'react';
import { AppContext } from '../utils/AppContext';

function MessageModal() {

  const {modal, modalCopy} = useContext(AppContext);
  let [modalState/*, setModalState*/] =  modal;
  let [modalCopyState /*, setModalCopyState */] =  modalCopy;

  return(
    <React.Fragment>
      <section id="MessageModal" className={ modalState }>
        <p id="ModalMessage">{modalCopyState}</p>
      </section>
    </React.Fragment>
  );
}

export default MessageModal