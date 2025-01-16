import { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import bookImg from '../assets/book.svg';
import { DateField } from '@mui/x-date-pickers/DateField';
import useAxios from '../services/useAxios';
import { bookGenres } from '../genres';
import { Alert, Stack, Typography } from '@mui/material';


//function to add new book to the current books available already
function AddBook() {
  const { alert, post, showAlert } = useAxios('http://localhost:3000'); // get and retrieve data from localhost using axios
  const [rateValue, setRateValue] = useState(0); // if the rating is already known, give its value eg: rating of 3 
  const [hover, setHover] = useState (0);
  const [book, setBook] = useState({  //getting values of new book and when to capture new values of new book from these inputs:
    author: '',
    name: '',
    genres: [], // a collection of boook types kept in an array
    completed: false,
    start: null,
    end: null,
    stars: 0,
    img: ''
  });

    

  // choosing the genre of book. add a new book with genre(s). if book falls under more than one genre, split the types with ','.
  const genreChangeHandler = (event) => {
    const { value } = event.target;
    setBook({
      ...book,
      genres: typeof value === 'string' ? value.split(',') : value,  
    });
  };

  // function to handle the rating of the book
  const rateChangeHandler = (event, newValue) => {
    setBook((book)=> ({
      ...book,
      stars: newValue,
    }));
  };
 

  // function to handle when form is submitted/updated or changed
  const addBookHandler = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox' && name === 'completed') {
      setBook({ ...book, [name]: checked });
    } else {
      setBook({ ...book, [name]: value });
    }
  };

  // function to post to books data
  const postHandler = async (event) => {
    event.preventDefault();
  
  // Ensure the book object has default img if missing
  const bookSubmission = { ...book, img: book.img || bookImg };
  
  // Check if required fields are filled
    if (bookSubmission.name && bookSubmission.author) {
      try {
        await post('/books', bookSubmission); // Async post using your custom method or axios
        showAlert({ show: true, message: 'Book added successfully!', type: 'success' });
  
        // Reset the form after successful post
        setBook({
          author: '',
          name: '',
          genres: [],
          completed: false,
          start: null,
          end: null,
          stars: 0,
          img: '',
        });

      } catch (error) {
        showAlert({ show: true, message: 'Failed to add the book.', type: 'error' });
      }
    } else {
      showAlert({ show: true, message: 'Please fill out all required fields.', type: 'error' });
    }
  };
  

  // the function handles the inputs and event that takes place within the form. 
  return (
    <form onChange={addBookHandler} onSubmit={postHandler}>
      <Stack
        spacing={1}
        alignItems="stretch"
        sx={{ my: 2, mx: 'auto', width: '25%' }}
      >
        {alert.show && <Alert severity={alert.type} autoHideDuration={5000}>{alert.message}</Alert>}
       

        <Typography variant="h4" component="h2" sx={{ my: 10 }}>
          Add a book
        </Typography>
        <TextField
          name="name"
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          name="author"
          id="outlined-basic"
          label="Author"
          variant="outlined"
        />
        <TextField
          name="img"
          id="outlined-basic"
          label="Image (url)"
          variant="outlined"
        />
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={book.genres}
          name="genres"
          onChange={genreChangeHandler}
          input={<OutlinedInput label="Genre" />}
        >
          {bookGenres.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormControlLabel
          name="completed"
          control={<Checkbox checked={book.completed} />}
          label="Completed"
        />

        <DateField name="start" label="Started" />
        <DateField name="end" label="Finished" disabled={!book.completed} />
        <Stack spacing={1}>
          <Rating
            name="stars"
            value={rateValue}
            size="large"
            onChange={(event, newValue) => {
              setRateValue(newValue);
              rateChangeHandler(event, newValue);
            }}
            onChangeActive={(event, hover)=> {setHover (hover)}}
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




/* const postHandler = (event) =>  {
  event.preventDefault ();

  if (book.name && book.author){
    post('books', book);
    setBook()
  } else { error ('Please fill the form')}

  const handleClose = (event, reason) => {
    if (reason === 'clickway'){
      return;
    }
    setOpen(false);



   <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='Added Successfully'></Alert>
        </Snackbar>
  } */