import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface editProjectState{
    Id: number,
    Name: string,
    Payment: number,
    TimeStart: string,
    TimeEnd: string,
    Note: string,
    Priority: number

}
const initialState:editProjectState={
    Id: 0,
    Name:'',
    Payment:0,
    TimeStart:'',
    TimeEnd:'',
    Note:'',
    Priority:0

}
export const editProjectSlice = createSlice({
    name: 'editProject',
    initialState,
    reducers: {
      
      editProjectState: (state, action: PayloadAction<editProjectState>) => {
          return action.payload;
        }
    },
  })
  export const {editProjectState} = editProjectSlice.actions
  export default editProjectSlice.reducer