import { AddButton } from '@/app/shared/components/add-button.component';
import { LinearContainer } from '@/app/shared/components/linear-containet.component';
import { LoadingCircle } from '@/app/shared/components/loadin.component';
import { useWishesStore } from '../wishes.store';
import { WishesAlertBox } from './wishes-alert-box';
import { WishesList } from './wishes-list';
import { WishesCreateModal } from './wishes-create-modal';
import { useEffect } from 'react';

export default function WishesContainer() {
  const isLoading = useWishesStore((state) => state.isLoading);
  const hasWishes = useWishesStore((state) => state.list.length > 0);
  const openModal = useWishesStore((state) => state.openModal);
  const getWishList = useWishesStore((state) => state.getWishList);

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <LinearContainer>
      {!hasWishes && !isLoading ? <WishesAlertBox /> : null}

      <AddButton onPress={openModal} />

      {isLoading ? <LoadingCircle /> : null}

      {hasWishes && !isLoading ? <WishesList /> : null}

      <WishesCreateModal />
    </LinearContainer>
  );
}
