import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { IconButton, Chip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import "./Featured.css"; // Import the CSS file

const Featured = ({ title = "Unknown Title", imdb_score = "N/A", description = "No description available", genre_chip = [], backgroundImage }) => {
  return (
    <div
      className="featured-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="featured-overlay"></div>
      <Container>
        <Row className="featured-row">
          <Col md={8} lg={12} sm={6} xs={6} className="text-start">
            <h1 className="featured-title mt-5">{title}</h1>
            <div className="featured-vote">
              <span className="featured-vote-percentage">{imdb_score}</span>
              <span className="featured-vote-text">IMDB Score</span>
            </div>
            {/* <p className="featured-description">
              {description}
            </p> */}
            <div className="featured-tags" style={{ display: "flex", color: "white" }}>
              {genre_chip.map((genre, index) => (
                <Chip key={index} label={`#${genre}`} className="featured-chip" />
              ))}
            </div>
            <div className="featured-buttons">
              <IconButton className="featured-icon-button add-button">
                <AddIcon />
              </IconButton>
              <IconButton className="featured-icon-button play-button">
                <PlayArrowIcon />
              </IconButton>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Featured;