import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
export interface editState {
  
    Email:string,
    Name:string,
    Role:number
  
  
  }
  const initialState: editState = {
  
    Email:'',
    Name:'',
    Role: 0
   
    
  }  
  export const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
      
      editState: (state, action: PayloadAction<editState>) => {
          return action.payload;
        }
    },
  })
  export const { editState } = editSlice.actions

export default editSlice.reducer