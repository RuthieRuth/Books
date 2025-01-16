import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import bookImg from '../assets/book.svg'; // Ensure this path is correct
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Alert, Stack, Typography } from '@mui/material';

// Function to add a new book to the current books available
function AddBook() {
  const { alert, post } = useAxios('http://localhost:3001'); // Get and retrieve data from localhost using axios
  const [rateValue, setRateValue] = useState(0); // If the rating is already known, give its value e.g., rating of 3
  const [hover, setHover] = useState(0);
  const [book, setBook] = useState({ // Getting values of new book and when to capture new values of new book from these inputs:
    author: '',
    name: '',
    genres: [], // A collection of book types kept in an array
    completed: false,
    start: null,
    end: null,
    stars: 0,
    img: ''
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await post('/books', book);
      alert('Book added successfully');
    } catch (error) {
      alert('Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          name="author"
          label="Author"
          value={book.author}
          onChange={handleInputChange}
        />
        <TextField
          name="name"
          label="Name"
          value={book.name}
          onChange={handleInputChange}
        />
        <Select
          name="genres"
          multiple
          value={book.genres}
          onChange={handleInputChange}
          input={<OutlinedInput label="Genres" />}
        >
          {bookGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} onChange={handleInputChange} />}
          label="Completed"
        />
        <DateField
          name="start"
          label="Started"
          value={book.start}
          onChange={(newValue) => setBook((prevBook) => ({ ...prevBook, start: newValue }))}
        />
        <DateField
          name="end"
          label="Finished"
          value={book.end}
          onChange={(newValue) => setBook((prevBook) => ({ ...prevBook, end: newValue }))}
          disabled={!book.completed}
        />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
              setBook((prevBook) => ({ ...prevBook, stars: newValue }));
            }}
            onChangeActive={(event, hover) => setHover(hover)}
          />
        </Stack>
        <Button variant="contained" type="submit">
          Add new
        </Button>
      </Stack>
    </form>
  );
}

export default AddBook;