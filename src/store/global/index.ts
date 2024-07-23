export type IGlobalStoreState = {
  user: null | Record<string, any>
}

export type IGlobalActions = {
  updateUser: (user: IGlobalStoreState['user']) => void
}

export const globalStore = (set: any, get: any) => ({
  user: null,
  updateUser: (user: IGlobalStoreState['user']) => set({ user }),
})
