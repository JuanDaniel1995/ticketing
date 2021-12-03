import { Subjects, Publisher, PaymentCreatedEvent } from "@jd_dev/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
