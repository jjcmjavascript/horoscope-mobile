import { config } from '@/config';
import { CardEntity } from '@/shared/entities/card.entity';
import { Orientation } from '@/shared/types/common.enums';

export const cardList = [
  'El Loco',
  'El Mago',
  'La Sacerdotisa',
  'La Emperatriz',
  'El Emperador',
  'El Hierofante',
  'Los Amantes',
  'El Carro',
  'Justicia',
  'El Ermitano',
  'Rueda de la Fortuna',
  'Fuerza',
  'El Colgado',
  'Muerte',
  'Templanza',
  'El Diablo',
  'La Torre',
  'La Estrella',
  'La Luna',
  'El Sol',
  'Juicio',
  'El Mundo',
  'As de Bastos',
  'Dos de Bastos',
  'Tres de Bastos',
  'Cuatro de Bastos',
  'Cinco de Bastos',
  'Seis de Bastos',
  'Siete de Bastos',
  'Ocho de Bastos',
  'Nueve de Bastos',
  'Diez de Bastos',
  'Sota de Bastos',
  'Caballero de Bastos',
  'Reina de Bastos',
  'Rey de Bastos',
  'As de Copas',
  'Dos de Copas',
  'Tres de Copas',
  'Cuatro de Copas',
  'Cinco de Copas',
  'Seis de Copas',
  'Siete de Copas',
  'Ocho de Copas',
  'Nueve de Copas',
  'Diez de Copas',
  'Sota de Copas',
  'Caballero de Copas',
  'Reina de Copas',
  'Rey de Copas',
  'As de Oros',
  'Dos de Oros',
  'Tres de Oros',
  'Cuatro de Oros',
  'Cinco de Oros',
  'Seis de Oros',
  'Siete de Oros',
  'Ocho de Oros',
  'Nueve de Oros',
  'Diez de Oros',
  'Sota de Oros',
  'Caballero de Oros',
  'Reina de Oros',
  'Rey de Oros',
];

const formatName = (name: string) =>
  name.trim().toLowerCase().replace(/\s/g, '-').concat('.png');

export const cardBackUrl = `${config.imageUrl}/back.png`;

export const getCardUrl = (name: string) =>
  `${config.imageUrl}/${formatName(name)}`;

export const cardsRandom: CardEntity[] = cardList
  .sort(() => Math.random() - 0.5)
  .map(
    (card, i) =>
      new CardEntity({
        index: i + 1,
        name: card,
        backUrl: cardBackUrl,
        cardUrl: getCardUrl(card),
        orientation: [Orientation.DOWN, Orientation.UP].sort(
          () => Math.random() - 0.5,
        )[0],
      }),
  );

export const tarotSelectOptions = [
  { label: '¿Qué me espera en el futuro cercano?', id: 29 },
  { label: '¿Encontraré el amor verdadero?', id: 1 },
  { label: '¿Mi pareja actual es la indicada?', id: 2 },
  // { label: '¿Cómo superar esta ruptura amorosa?', id: 3 },
  // { label: '¿Hay futuro en mi relación actual?', id: 4 },
  // { label: '¿Qué necesito hacer para mejorar mi relación?', id: 5 },
  { label: '¿Voy a conseguir el trabajo que deseo?', id: 6 },
  { label: '¿Debo cambiar de trabajo o quedarme donde estoy?', id: 7 },
  // { label: '¿Qué oportunidades laborales se aproximan?', id: 8 },
  // { label: '¿Cómo mejorar mi situación profesional?', id: 9 },
  // {
  //   label: '¿Estoy en el camino correcto para alcanzar mis metas laborales?',
  //   id: 10,
  // },
  { label: '¿Me irá bien económicamente este año?', id: 11 },
  { label: '¿Debo invertir en este proyecto?', id: 12 },
  { label: '¿Cómo puedo superar mis problemas financieros?', id: 13 },
  // {
  //   label: '¿Llegará una oportunidad económica importante para mí?',
  //   id: 14,
  // },
  {
    label: '¿Qué puedo hacer para mejorar mi salud física o mental?',
    id: 15,
  },
  { label: '¿Alguna advertencia sobre mi bienestar?', id: 16 },
  // {
  //   label: '¿Cómo mantenerme equilibrado en este momento de estrés?',
  //   id: 17,
  // },
  { label: '¿Cómo mejorar mi relación con mi familia?', id: 18 },
  // {
  //   label: '¿Qué puedo hacer para resolver este conflicto con un amigo?',
  //   id: 19,
  // },
  {
    label: '¿Qué mensaje tiene el tarot para mi entorno familiar?',
    id: 20,
  },
  // { label: '¿Cuál es mi propósito en la vida?', id: 21 },
  { label: '¿Qué me detiene en mi crecimiento personal?', id: 22 },
  { label: '¿Cómo puedo encontrar mi equilibrio espiritual?', id: 23 },
  // {
  //   label: '¿Qué lecciones debo aprender en este momento de mi vida?',
  //   id: 24,
  // },
  { label: '¿Es un buen momento para mudarme/cambiar de ciudad?', id: 26 },
];
