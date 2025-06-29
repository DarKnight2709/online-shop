import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadCategories = createAsyncThunk(
    'categoriesList/loadCategories',
    async() => {
        try{       
            const endpoint = 'http://localhost:5000/api/category/'
            
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
            console.error('Error getting categories data.');
        }
    }
)

export const categoriesListSlice = createSlice({
    name: 'categoriesList',
    initialState : {
        categories: [],
        isLoadingCategories: false,
        failedLoadingCategories: false,
    },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategories.pending, (state) => {
                state.isLoadingCategories = true;
                state.failedLoadingCategories = false;
            })
            .addCase(loadCategories.fulfilled, (state, action) => {
                state.isLoadingCategories = false;
                state.failedLoadingCategories = false;
                state.categories = action.payload.categories;
            })
            .addCase(loadCategories.rejected, (state) => {
                state.isLoadingCategories = false;
                state.failedLoadingCategories = true;
            })
    }
})

export const selectAllCategories = (state) => state.categoriesList.categories;
export const isLoadingCategories = (state) => state.categoriesList.isLoadingCategories;
export const failedLoadCategories = (state) => state.categoriesList.failedLoadingCategories;

export default categoriesListSlice.reducer;