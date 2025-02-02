import { create } from 'zustand';
import { ZodiacSignEnum } from '../types/common.enums';
import { loadFavorite, toggleFavorite } from '../services/favorite.service';

interface FavoriteStorageState {
  isLoading: boolean;
  favoriteSign: ZodiacSignEnum | null;
}

interface FavoriteStorageActions {
  loadFavorites: () => void;
  toggleFavorite: (favoriteSign: ZodiacSignEnum) => void;
}

export const useFavoriteStorage = create<
  FavoriteStorageState & FavoriteStorageActions
>((set) => ({
  favoriteSign: null,
  isLoading: false,
  loadFavorites: async () => {
    set({ isLoading: true });

    const favoriteSign = await loadFavorite();

    set({ favoriteSign: favoriteSign || null, isLoading: false });
  },

  toggleFavorite: async (favoriteSign: ZodiacSignEnum) => {
    const result = await toggleFavorite(favoriteSign);

    set({ favoriteSign: result });
  },
}));
