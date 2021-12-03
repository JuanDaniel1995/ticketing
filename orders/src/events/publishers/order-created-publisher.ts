import { Publisher, OrderCreatedEvent, Subjects } from "@jd_dev/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
