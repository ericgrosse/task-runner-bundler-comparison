import React from 'react';
import {Jumbotron, Grid, Row, Col, Panel} from 'react-bootstrap';

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Jumbotron>
          <Grid>
            <h1>Home Page</h1>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col sm={6}>
              <Panel header="Panel 1">
                <p>Content A</p>
                <p>Content B</p>
              </Panel>
            </Col>
            <Col sm={6}>
              <Panel header="Panel 2">
                <p>Content A</p>
                <p>Content B</p>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default HomePage;