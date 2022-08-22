import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ScoopOption({ name, imagePath, updateItemCount }) {

  const handleChange = (event) => {
    updateItemCount(name, event.target.value)
  }

  return (
    <Col>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
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
