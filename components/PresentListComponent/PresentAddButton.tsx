import { WishPresent } from "../../packages/aregalo-backend";
import { Dispatch } from "react";
import { Button, Container } from "react-bootstrap";

interface PresentWishProps {
  setEditPresent: Dispatch<WishPresent>;
  setModalShow: Dispatch<boolean>;
  setModalUpdate: Dispatch<boolean>;
}

export function PresentAddButton({
  setEditPresent,
  setModalShow,
  setModalUpdate,
}: PresentWishProps) {
  return (
    <Container className="text-center">
      <br />
      <Button
        id={"add-button"}
        onClick={() => {
          setEditPresent({
            id: 0,
            title: "Regalo",
            description: "",
            favourite: false,
          });
          setModalUpdate(false);
          setModalShow(true);
        }}
      >
        Añadir regalo
      </Button>
    </Container>
  );
}
