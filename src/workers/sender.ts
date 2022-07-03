import axios from 'axios';
import { IJson, IListener, IRepo } from 'motifs';
import { IDelivery, IEvent, IWebhook } from '../models';

export async function configureSender(
  webhookRepo : IRepo<IWebhook>,
  deliveryRepo: IRepo<IDelivery>,
  listener    : IListener<IEvent>,   // listens to internal queue system
) {

  listener.onMessage(async (evt: IEvent) => {
    console.info('new event', evt);

    const { ownerId, kindId } = evt;
    let webhooks = await webhookRepo.findMany({ ownerId, active: true });
    webhooks = webhooks.filter(h => h.kindIds.includes(kindId));

    for (const wh of webhooks) {
      let status = 200, body: IJson = '';
      try {
        const client = axios.create({ baseURL: wh.url, validateStatus: () => true }); // ignore status validation
        const res = await client.post(wh.url, { data: evt });
        status    = res.status;
        body      = res.data;
      } catch (err) {
        console.error('error notifying webhook', wh);
      }
      try {
        await deliveryRepo.create({
          webhookId: wh.id,
          request:  { method: 'POST', url: wh.url },
          response: { status, body },
        });
      } catch (err) {
        console.error('error saving delivery', err);
      }
    }
    
  });

  await listener.listen();

  return { deliveryRepo, listener, webhookRepo };
}
