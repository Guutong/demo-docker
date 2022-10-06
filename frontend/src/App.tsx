import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';
import Books from './Books/Books';
import { Header } from './Header';
import News from './News/News';

function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <div className="col-md-6 mx-auto">
          <Books />
          <News />
        </div>
      </Container>
    </>
  );
}

export default App;
