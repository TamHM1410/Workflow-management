import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface loginState {
  Name: string,
  Email:string,
  Role:number,
  isLoggedIn:boolean
}

const initialState: loginState = {
  Name: '',
  Email:'',
  Role: 0,
  isLoggedIn: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    
    updateLoginState: (state, action: PayloadAction<loginState>) => {
        return action.payload;
      }
  },
})

// Action creators are generated for each case reducer function
export const { updateLoginState } = loginSlice.actions

export default loginSlice.reducer