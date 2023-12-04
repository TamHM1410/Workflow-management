
import { createSlice } from '@reduxjs/toolkit'




const initialState={
    data: []
}
export const getOverDueSlice = createSlice({
    name: 'getOverDue',
    initialState,
    reducers: {
      
     
        getOverdueState: (state, action) => {
            return action.payload;
          },
          
        
        
    },
  })
  export const { getOverdueState} = getOverDueSlice.actions

  export default getOverDueSlice.reducer

