import { create } from 'zustand';
import { Wish } from './wish.interface';
import { createWishes, deleteWish, getAllWishes } from './wishes.service';

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
  destroyWish: (id: string) => void;
}

export const useWishesStore = create<State & Actions>((set) => {
  return {
    error: '',
    showModal: false,
    isLoading: true,
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

      getAllWishes()
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
      createWishes(myWish)
        .then((wish) => {
          if (wish) {
            set((state) => ({
              list: [...state.list, wish],
              wish: { ...defaultWish },
              showModal: false,
            }));
          }
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
    destroyWish: (wishId: string) => {
      set(() => ({
        isLoading: true,
      }));

      deleteWish(wishId)
        .then(() => {
          set((state) => {
            const newList = state.list.filter((i) => i.id !== wishId);

            return {
              list: newList,
            };
          });
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
