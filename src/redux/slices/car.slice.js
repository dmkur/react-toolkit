import {createAsyncThunk, createSlice, current} from "@reduxjs/toolkit";
import {carService} from "../../services";

const initialState = {
    cars: [],
    carForUpdate: null,
    errors: null,
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

const updateCarById = createAsyncThunk(
    'carSlice/updateById',
    async ({id, car}, {rejectWithValue}) => {
        try {
            const {data} = await carService.updateById(id, car);
            return data
        } catch (e) {
            return rejectWithValue(e.response.data)
        }

    }
);

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
            // console.log(current(state.cars))
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(updateCarById.fulfilled, (state, action) => {
                const currentCar = state.cars.find(value => value.id === action.payload.id);
                Object.assign(currentCar, action.payload)
                state.carForUpdate = null
            })
            .addDefaultCase((state, action) => {
                // console.log(action.type)
                // Так виглядає action - {type:"carSlice/getAll/rejected} -
                const [type] = action.type.split('/').slice(-1);
                type === 'rejected' ? state.errors = action.payload : state.errors = null
                //якщо запит невдалий наповнюємо стайт errors
                //якщо запит вдалий обнюляємо стейт errors
            })
});

const {reducer: carReducer, actions: {setCarForUpdate}} = carSlice;

const carActions = {
    getAll,
    setCarForUpdate,
    updateCarById,
}

export {
    carReducer,
    carActions
}