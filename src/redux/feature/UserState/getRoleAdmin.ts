import { createSlice } from '@reduxjs/toolkit'

const initialState={
    data:[]
}
export const getRoleAdminSlice = createSlice({
    name: 'getRoleAdmin',
    initialState,
    reducers: {
      
      getRoleAdminState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {getRoleAdminState} = getRoleAdminSlice.actions
  export default getRoleAdminSlice.reducer
