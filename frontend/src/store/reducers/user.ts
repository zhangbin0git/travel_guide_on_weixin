import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'

interface UserState {
  userInfo: User | null
  token: string | null
  isLogin: boolean
}

const initialState: UserState = {
  userInfo: null,
  token: null,
  isLogin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload
      state.isLogin = true
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.userInfo = null
      state.token = null
      state.isLogin = false
    }
  }
})

export const { setUserInfo, setToken, logout } = userSlice.actions
export default userSlice.reducer