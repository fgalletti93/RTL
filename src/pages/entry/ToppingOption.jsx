import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ToppingOption({ name, imagePath, updateItemCount }) {
  const handleChange = (event) => {
    updateItemCount(name, event.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label>{name}</Form.Label>
        <Col xs={5}>
          <Form.Control
            placeholder="0"
            type="number"
            defaultValue={"0"}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
