import { createSlice } from '@reduxjs/toolkit'

const initialState={
    data:[]
}
export const getRoleUserSlice = createSlice({
    name: 'getRoleUser',
    initialState,
    reducers: {
      
      getRoleUserState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {getRoleUserState} = getRoleUserSlice.actions
  export default getRoleUserSlice.reducer
