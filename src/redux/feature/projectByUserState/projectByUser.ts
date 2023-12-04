import { createSlice } from '@reduxjs/toolkit'


const initialState={
    data:[]

}
export const getProjectByUserSlice = createSlice({
    name: 'getProjectByUser',
    initialState,
    reducers: {
      
      getProjectByUserState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {getProjectByUserState} = getProjectByUserSlice.actions
  export default getProjectByUserSlice.reducer
