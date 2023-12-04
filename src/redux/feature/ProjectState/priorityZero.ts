import { createSlice } from '@reduxjs/toolkit'
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
export const priorityZeroSlice = createSlice({
    name: 'priorityZero',
    initialState,
    reducers: {
      
      priorityZeroState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {priorityZeroState} = priorityZeroSlice.actions
  export default priorityZeroSlice.reducer