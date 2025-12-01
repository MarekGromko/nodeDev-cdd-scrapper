export abstract class AbstractBreakpoint {
    public readonly reason: string | undefined;
    constructor(reason?: string) {
        this.reason = reason;
    }
}

export class NormalRejectionBreakpoint extends AbstractBreakpoint {}
export class AbnormalRejectionBreakpoint extends AbstractBreakpoint {}
export class ErrorBreakpoint extends AbstractBreakpoint {}
