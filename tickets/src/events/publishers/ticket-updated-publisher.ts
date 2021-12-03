import { Publisher, Subjects, TicketUpdatedEvent } from "@jd_dev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
};
