import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: [],
    errors: null
}

const getAll = createAsyncThunk(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
);

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addDefaultCase((state, action) => {
                // Так виглядає action - {type:"carSlice/getAll/rejected} -
                const {type} = action.type.split('/').slice(-1);
                type === 'rejected' ?
                    //якщо запит невдалий наповнюємо стайт errors
                    state.errors = action.payload :
                    //якщо запит вдалий обнюляємо стейт errors
                    state.errors = null

            })
});

const {reducer: carReducer} = carSlice;

const carActions = {
    getAll
}

export {
    carReducer,
    carActions
}