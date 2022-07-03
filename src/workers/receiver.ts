import { IListener, IRepo, uuid } from 'motifs';
import { IEvent } from '../models';

export async function configureReceiver(
  eventRepo: IRepo<IEvent>,
  listener : IListener<Partial<IEvent>>,   // listens to external notification system
) {

  listener.onMessage(async (evt: Partial<IEvent>) => {
    console.info('new event', evt);
    evt.id = uuid();
    await eventRepo.create(evt);
    // TODO: publish to internal queue system
  });

  await listener.listen();

  return { eventRepo, listener };
}
