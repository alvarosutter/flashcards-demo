import { get, patch, post, remove } from './services';
import type { Card, Label } from '../../types';
import URL from '../../utils/url';

const url = `${URL}/cards`;

export async function createCard(body: object): Promise<Card> {
  const response = await post(url, body);

  if (response.status === 'success') {
    return response.data as Card;
  }
  throw new Error(response.message);
}

export async function getCards(): Promise<Array<Card>> {
  const response = await get(url);

  if (response.status === 'success') {
    return response.data as Array<Card>;
  }
  throw new Error(response.message);
}

export async function getCard(id: string): Promise<Card> {
  const response = await get(`${url}/${id}`);

  if (response.status === 'success') {
    return response.data as Card;
  }
  throw new Error(response.message);
}

export async function getCardLabels(id: string): Promise<Array<Label>> {
  const response = await get(`${url}/${id}/labels`);

  if (response.status === 'success') {
    return response.data as Array<Label>;
  }
  throw new Error(response.message);
}

export async function patchCard(id: string, body: object): Promise<Card> {
  const response = await patch(`${url}/${id}`, body);

  if (response.status === 'success') {
    return response.data as Card;
  }
  throw new Error(response.message);
}

export async function deleteCard(id: string): Promise<void> {
  const response = await remove(`${url}/${id}`);

  if (response.status === 'failure') {
    throw new Error(response.message);
  }
}
