import { useNavigate, useParams } from "react-router-dom";
import data from '../../books.json'; // Import the entire JSON object
import { Button } from "@mui/material";

//const fallbackImage = 'https://via.placeholder.com/150'; 

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const bookId = Number(id); // Convert id to a number

    if (isNaN(bookId)) {
        return <p>Invalid book ID</p>;
    } // Check if the conversion was successful

    const books = data.books; // Access the books array from json

    // Ensure books is an array
    console.log(Array.isArray(books)); 
    if (!Array.isArray(books)) {
        return <p>Books data is not an array</p>;
    }

    const book = books.find((book) => book.id === bookId);
    if (!book) {
        return <p>Book not found</p>;
    }

    return (
        <div>
            <img src={book.img} alt="image" 
            //onError={(e) => e.target.src = fallbackImage} 
            />
            <p>{book.name}</p>
            <p>{book.author}</p>

            <Button onClick={() => navigate(-1)}>Back to list</Button>
        </div>
    );
};

export default Book;