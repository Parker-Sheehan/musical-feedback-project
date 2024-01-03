import React, { FC, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ModalProps {
  show: boolean;
  onHide: () => void;
  onEditPfp: (profilePictureUrl: string) => void
}

const MyVerticallyCenteredModal: FC<ModalProps> = (props) => {

    let [pfpUrl, setPfpUrl] = useState<string>("")
    console.log(pfpUrl)

    const editPfp = () => {
        props.onEditPfp(pfpUrl)
        
        props.onHide()
    }

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Change Profile Picture</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Picture URL</h4>
        <input type="text" placeholder="URL" onChange={(evt) => {setPfpUrl(evt.target.value)}}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={editPfp}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
