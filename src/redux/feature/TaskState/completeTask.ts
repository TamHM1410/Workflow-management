
import { createSlice } from '@reduxjs/toolkit'




const initialState={
    data: []
}
export const completeSlice = createSlice({
    name: 'complete',
    initialState,
    reducers: {
      
     
        getCompleteState: (state, action) => {
            return action.payload;
          },
          
        
        
    },
  })
  export const { getCompleteState} = completeSlice.actions

  export default completeSlice.reducer

