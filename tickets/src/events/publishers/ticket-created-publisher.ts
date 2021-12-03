import { Publisher, Subjects, TicketCreatedEvent } from "@jd_dev/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
};
