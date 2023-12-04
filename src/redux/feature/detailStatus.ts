import { createSlice } from '@reduxjs/toolkit'


const initialState={
    Status: 0,
  

}
export const detailStatusSlice = createSlice({
    name: 'detailStatus',
    initialState,
    reducers: {
      
      detailStatusState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {detailStatusState} = detailStatusSlice.actions
  export default detailStatusSlice.reducer
