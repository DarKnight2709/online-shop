import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadBrands = createAsyncThunk(
    'brandsList/loadBrands',
    async() => {
        try{       
            const endpoint = 'http://localhost:5000/api/brand/brands'
            
            const response = await fetch(endpoint, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                const jsonResponse = await response.json();
                return jsonResponse;
            } else {
                return Promise.reject();
            }
            
        } catch(e) {
            console.error('Error getting brands data.');
        }
    }
)

export const brandsListSlice = createSlice({
    name: 'brandsList',
    initialState : {
        brands: [],
        isLoadingBrands: false,
        failedLoadingBrands: false,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadBrands.pending, (state) => {
                state.isLoadingBrands = true;
                state.failedLoadingBrands = false;
            })
            .addCase(loadBrands.fulfilled, (state, action) => {
                state.isLoadingBrands = false;
                state.failedLoadingBrands = false;
                state.brands = action.payload.brands;
            })
            .addCase(loadBrands.rejected, (state) => {
                state.isLoadingBrands = false;
                state.failedLoadingBrands = true;
            })
    }
})

export const selectAllBrands = (state) => state.brandsList.brands;
export const isLoadingBrands = (state) => state.brandsList.isLoadingBrands;
export const failedLoadBrands = (state) => state.brandsList.failedLoadingBrands;

export default brandsListSlice.reducer;