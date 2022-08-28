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

class Event {
  eventId!: string
  clientId!: string
  model!: string
  phone!: string
  qq!: string
  contactPreference!: string
  problem!: string
  member!: Member
  closedBy!: string
  closedByMember!: Member
  status!: Status
  logs!: EventLog[]
  gmtCreate!: string
  gmtModified!: string

  isCurrentMember(memberId: string) {
    if (this.member == null) {
      return false
    }
    return this.member.memberId === memberId
  }

  getPreviousLog(): EventLog | undefined {
    if (this.logs.length === 0) {
      return undefined
    }
    return this.logs[this.logs.length - 1]
  }
}

interface EventLog {
  logId: string
  description: string
  memberId: string
  action: Action
  gmtCreate: string
}

export type { Action, Status, Event, EventLog }
