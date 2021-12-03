import { Publisher, OrderCancelledEvent, Subjects } from "@jd_dev/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
