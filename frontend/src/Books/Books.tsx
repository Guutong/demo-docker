import { Card, Button, Col, Row } from "react-bootstrap";
import { randomWord } from "../words";
import { useBooksService } from "./useBooksService";

function Books() {
  const { isReady, books, createBook, deleteBookById } = useBooksService();

  const isNotReady = !isReady;
  const isReadyNoBook = isReady && books.length <= 0;
  const isReadyWithBook = isReady && books.length > 0;

  return (
    <div
      className="mx-auto p-4"
      style={{ minHeight: "500px", minWidth: "100%" }}
    >
      {isReady && (
        <Button
          onClick={() =>
            createBook({ 
              name: randomWord(), 
              author: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` 
            })
          }
        >
          + New Book
        </Button>
      )}
      <div className="bg-light rounded-4 mx-auto d-flex justify-content-center align-items-center p-4 m-2">
        {isNotReady && <div className="d-flex">Service unavailable!</div>}
        {isReadyNoBook && <div className="d-flex">No books!</div>}
        {isReadyWithBook && (
          <Row className="m-2">
            {books.map((book, index) => (
              <Col className="m-2" key={index}>
                <Card style={{ width: "18rem" }} key={book.name}>
                  <Card.Img variant="top" src={`https://via.placeholder.com/150?text=${book.name}`} />
                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>Author: {book.author}</Card.Text>
                    <Button variant="primary">Read</Button>
                    <Button variant="danger mx-2" onClick={() => {
                        if (book?.ID) {
                            deleteBookById(book?.ID)
                        }
                    }}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Books;
