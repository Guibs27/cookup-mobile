import { create } from "zustand";

export const useLoginStore = create((set) => ({
  accessToken: '',
  public_id: '',
  name: '',
  avatar: '',
  email: '',
  birth_date: null, // Adicionando a nova propriedade

  login: (userLogin) => set({ ...userLogin }),
  logout: () => set({
    accessToken: '',
    public_id: '',
    name: '',
    avatar: '',
    email: '',
    birth_date: null // Resetando a nova propriedade
  }),
}));
