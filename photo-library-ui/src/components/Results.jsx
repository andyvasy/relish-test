import React from "react";
import ImageInfo from "./ImageInfo";
import ListGroup from "react-bootstrap/ListGroup";
import { ListGroupItem } from "react-bootstrap";

function Results(props) {
  const { images } = props;
  return (
    <>
      Results: &nbsp;
      {images && images.data && (
        <>
          {images.page.offset + 1}&nbsp;-&nbsp;
          {images.page.offset + images.data.length}&nbsp; of {images.page.total}
          <ListGroup>
            {images.data.map((image) => (
              <ListGroupItem key={image.id}>
                <ImageInfo key={image.id} image={image} />
              </ListGroupItem>
            ))}
          </ListGroup>
        </>
      )}
    </>
  );
}

export default Results;
