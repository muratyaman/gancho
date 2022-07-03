import { IBaseDto, IdType, IJson } from '../types';

export const models = 1;

export interface IEventKind extends IBaseDto {
  title: string;
  desc?: string;
}

export interface IOwner extends IBaseDto {
  title?: string;
}

export interface IEvent extends IBaseDto {
  ownerId: IdType;
  kindId:  IdType;
  data:    IJson;
}

export interface IWebhook extends IBaseDto {
  ownerId : IdType;
  kindIds : IdType[];
  url     : string;
  active  : boolean;
  settings: IJson;
}

export interface IDelivery extends IBaseDto {
  webhookId: IdType;
  request:   IJson;
  response:  IJson;
}
