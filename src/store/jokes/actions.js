import { createAsyncThunk } from '@reduxjs/toolkit';
import { ActionType } from './common.js';
import { BASIC_RANDOM_JOKE, BASIC_TEN_JOKES } from "../../common/constants/constants";

const loadJokes = createAsyncThunk(
    ActionType.SET_ALL_JOKES,
    async () => {
        const jokes = await fetch(BASIC_TEN_JOKES)
            .then(res => res.json())

        return { jokes };
    }
);

const loadMoreJokes = createAsyncThunk(
    ActionType.LOAD_MORE_JOKES,
    async (_, { getState }) => {
        const {
            jokes: { jokes }
        } = getState();

        const loadedJokes = await fetch(BASIC_TEN_JOKES)
            .then(res => res.json())

        const filteredJokes = loadedJokes.filter(
            joke => !(jokes && jokes.some(loadedJoke => joke.id === loadedJoke.id))
        );

        return { jokes: filteredJokes };
    }
);

const refreshJoke = createAsyncThunk(
    ActionType.REFRESH_JOKE,
    async (jokeId, { getState }) => {
        const newJoke = await fetch(BASIC_RANDOM_JOKE)
            .then(res => res.json());

        const {
            jokes: { jokes }
        } = getState();

        const filteredJokes = jokes.map(
            joke => joke.id !== jokeId ? joke : newJoke
        );

        return { jokes: filteredJokes, joke: newJoke};
    }
);

const deleteJoke = createAsyncThunk(
    ActionType.DELETE_JOKE,
    async (jokeId, { getState }) => {
        const {
            jokes: { jokes }
        } = getState();

        const filteredJokes = jokes.filter((joke) => joke.id !== jokeId)

        return { jokes: filteredJokes }
    }
);

export {
    loadJokes,
    loadMoreJokes,
    refreshJoke,
    deleteJoke
};