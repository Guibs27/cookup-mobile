import { create } from "zustand";

export const useLoginStore = create((set) => ({
  accessToken: '',
  public_id: '',
  name: '',
  avatar: '',
  email: '',
  birth_date: null,

  login: (userLogin) => set({ ...userLogin }),
  logout: () => set({
    accessToken: '',
    public_id: '',
    name: '',
    avatar: '',
    email: '',
    birth_date: null
  }),
}));
