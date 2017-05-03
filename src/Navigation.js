var React = require('react');
var {Link, IndexLink} = require('react-router');

var Navigation = (props) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
          <ul className="menu" data-menu>
           <li className="menu-text">YmatchX</li>
           <li>
              <IndexLink to="/" activeClassName="active-link"  >Home</IndexLink>
           </li>
           <li>
            <Link to="/rent" activeClassName="active-link"  >Rent Home</Link>
           </li>
           <li>
            <Link to="/lease" activeClassName="active-link"  >Lease Home</Link>
           </li>
           <li>
            <Link to="/buy" activeClassName="active-link"  >Buy Home</Link>
           </li>
           <li>
            <Link to="/sale" activeClassName="active-link"  >Sale Home</Link>
           </li>
          </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">
          <li className="menu-text">Created by <a href="http://www.ymatchx.com" target="_blank">Gordon</a></li>
        </ul>
      </div>
    </div>
  );
};

module.exports = Navigation;
