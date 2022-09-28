import type Member from "./member"

enum Action {
  Create = "create",
  Accept = "accept",
  Cancel = "cancel",
  Drop = "drop",
  Commit = "commit",
  AlterCommit = "alterCommit",
  Reject = "reject",
  Close = "close",
  Update = "update",
}

enum Status {
  Open = "open",
  Cancelled = "cancelled",
  Accepted = "accepted",
  Committed = "committed",
  Closed = "closed",
}

interface Event {
  eventId?: number
  clientId?: number
  model?: string
  phone?: string
  qq?: string
  contactPreference?: string
  problem?: string
  member?: Member
  closedBy?: string
  closedByMember?: Member
  status?: Status
  logs?: EventLog[]
  gmtCreate?: string
  gmtModified?: string
}

interface EventLog {
  logId: string
  description: string
  memberId: string
  action: Action
  gmtCreate: string
}

export type { Action, Status, Event, EventLog }
