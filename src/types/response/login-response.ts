export interface LoginResponse {
  accessToken: string
  refreshToken: string
  userInfo: UserInfo
}

export interface UserInfo {
  id: number
  createdAt: string
  updatedAt: string
  name: string
  email: string
  avatar: string
  phoneNumber: string
  isAdmin: boolean
  gender: string
  status: string
  isDeleted: boolean
  roles: string[]
}
