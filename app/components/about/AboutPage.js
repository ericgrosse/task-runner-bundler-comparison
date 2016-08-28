import React from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="AboutPage">
        <Jumbotron>
          <Grid>
            <h1>About Page</h1>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default AboutPage;