import { createReducer } from '@reduxjs/toolkit';
import {
    loadJokes,
    loadMoreJokes,
    refreshJoke,
    deleteJoke,
} from './actions.js';

const localJokes = JSON.parse(localStorage.getItem("jokes"));

const initialState = {
    jokes: localJokes || [],
    hasMoreJokes: true
};

const reducer = createReducer(initialState, builder => {
    builder.addCase(loadJokes.pending, state => {
        state.jokes = false;
    });
    builder.addCase(loadJokes.fulfilled, (state, action) => {
        const { jokes } = action.payload;

        state.jokes = localJokes ? [...localJokes, ...jokes] : jokes;
        state.hasMoreJokes = Boolean(jokes.length);
    });
    builder.addCase(loadMoreJokes.pending, state => {
        state.hasMoreJokes = null;
    });
    builder.addCase(loadMoreJokes.fulfilled, (state, action) => {
        const { jokes } = action.payload;

        state.jokes = state.jokes.concat(jokes);
        state.hasMoreJokes = Boolean(jokes.length);
    });
    builder.addCase(refreshJoke.fulfilled, (state, action) => {
        const { jokes, joke } = action.payload;

        state.jokes = jokes;
        state.refreshJoke = joke
    });
    builder.addCase(deleteJoke.fulfilled, (state, action) => {
        const { jokes } = action.payload;

        state.jokes = jokes;
    });
});

export { reducer };