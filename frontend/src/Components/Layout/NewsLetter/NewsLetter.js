import React from "react";
import "./NewsLetter.css";
function NewsLetter() {
  return (
    <div className="newsletter">
      <div className="newsletter_heading">
        <h3>News Letter</h3>
      </div>
      <div className="newsletter_cards">
        <form>
          <span>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
          </span>
          <div className="newsletter_cards_button">
            <button>Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
