import { create } from 'zustand';

const defaultWish = {
  description: '',
  locked: false,
};

interface State {
  list: (typeof defaultWish)[];
  wish: typeof defaultWish;
}

interface Actions {
  clearWish: () => void;
  addOneEmpty: () => void;
}

export const wishesStore = create<State & Actions>((set) => {
  return {
    wish: { ...defaultWish },
    list: [],
    clearWish: () => {
      set({ wish: { ...defaultWish } });
    },
    addOneEmpty: () => {
      set((state) => ({
        list: [...state.list, defaultWish],
      }));
    },
  };
});
