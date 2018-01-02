import React, { Component } from 'react';
import './About.css';

export default class About extends Component {


  render() {
    return (
      <div className="about-page text-muted">
        <h2>About House Rules</h2>


        <div id="accordion" role="tablist" aria-multiselectable="true">
          <div className="card">

            <div className="card-header" role="tab" id="headingOne">
              <h5 className="mb-0">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  House Rules Wikipedia
                </a>
              </h5>
            </div>

            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
              <div className="card-block">
              House rules are rules applying only in a certain location or organization. Bars and pubs in which games take place frequently have house rules posted. For example, it is a house rule in United States Air Force officers&apos; clubs that if an officer enters the club wearing headgear and is officially noticed (i.e., the bell near the bar is rung), the entering officer must buy a round of drinks for the bar.
              <br/><br/>
              In households, house rules are rules set by the head of the family, generally to be followed by children.
              </div>
            </div>
          </div>
          <div className="card">

            <div className="card-header" role="tab" id="headingTwo">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Why create this app?
                </a>
              </h5>
            </div>
            <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo">
              <div className="card-block">
                <p>Have you ever wanted to play a game but couldn’t find the rules? Or maybe you have a set of alternate rules or <em>house rules</em> for the game that you’d like to remember?<br/><br/>
                 Multiply that by how many games you have and that can be a lot of details to remember.</p>
              </div>
            </div>
          </div>

          <div className="card">

            <div className="card-header" role="tab" id="headingThree">
              <h5 className="mb-0">
                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  What is <em>House Rules</em>?
                </a>
              </h5>
            </div>
            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
              <div className="card-block">
                <p>That’s why we’ve built <strong>House Rules</strong> - to help game lovers save and organize the rules for your games for easy access, as well as add alternative rule sets for your games.
                <br/>
                <br/>
                You can also set specific games as favorites, search by game categories, and discover new games.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    )
  }
};
