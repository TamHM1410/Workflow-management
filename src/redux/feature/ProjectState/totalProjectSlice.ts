import { createSlice } from '@reduxjs/toolkit'


const initialState={
    data:[]

}
export const getProjectSlice = createSlice({
    name: 'getProject',
    initialState,
    reducers: {
      
      getProjectState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {getProjectState} = getProjectSlice.actions
  export default getProjectSlice.reducer
