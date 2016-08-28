import React from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';

class ContactPage extends React.Component {
  render() {
    return (
      <div className="ContactPage">
        <Jumbotron>
          <Grid>
            <h1>Contact Page</h1>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default ContactPage;