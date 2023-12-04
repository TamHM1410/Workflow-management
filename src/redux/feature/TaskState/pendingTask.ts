
import { createSlice } from '@reduxjs/toolkit'




const initialState={
    data: []
}
export const getPendingSlice = createSlice({
    name: 'getPending',
    initialState,
    reducers: {
      
     
        getPedingState: (state, action) => {
            return action.payload;
          },
          
        
        
    },
  })
  export const { getPedingState} = getPendingSlice.actions

  export default getPendingSlice.reducer

