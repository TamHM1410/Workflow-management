import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface editTaskState{
    Id:number,
    UserEmail:string,
    ProjectId:number,
    TimeStart:string,
    TimeEnd:string,
    Note:string,
    Status:number

}
const initialState :editTaskState={
    Id:0,
    UserEmail:'',
    ProjectId:0,
    TimeStart:'',
    TimeEnd:'',
    Note:'',
    Status:0
}
export const editTaskSlice = createSlice({
    name: 'editTask',
    initialState,
    reducers: {
      
      editTaskState: (state, action: PayloadAction<editTaskState>) => {
          return action.payload;
        }
    },
  })
  export const { editTaskState } = editTaskSlice.actions

  export default editTaskSlice.reducer