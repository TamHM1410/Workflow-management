import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface types{
    Id: number,
    Name: string,
    Payment: number,
    TimeStart: string,
    TimeEnd: string,
    Note: string,
    Priority: number

}
const initialState:types={
    Id:0,
    Name:'',
    Payment:0,
    TimeStart:'',
    TimeEnd:'',
    Note:'',
    Priority:0,


}
export const processingProjectSlice = createSlice({
    name: 'processingProject',
    initialState,
    reducers: {
      
      processingProjectState: (state, action:PayloadAction<types>) => {
          return action.payload;
        }
    },
  })
  export const {processingProjectState} = processingProjectSlice.actions
  export default processingProjectSlice.reducer