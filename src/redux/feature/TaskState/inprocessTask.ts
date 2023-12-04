
import { createSlice } from '@reduxjs/toolkit'




const initialState={
    data: []
}
export const inprocessSlice = createSlice({
    name: 'inprocess',
    initialState,
    reducers: {
      
     
        getInprocessState: (state, action) => {
            return action.payload;
          },
          
        
        
    },
  })
  export const { getInprocessState} = inprocessSlice.actions

  export default inprocessSlice.reducer

