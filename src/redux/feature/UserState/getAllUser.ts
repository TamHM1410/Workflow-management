import { createSlice } from '@reduxjs/toolkit'


const initialState={
    data:[]
}
export const getUserSlice = createSlice({
    name: 'getUser',
    initialState,
    reducers: {
      
      getUserState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {getUserState} = getUserSlice.actions
  export default getUserSlice.reducer
