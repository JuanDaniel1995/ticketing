import { Subjects, Publisher, ExpirationCompleteEvent } from "@jd_dev/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
