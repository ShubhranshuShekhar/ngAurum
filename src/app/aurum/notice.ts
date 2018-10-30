import { Timestamp } from "../../../node_modules/rxjs/internal/operators/timestamp";

export class Notice {
  title: string;
  details: string;
  date: Timestamp<any>;
  receiver: string;
  sender: string;
  designation: string;
  department: string;
  addressedTo: string;
  noticeId: string;
  docId: string;

}
