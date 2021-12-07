import { Button, Modal } from "react-bootstrap";
import { WishCreatePresent, WishPresent } from "../../packages/aregalo-backend";
import { Dispatch, useEffect, useState } from "react";

interface PresentModal {
  displayPresent: WishPresent;
  modalShow: boolean;
  setModalShow: Dispatch<boolean>;
  updateFlag: boolean;
  createPresent: (present: WishCreatePresent) => Promise<void>;
  updatePresent: (present: WishPresent) => Promise<void>;
  deletePresent: (present: WishPresent) => Promise<void>;
}

interface PresentForm {
  title: string;
  description: string;
  link?: string;
  price?: number;
}

const submitCreate = (
  presentData: PresentForm,
  createPresent: (present: WishCreatePresent) => Promise<void>
) => {
  const createdPresent: WishCreatePresent = {
    title: presentData.title,
    description: presentData.description,
    favourite: false,
    link: presentData.link,
    price: presentData.price != null ? presentData.price * 100 : undefined,
  };
  createPresent(createdPresent).catch((e) => console.error(e));
};

const submitEdit = (
  displayPresent: WishPresent,
  presentData: PresentForm,
  updatePresent: (present: WishPresent) => Promise<void>
) => {
  const updatedPresent: WishPresent = {
    id: displayPresent.id,
    title: presentData.title,
    description: presentData.description,
    favourite: displayPresent.favourite,
    link: presentData.link,
    price: presentData.price != null ? presentData.price * 100 : undefined,
  };
  updatePresent(updatedPresent).catch((e) => console.error(e));
};

export function PresentModal({
  displayPresent,
  modalShow,
  setModalShow,
  updateFlag,
  createPresent,
  updatePresent,
  deletePresent,
}: PresentModal) {
  const [presentData, setPresentData] = useState<PresentForm>({
    description: "",
    link: undefined,
    price: undefined,
    title: "",
  });
  const modifyForm = (key: string, newValue: string | number | undefined) => {
    const val =
      key !== "title" && key !== "description" && newValue === ""
        ? undefined
        : newValue;
    const newPresentData: PresentForm = { ...presentData, [key]: val };
    setPresentData(newPresentData);
  };

  useEffect(() => {
    setPresentData({
      title: displayPresent.title,
      description: displayPresent.description,
      link: displayPresent.link,
      price:
        displayPresent.price != null ? displayPresent.price / 100 : undefined,
    });
  }, [displayPresent]);

  return (
    <Modal size="lg" show={modalShow} centered>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {updateFlag ? "Editar regalo" : "Crear Regalo"}
        </Modal.Title>
        <Button className="btn-close" onClick={() => setModalShow(false)} />
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            defaultValue={displayPresent.title}
            onChange={(e) => modifyForm("title", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción:
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={2}
            defaultValue={displayPresent.description}
            onChange={(e) => modifyForm("description", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="link" className="form-label">
            Enlace:
          </label>
          <input
            type="text"
            className="form-control"
            id="link"
            defaultValue={displayPresent.link}
            onChange={(e) => modifyForm("link", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio:
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            step={0.01}
            defaultValue={
              displayPresent.price ? displayPresent.price / 100 : ""
            }
            onChange={(e) => modifyForm("price", e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {updateFlag && (
          <Button
            className="btn-danger"
            onClick={() => {
              deletePresent(displayPresent).catch((e) => console.error(e));
              setModalShow(false);
            }}
          >
            Eliminar
          </Button>
        )}
        <Button
          onClick={() => {
            updateFlag
              ? submitEdit(displayPresent, presentData, updatePresent)
              : submitCreate(presentData, createPresent);
            setModalShow(false);
          }}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
