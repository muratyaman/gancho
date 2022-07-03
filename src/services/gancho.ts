import Emittery from 'emittery';
import NodeCache from 'node-cache';
import * as C from '../constants';
import { IEvent, IEventKind, IDelivery, IOwner, IWebhook } from '../models';
import { IRepo, RedisClient, RepoWithMemory, RepoWithRedis } from '../repos';

export class GanchoService {
  
  constructor(
    public readonly em            : Emittery,// internal event manager
    public readonly repoEventKinds: IRepo<IEventKind>,
    public readonly repoOwners    : IRepo<IOwner>,
    public readonly repoWebhooks  : IRepo<IWebhook>,
    public readonly repoEvents    : IRepo<IEvent>,
    public readonly repoDelivery  : IRepo<IDelivery>,
  ) {
    // do nothing
  }

  static useMemory(): GanchoService {
    const em    = new Emittery();
    const cache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
    return new GanchoService(
      em,
      new RepoWithMemory<IEventKind>(C.COLL_EVENT_KIND, em, cache),
      new RepoWithMemory<IOwner>    (C.COLL_OWNER, em, cache),
      new RepoWithMemory<IWebhook>  (C.COLL_WEBHOOK, em, cache),
      new RepoWithMemory<IEvent>    (C.COLL_EVENT, em, cache),
      new RepoWithMemory<IDelivery> (C.COLL_DELIVERY, em, cache),
    );
  }

  static useRedis(cache: RedisClient): GanchoService {
    const em = new Emittery();
    return new GanchoService(
      em,
      new RepoWithRedis<IEventKind>(C.COLL_EVENT_KIND, em, cache),
      new RepoWithRedis<IOwner>    (C.COLL_OWNER, em, cache),
      new RepoWithRedis<IWebhook>  (C.COLL_WEBHOOK, em, cache),
      new RepoWithRedis<IEvent>    (C.COLL_EVENT, em, cache),
      new RepoWithRedis<IDelivery> (C.COLL_DELIVERY, em, cache),
    );
  }
}
