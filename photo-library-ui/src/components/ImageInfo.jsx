import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCreative } from "../services/api";
function ImageInfo(props) {
  const { image } = props;
  const [gpt, setGpt] = useState();
  const [busy, setBusy] = useState(false);

  const beCreative = async () => {
    console.log("Be Creative");
    setBusy(true);
    const response = await getCreative(image.id);
    console.log(response);
    setGpt(response.text);
    setBusy(false);
  };
  return (
    <Container>
      <Row>
        <Col>{image.title}</Col>
      </Row>
      <Row>
        <Col>
          <img src={image.url} />
        </Col>
        <Col>
          <pre width="40%">{JSON.stringify(image, null, 2)}</pre>
        </Col>
      </Row>
      <Row>
        <Col>{gpt}</Col>
      </Row>
      <Row>
        <Button variant="primary" onClick={beCreative} disabled={busy}>
          Get Creative!
        </Button>
      </Row>
    </Container>
  );
}

export default ImageInfo;
