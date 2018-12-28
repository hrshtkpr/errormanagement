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
  BusinessRefs: BusinessRefArr;
  TransactionData: string;
}

export class ExceptionDetail {
  Category: string;
  Severity: string;
  Type: string;
  Code: string;
  Message: string;
  DumpAnalysis: string;
  TransactionData: string;
}

export class LogDetail {
  LogMessage: string;
  Status: string;
  TransactionData: string;
}

export class EventASML {
  ID: string;
  JobKey: string;
  EventType: string;
  EventStatus: string;
  Context: Context;
  LogDetail: LogDetail;
  ExceptionDetail: ExceptionDetail;
}

export class FlatEvent {
  ID: string;
  JobKey: string;
  EventType: string;
  EventStatus: string;
  BusinessConcept: string;
  BusinessDomain: string;
  BusinessOperation: string;
  ComponentName: string;
  DateTime: string;
  HostName: string;
  ServiceName: string;
  TechnicalDomain: string;
  TransactionID: string;
  Category: string;
  Severity: string;
  Type: string;
  Code: string;
  Message: string;
  BusinessRefs: BusinessRefArr;
  DumpAnalysis: string;
  TransactionData: string;

  constructor(event: EventASML) {
    this.EventType = event.EventType;
    this.EventStatus = event.EventStatus;
    this.ID = event.ID;
    this.JobKey = event.JobKey;
    if (event.Context != null) {
      this.BusinessConcept = event.Context.BusinessConcept;
      this.BusinessDomain = event.Context.BusinessDomain;
      this.BusinessOperation = event.Context.BusinessOperation;
      this.ComponentName = event.Context.ComponentName;
      this.DateTime = event.Context.DateTime;
      this.HostName = event.Context.HostName;
      this.ServiceName = event.Context.ServiceName;
      this.TechnicalDomain = event.Context.TechnicalDomain;
      this.TransactionID = event.Context.TransactionID;
      this.BusinessRefs = {BusinessRef: null};
      if (event.Context.BusinessRefs != null && event.Context.BusinessRefs.BusinessRef != null
        && event.Context.BusinessRefs.BusinessRef.length > 0) {
        this.BusinessRefs.BusinessRef = [];
        for (const busRef of event.Context.BusinessRefs.BusinessRef) {
          this.BusinessRefs.BusinessRef.push({Name: busRef.Name, Value: busRef.Value});
        }
      }
    }
    if (event.ExceptionDetail != null) {
      this.Category = event.ExceptionDetail.Category;
      this.Severity = event.ExceptionDetail.Severity;
      this.Type = event.ExceptionDetail.Type;
      this.Code = event.ExceptionDetail.Code;
      this.Message = event.ExceptionDetail.Message;
      this.DumpAnalysis = event.ExceptionDetail.DumpAnalysis;
      this.TransactionData = event.ExceptionDetail.TransactionData;
    }
    if (event.LogDetail != null) {
      this.TransactionData = event.LogDetail.TransactionData;
    }

  }
}


export class Transaction {
  TransactionID: string;
  Status: string;
  StartDateTime: string;
  EndDateTime: string;
  BusinessRefs: BusinessRefArr;
}

export class BusinessRefArr {
  BusinessRef: BusinessRef[];
}

export class FlatTransaction {
  TransactionID: string;
  Status: string;
  StartDateTime: string;
  EndDateTime: string;

  constructor(transaction: Transaction) {
    if (transaction) {
      this.TransactionID = transaction.TransactionID;
      this.Status = transaction.Status;
      this.StartDateTime = transaction.StartDateTime;
      this.EndDateTime = transaction.EndDateTime;

      if (transaction.BusinessRefs) {
        for (const businessRef of transaction.BusinessRefs.BusinessRef) {
          this['' + businessRef.Name] = businessRef.Value;
        }
      }
    }
  }
}


/*export class FlatEvent {
  Status: string;
  ID: string;
  JobKey: string;

  BusinessConcept: string;
  BusinessDomain: string;
  BusinessOperation: string;
  ComponentName: string;
  DateTime: string;
  HostName: string;
  ServiceName: string;
  TechnicalDomain: string;
  TransactionID: string;

  Category: string;
  Severity: string;
  Type: string;
  Code: string;
  Message: string;
  TransactionData: string;
  DumpAnalysis: string;

  Timestamp: string;
  EventType: string; // L or E

  BusinessRefs: BusinessRef[];
}*/

export class BusinessRef {
  Name: string;
  Value: string;
}


