import { Box, Grid } from "@mui/material";
import JokesItem from "./JokesItem";
import { useDispatch } from "react-redux";
import { deleteJoke, refreshJoke } from "../../store/jokes/actions";

const Jokes = ({ jokes }) => {
    const dispatch = useDispatch()

    const handleRefreshJoke = (id) => dispatch(refreshJoke(id))

    const handleDeleteJoke = (id) => {
        const localJokes = JSON.parse(localStorage.getItem("jokes")) || []
        const updatedJokes = localJokes.filter((joke) => joke.id !== id)

        dispatch(deleteJoke(id))

        localStorage.removeItem("jokes")
        localStorage.setItem("jokes", JSON.stringify(updatedJokes))
    }

    const handleAddJoke = (id) => {
        const localJokes = JSON.parse(localStorage.getItem("jokes")) || []
        const joke = jokes.find((joke) => joke.id === id) || undefined
        const hasSpecificJoke = localJokes.some((joke) => joke.id === id)

        return !hasSpecificJoke ? localStorage.setItem("jokes", JSON.stringify([...localJokes, joke])) : null
    }

    if (!jokes) return <Box textAlign="center">...Loading</Box>

    return (
        <Grid
            container
            spacing={3}
            xs={12}
        >
            {
                jokes.map((joke) =>
                    <Grid key={joke.id} item xs={3}>
                        <JokesItem
                            joke={joke}
                            onDeleteJoke={handleDeleteJoke}
                            onAddJoke={handleAddJoke}
                            onRefreshJoke={handleRefreshJoke}
                        />
                    </Grid>
                )
            }
        </Grid>
    )
}

export default Jokes;