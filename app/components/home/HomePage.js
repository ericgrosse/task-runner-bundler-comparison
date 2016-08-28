import React from 'react';
import {Jumbotron, Grid} from 'react-bootstrap';

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Jumbotron>
          <Grid>
            <h1>Home Page</h1>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default HomePage;