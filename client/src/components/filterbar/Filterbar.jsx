import React, { useState, useEffect } from "react";
import "./Filterbar.css";
import {
  Slider,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

const FilterBar = () => {
  const [filters, setFilters] = useState({
    years: [],
    genres: [],
    awards: [],
    status: [],
    availability: [],
    countries: [],
  });

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedAward, setSelectedAward] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [sliderValue, setSliderValue] = useState([1, 1000]); // For numeric filters like pages

  // Fetch filters from the API
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:8001/filters");
        const data = await response.json();
        setFilters(data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setSelectedGenre(typeof value === "string" ? value.split(",") : value);
  };

  const handleAwardChange = (event) => {
    const { value } = event.target;
    setSelectedAward(typeof value === "string" ? value.split(",") : value);
  };

  const handleAvailabilityChange = (event) => {
    const { value } = event.target;
    setSelectedAvailability(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setSelectedStatus(
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="filter-bar">
      <h5>Year Range</h5>
      <FormControl fullWidth>
        <InputLabel>Select Year Range</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {filters.years.map((yearRange, index) => (
            <MenuItem key={index} value={`${yearRange.start}-${yearRange.end}`}>
              {yearRange.start} - {yearRange.end}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h5>Genres</h5>
      <FormControl fullWidth>
        <InputLabel>Select Genres</InputLabel>
        <Select
          multiple
          value={selectedGenre}
          onChange={handleGenreChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {filters.genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.name}>
              <Checkbox checked={selectedGenre.indexOf(genre.name) > -1} />
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h5>Award</h5>
      <FormControl fullWidth>
        <InputLabel>Select Award</InputLabel>
        <Select
          multiple
          value={selectedAward}
          onChange={handleAwardChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {filters.awards.map((awards) => (
            <MenuItem key={awards.id} value={awards.name}>
              <Checkbox checked={selectedAward.indexOf(awards.name) > -1} />
              {awards.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h5>Availablity</h5>
      <FormControl fullWidth>
        <InputLabel>Select Availablity</InputLabel>
        <Select
          multiple
          value={selectedAvailability}
          onChange={handleAvailabilityChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {filters.availability.map((availability) => (
            <MenuItem key={availability.id} value={availability.name}>
              <Checkbox
                checked={selectedAvailability.indexOf(availability.name) > -1}
              />
              {availability.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <h5>Status</h5>
      <FormControl fullWidth>
        <InputLabel>Select Status</InputLabel>
        <Select
          multiple
          value={selectedStatus}
          onChange={handleStatusChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {filters.status.map((status) => (
            <MenuItem key={status.id} value={status.name}>
              <Checkbox
                checked={selectedStatus.indexOf(status.name) > -1}
              />
              {status.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="outlined"
        fullWidth
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setSelectedYear("");
          setSelectedGenre([]);
          setSelectedAward([]);
          setSelectedAvailability([]);
        }}
      >
        Clear all filters
      </Button>
    </div>
  );
};

export default FilterBar;
