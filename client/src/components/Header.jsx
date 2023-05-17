import React from 'react';

function Header() {
  return (
    <div className="container1">
      <section className="headContainer">
        <br />
        <span className="logo">apricot</span>
        <span>
        <form className="mainForm">
          <input className="mainSearch" placeholder="_______________"></input>
          <button className="mainSearchBtn"><i className="fa fa-search fa-xl"/></button>
        </form>
        </span>

      </section>
      <p className="newsHeader">SITE-WIDE ANNOUNCEMENT MESSAGE! -- SALE /  DISCOUNT OFFER -- NEW PRODUCT HIGHLIGHT</p>
    </div>
  );
}

export default Header;
