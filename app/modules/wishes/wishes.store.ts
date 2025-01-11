import { create } from 'zustand';
import { Wish } from './wish.interface';
import { createWish, getWishes } from './wishes.service';

const defaultWish = {
  description: '',
  locked: false,
};

interface State {
  showModal: boolean;
  isLoading: boolean;
  list: Wish[];
  wish: Wish;
  error: string;
}

interface Actions {
  clearWish: () => void;
  addOneEmpty: () => void;
  writeOnWish: (myWish: Partial<Wish>) => void;
  closeModal: () => void;
  openModal: () => void;
  createWish: (myWish: Wish) => void;
  getWishList: () => void;
}

export const useWishesStore = create<State & Actions>((set) => {
  return {
    error: '',
    showModal: true,
    isLoading: false,
    wish: { ...defaultWish },
    list: [],
    clearWish: () => {
      set({ wish: { ...defaultWish } });
    },
    closeModal: () => {
      set({
        showModal: false,
        error: '',
      });
    },
    openModal: () => {
      set({
        showModal: true,
        wish: { ...defaultWish },
        error: '',
      });
    },
    addOneEmpty: () => {
      set((state) => ({
        list: [...state.list, defaultWish],
      }));
    },
    writeOnWish: (myWish) => {
      set((state) => ({
        wish: {
          ...state.wish,
          ...myWish,
        },
      }));
    },
    getWishList() {
      set(() => ({
        isLoading: true,
      }));

      getWishes()
        .then((list) => {
          set(() => ({
            list: list,
            wish: { ...defaultWish },
          }));
        })
        .finally(() => {
          set(() => ({
            isLoading: false,
          }));
        });
    },
    createWish: (myWish) => {
      set(() => ({
        isLoading: true,
      }));
      createWish(myWish)
        .then(() => {
          set((state) => ({
            list: [...state.list, state.wish],
            wish: { ...defaultWish },
          }));
        })
        .catch((e: Error) => {
          set({ error: e.message });
        })
        .finally(() => {
          set(() => ({
            isLoading: false,
          }));
        });
    },
  };
});
