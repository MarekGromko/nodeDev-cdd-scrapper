interface DurationOptions {
    year?: number,
    mounth?: number,
    day?: number,
    hours?: number,
    minutes?: number
    second?: number,
    ms?: number
}

interface DurationConstructor {
    new (): Duration;
    new (durationMs: number): Duration;
    new (ISODuration: string): Duration;
    new (durationOpts: DurationOptions): Duration;
    (): Duration;
    (durationMs?: number): Duration;
    (durationISO?: string): Duration;
    (durationOpts?: DurationOptions): Duration;
    between(a: Date | number, b: Date | number): Duration
}

interface Duration {
    readonly ms: number;
    readonly seconds: number;
    readonly minutes: number;
    readonly hours: number;
    readonly days: number;
    readonly months: number;
    readonly years: number;

    addTo(date: Date | number): Date;
    subTo(date: Date | number): Date;
    plus(duration: Duration | number): Duration;
    minus(duration: Duration | number): Duration;
    valueOf():  number;
    toString(): string;
}

declare var Duration: DurationConstructor;