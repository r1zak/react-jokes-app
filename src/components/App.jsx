import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Jokes from "./Jokes/Jokes";
import { loadJokes, loadMoreJokes } from "../store/jokes/actions";
import {
    Box,
    Button,
    Container
}
from "@mui/material";

function App() {
    const dispatch = useDispatch();
    const { jokes, isLoading } = useSelector(state => state.jokes)

    const handleLoadMoreJokes = () => dispatch(loadMoreJokes())

    useEffect(() => {
        dispatch(loadJokes())
    }, [dispatch])

    return (
    <div className="wrapper">
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            py={5}
        >
          <Container maxWidth="lg">
              <Jokes jokes={jokes} />
              <Box mt={3} textAlign="center">
                  <Button disabled={isLoading} onClick={handleLoadMoreJokes} variant="contained">Load more</Button>
              </Box>
          </Container>
        </Box>
    </div>
    );
}

export default App;
