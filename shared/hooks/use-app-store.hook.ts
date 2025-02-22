import { create } from 'zustand';
import { ZodiacSign } from '../entities/zodiac-sign.entity';
import { getHoroscope as getHoroscopeService } from '@/shared/services/get-horoscope.service';

interface State {
  data: ZodiacSign[];
  errors: string[];
  isLoading: boolean;
  position: number;
  formatedDate: string;
  pushNotificationToken: string;
}

interface Actions {
  getHoroscope: () => Promise<void>;
  setErrors: (errors: string[]) => void;
  setPosition: (position: number) => void;
  setPushNotificationToken: (token: string) => void;
}

export const useAppStore = create<State & Actions>((set) => ({
  data: [],
  errors: [],
  isLoading: false,
  position: 0,
  formatedDate: '',
  pushNotificationToken: '',
  setPushNotificationToken: (token) => set({ pushNotificationToken: token }),
  getHoroscope: async () => {
    set({ isLoading: true });

    const data = await getHoroscopeService();

    if (typeof data === 'string') {
      set({ errors: [data] });
    } else {
      set({ data: data.data, formatedDate: data.formatedData });
    }

    set({ isLoading: false });
  },
  setErrors: (errors) => set({ errors }),
  setPosition: (position) => set({ position }),
}));
