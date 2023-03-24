import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./jokes/reducer";

const store = configureStore({
    reducer: {
        jokes: reducer,
    },
});

export { store };