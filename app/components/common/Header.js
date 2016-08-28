import React from 'react';
import {Link, IndexLink} from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <nav className="Header">
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {'|'}
        <Link to="/about" activeClassName="active">About</Link>
        {'|'}
        <Link to="/contact" activeClassName="active">Contact</Link>
      </nav> 
    );
  }
}

export default Header;