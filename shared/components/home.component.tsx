import { Fragment } from 'react';
import { SwipperComponent } from './swipper.component';
import { RotatingImage } from './rotate.component';
import { LoadingCircle } from './loadin.component';
import { useAppStore } from '../hooks/use-app-store.hook';

export const HomeContainer = ({ isLoading }: { isLoading: boolean }) => {
  const loading = useAppStore((state) => state.isLoading);

  const isAllLoaded = !loading && !isLoading;

  return (
    <Fragment>
      {!isAllLoaded ? <LoadingCircle /> : null}

      {isAllLoaded ? <SwipperComponent /> : null}

      <RotatingImage />
    </Fragment>
  );
};
