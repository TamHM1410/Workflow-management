
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface DataType {
    Id: number,
    UserMail: string,
    ProjectId: number,
    TimeStart: string,
    TimeEnd: string,
    Status: number,
    Note: string,
    UserName: string,
    ProjectName: string,
    prjStart: string,
    prjEnd: string
}


const initialState={
    data: []
}
export const getTaskSlice = createSlice({
    name: 'getTask',
    initialState,
    reducers: {
      
      getTaskState: (state, action) => {
          return action.payload;
        }
    
        
        
    },
  })
  export const { getTaskState} = getTaskSlice.actions

  export default getTaskSlice.reducer

