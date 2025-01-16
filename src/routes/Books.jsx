import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
//import useAxios from '../services/useAxios';

// function to display books to viewer
const Books = () => {
  const [books, setBooks] = useState([]); // to check the current state of books 
  const [isLoading, setIsLoading] = useState(true); // to check the current loading state 
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState ([]);
  const navigate = useNavigate();

  // a side effect that tells it to watch and make sure that if the number of books shown currently is 0, then go grab all books

  
  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
  }, [books]);

  // TODO: Replace axios with useAxios hook
  async function getBooks() {
    try {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);

      setFilteredBooks(response.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  

  // TODO: Implement search functionality
  const handleInputChange = (event) => {
      //event.preventDefault ();
     const searchInput = event.target.value.toLowerCase();
     setSearch(searchInput);
     console.log(searchInput);


    if (searchInput === '') {
      setFilteredBooks(books);
    }
    else{
      const filteredBooks = books.filter((book) => 
        book.author.toLowerCase(). includes(searchInput)||
        book.name.toLowerCase().includes (searchInput) ||
        book.genres.some((genre) => genre.toLowerCase().includes(searchInput))
      );
      setFilteredBooks(filteredBooks);
    }
  }

  const handleNavigate = (id) => { navigate (`/book/${id}`);
      //console.log(id);
      }

  return (
    
    <Box sx={{ mx: 'auto', p: 2 }}>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div>

          <TextField type="text" value={search} label="search" onChange={handleInputChange}></TextField>


         {/*  {filteredBooks.map((book) => (
                                <Card key={book.title}>
                                  <CardMedia image={book.img}
                                             title={book.name}>
                                  </CardMedia>
                                </Card>
                              ))
          } */}

          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={book.stars}
                    readOnly
                    size="small"
                  />
                  <Button size="small" onClick={() => handleNavigate(book.id)}>Learn More</Button>
                 
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;
