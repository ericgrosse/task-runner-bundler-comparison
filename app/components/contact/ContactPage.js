import React from 'react';
import {Jumbotron, Grid, Row, Col, Well} from 'react-bootstrap';

class ContactPage extends React.Component {
  render() {
    return (
      <div className="ContactPage">
        <Jumbotron>
          <Grid>
            <h1>Contact Page</h1>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col sm={4}>
              <Well>
                <div className="icon-container">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </div>
                <p className="icon-description">Users</p>
              </Well>
            </Col>
            <Col sm={4}>
              <Well>
                <div className="icon-container">
                  <i className="fa fa-tasks" aria-hidden="true"></i>
                </div>
                <p className="icon-description">Tasks</p>
              </Well>
            </Col>
            <Col sm={4}>
              <Well>
                <div className="icon-container">
                  <i className="fa fa-tags" aria-hidden="true"></i>
                </div>
                <p className="icon-description">Tags</p>
              </Well>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ContactPage;