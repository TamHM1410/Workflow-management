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
export const priorityOneSlice = createSlice({
    name: 'priorityOne',
    initialState,
    reducers: {
      
      priorityOneState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {priorityOneState} = priorityOneSlice.actions
  export default priorityOneSlice.reducer