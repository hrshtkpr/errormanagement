export class Context {
  BusinessConcept: string;
  BusinessDomain: string;
  BusinessOperation: string;
  ComponentName: string;
  DateTime: string;
  HostName: string;
  ServiceName: string;
  TechnicalDomain: string;
  TransactionID: string;
  constructor({BusinessConcept, BusinessDomain, BusinessOperation, ComponentName,
              DateTime, HostName, ServiceName, TechnicalDomain, TransactionID}) {
    this.BusinessConcept = BusinessConcept;
    this.BusinessDomain = BusinessDomain;
    this.BusinessOperation = BusinessOperation;
    this.ComponentName = ComponentName;
    this.DateTime = DateTime;
    this.HostName = HostName;
    this.ServiceName = ServiceName;
    this.TechnicalDomain = TechnicalDomain;
    this.TransactionID = TransactionID;
  }
}
export class Logs {
  Log: Log[];
}
export class Log {
  Event: string;
  ID: string;
  JobKey: string;
  Context: Context;
}
export class FlatLog extends  Context {
  Event: string;
  ID: string;
  JobKey: string;
  constructor(log: Log) {
    super(log.Context);
    this.Event = log.Event;
    this.ID = log.ID;
    this.JobKey = log.JobKey;
  }
}
