import { Container } from "react-bootstrap";

interface ErrorComponentProps {
  error: string;
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <Container className="text-center">
      <br />
      <h3 className="h3">There was an error displaying the page 😞</h3>
      <br />
      <h5 className="h5">If you see the developer tell them:</h5>
      <span className="text-dark text-decoration-none">{error}</span>
    </Container>
  );
}
