import { Fragment, useEffect } from 'react';
import { SwipperComponent } from './swipper.component';
import { RotatingImage } from './rotate.component';
import { LoadingCircle } from './loadin.component';
import { useAppStore } from '../hooks/use-app-store.hook';
import { useFavoriteStorage } from '../hooks/favorite.storage';
import { useShallow } from 'zustand/shallow';

export const HomeContainer = ({ isLoading }: { isLoading: boolean }) => {
  const loading = useAppStore((state) => state.isLoading);
  const { isLoadingFavorite, loadFavorites } = useFavoriteStorage(
    useShallow((state) => ({
      isLoadingFavorite: state.isLoading,
      loadFavorites: state.loadFavorites,
    })),
  );
  const isAllLoaded = !loading && !isLoading && !isLoadingFavorite;

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <Fragment>
      {!isAllLoaded ? <LoadingCircle /> : null}

      {isAllLoaded ? <SwipperComponent /> : null}

      <RotatingImage />
    </Fragment>
  );
};
