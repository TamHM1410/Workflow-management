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
export const projectSevenSlice = createSlice({
    name: 'projectSeven',
    initialState,
    reducers: {
      
      projectSevenState: (state, action) => {
          return action.payload;
        }
    },
  })
  export const {projectSevenState} = projectSevenSlice.actions
  export default projectSevenSlice.reducer