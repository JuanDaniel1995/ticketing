import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent, OrderStatus } from "@jd_dev/common";
import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket";

const generateMongooseId = () => {
  return new mongoose.Types.ObjectId().toHexString()
}

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: '123'
  });
  await ticket.save();
  const data: OrderCreatedEvent['data'] = {
    id: generateMongooseId(),
    version: 0,
    status: OrderStatus.Created,
    userId: '123',
    expiresAt: '123',
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, ticket, data, msg };
}

it('sets the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
