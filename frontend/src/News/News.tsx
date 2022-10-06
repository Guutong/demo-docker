import { Card, Button, Row } from "react-bootstrap";
import { randomWord } from "../words";
import { useNewsService } from "./useNewsService";

function News() {
  const { isReady, newsList, createNews, deleteNewsById } = useNewsService();

  const isNotReady = !isReady;
  const isReadyNoBook = isReady && newsList.length <= 0;
  const isReadyWithBook = isReady && newsList.length > 0;
  
  return (
    <div
      className="mx-auto p-4"
      style={{ minHeight: "500px", minWidth: "100%" }}
    >
      {isReady && (
        <Button
          onClick={() =>
            createNews({ 
              title: randomWord(), 
              description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.` 
            })
          }
        >
          + Add News
        </Button>
      )}
      <div className="bg-light rounded-4 d-flex justify-content-center align-items-center p-4 m-2">
        {isNotReady && <div className="d-flex">Service unavailable!</div>}
        {isReadyNoBook && <div className="d-flex">No News!</div>}
        {isReadyWithBook && (
          <Row className="m-2" style={{ width: "100%" }}>
            {newsList.map((news, index) => (
              <Card className="m-2" key={index}>
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>{news.description}</Card.Text>
                  <Button variant="primary">Read</Button>
                  <Button
                    variant="danger mx-2"
                    onClick={() => {
                      if (news?.id) {
                        deleteNewsById(news?.id);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default News;
