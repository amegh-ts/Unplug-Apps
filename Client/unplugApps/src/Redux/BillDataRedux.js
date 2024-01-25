import { createSlice } from '@reduxjs/toolkit';

const BillData = createSlice({
    name: 'BillData',
    initialState: {
        currentBill: [],
    },
    reducers: {
        billDetail: (state, action) => {
            state.currentBill = action.payload;
            console.log('Reducer payload:', action.payload);
        },
        billClear:(state)=>{
            state.currentBill=[]
        }
    },
});

export const { billDetail,billClear } = BillData.actions;

export default BillData.reducer;
