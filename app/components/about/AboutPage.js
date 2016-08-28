import React from 'react';
import {Jumbotron, Grid, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="AboutPage">
        <Jumbotron>
          <Grid>
            <h1>About Page</h1>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col sm={6}>
              <ListGroup>
                <ListGroupItem header="Heading 1">Item 1</ListGroupItem>
                <ListGroupItem header="Heading 2">Item 2</ListGroupItem>
                <ListGroupItem header="Heading 3">Item 3</ListGroupItem>
              </ListGroup>
            </Col>
            <Col sm={6}>
              <ListGroup>
                <ListGroupItem header="Heading 4">Item 4</ListGroupItem>
                <ListGroupItem header="Heading 5">Item 5</ListGroupItem>
                <ListGroupItem header="Heading 6">Item 6</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AboutPage;