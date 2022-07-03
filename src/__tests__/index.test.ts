import { expect } from 'chai';
import { IDelivery, IEvent, IEventKind, IOwner, IWebhook } from '../models';
import { GanchoService } from '../services';

describe('GanchoService', () => {

  const gancho = GanchoService.useMemory();

  const eventKindUserCreated = {
    id   : 'user.created',
    title: 'User created',
    desc : 'Event triggered after a user is created',
  };

  const owner1: Partial<IOwner> = {
    title: 'Owner 1',
  };

  const url1 = 'http://example.com';

  const webhook1: Partial<IWebhook> = {
    ownerId: '', // to be filled
    kindIds: [ eventKindUserCreated.id ],
    url    : url1,
  };

  const event1: Partial<IEvent> = {
    kindId : eventKindUserCreated.id,
    ownerId: '', // to be filled,
    data   : { userId: '123' },
  }

  const delivery1: Partial<IDelivery> = {
    webhookId: '', // to be filled
    request  : { method: 'GET', url: url1 },
    response : { status: 200, body: 'OK' },
  };

  it('should be loaded', () => {
    expect(gancho instanceof GanchoService).to.eq(true);
  });

  it('should create event kind', async () => {
    const created = await gancho.repoEventKinds.create(eventKindUserCreated);
    expect(typeof created === 'object').to.eq(true);
    expect('createdAt' in eventKindUserCreated).to.eq(true);
    console.log({ eventKindUserCreated });
  });

  it('should create owner', async () => {
    const created = await gancho.repoOwners.create(owner1);
    expect(typeof created === 'object').to.eq(true);
    expect('id' in owner1).to.eq(true);
    console.log({ owner1 });
  });

  it('should create webhook', async () => {
    webhook1.ownerId = owner1.id ?? '';
    const created = await gancho.repoWebhooks.create(webhook1);
    expect(typeof created === 'object').to.eq(true);
    expect('id' in webhook1).to.eq(true);
    console.log({ webhook1 });
  });

  it('should create event', async () => {
    event1.ownerId = owner1.id ?? '';
    const created = await gancho.repoEvents.create(event1);
    expect(typeof created === 'object').to.eq(true);
    expect('id' in event1).to.eq(true);
    console.log({ event1 });
  });

  it('should create delivery', async () => {
    delivery1.webhookId = webhook1.id ?? '';
    const created = await gancho.repoDelivery.create(delivery1);
    expect(typeof created === 'object').to.eq(true);
    expect('id' in delivery1).to.eq(true);
    console.log({ delivery1 });
  });

  it('should list deliveries', async () => {
    const deliveries = await gancho.repoDelivery.findMany({ webhookId: webhook1.id ?? '' });
    expect(Array.isArray(deliveries)).to.eq(true);
    console.log({ deliveries });
  });

  it('should retrieve a delivery', async () => {
    const delivery = await gancho.repoDelivery.retrieve(delivery1.id ?? '');
    expect(delivery.id).to.eq(delivery1.id ?? '');
    console.log({ delivery });
  });

  it('should update a delivery', async () => {
    const change = { reponse: { status: 400 } };
    const updated = await gancho.repoDelivery.update(delivery1.id ?? '', change);
    expect(typeof updated === 'object').to.eq(true);
    console.log({ updated });
  });

  it('should retrieve a delivery', async () => {
    const deleted = await gancho.repoDelivery.delete_(delivery1.id ?? '');
    expect(deleted).to.eq(true);
    console.log({ deleted });
  });
});
