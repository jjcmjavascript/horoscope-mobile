import { AddButton } from '@/shared/components/add-button.component';
import { LinearContainer } from '@/shared/components/linear-containet.component';
import { LoadingCircle } from '@/shared/components/loadin.component';
import { useWishesStore } from '../wishes.store';
import { WishesAlertBox } from './wishes-alert-box';
import { WishesList } from './wishes-list';
import { WishesCreateModal } from './wishes-create-modal';
import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { GoogleBanner } from '@/shared/components/google-banner.component';

export default function WishesContainer() {
  const { isLoading, hasWishes, openModal, getWishList } = useWishesStore(
    useShallow((state) => ({
      hasWishes: state.list.length > 0,
      openModal: state.openModal,
      getWishList: state.getWishList,
      isLoading: state.isLoading,
    })),
  );

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <LinearContainer>
      <GoogleBanner />

      {!hasWishes && !isLoading ? <WishesAlertBox /> : null}

      <AddButton onPress={openModal} />

      {isLoading ? <LoadingCircle /> : null}

      {hasWishes && !isLoading ? <WishesList /> : null}

      <WishesCreateModal />
    </LinearContainer>
  );
}
