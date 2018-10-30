import { Timestamp } from "../../../node_modules/rxjs/internal/operators/timestamp";

export class Exam {
  category: string;
  createdByDisplayName: string;
  createdById: string;
  division: string;
  evalDate: Timestamp<any>;

  examId: string;
  maxMarks: string;
  state: string;
  subject: string;
  topic: string;

  docId: string;
}
