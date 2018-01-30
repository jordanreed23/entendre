import React, {Component} from 'react';
import image from '../entendre.png';
import './About.css';

class About extends Component {
  render() {
    return (
      <div className="About">
        <img className="about-logo" src={image} alt="entendre"/>
        <p className="about-text">Entendre is a platform which uses an algorithm to calculate the unique word count for artists, albums, and songs. <br/>Start by searching an artist or clicking one of the top ranked wordsmiths.
        </p>
      </div>
    )
  }
}

export default About;
