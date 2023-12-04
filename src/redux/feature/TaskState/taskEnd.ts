
import { createSlice } from '@reduxjs/toolkit'




const initialState={
    data: []
}
export const taskEndSlice = createSlice({
    name: 'taskEnd',
    initialState,
    reducers: {
      
     
        getTaskEndState: (state, action) => {
            return action.payload;
          },
          
        
        
    },
  })
  export const { getTaskEndState} = taskEndSlice.actions

  export default taskEndSlice.reducer

