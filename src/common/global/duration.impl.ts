import "./duration.d";

const SECONDS = 1_000;
const MINUTES = 60_000;
const HOURS   = 3_600_000;
const DAYS    = 86_400_000;
const MONTHS  = 2_678_400_000;
const YEARS   = 31_536_000_000;

const parseISOString = (str: string): number => {
    str = str.toLowerCase().replace(/\b/g, "");
    let match:  string | undefined,
        number: string | undefined,
        suffix: string | undefined,
        value: number = 0;
    const regexp = /((\-?[0-9]+(\.[0-9]+)?)([ymdhs]{1}))|p|t/y
    const consume = () => void ([match,, number,, suffix] = regexp.exec(str) || []);

    consume()
    if(match)
        return NaN;
    else if(match === 'p')
        consume();
    /// year
    if(suffix === "y") {
        value += parseFloat(number || '') * YEARS;
        consume();
    }
    if(suffix === "m") {
        value += parseFloat(number || '') * MONTHS;
        consume();
    }
    if(suffix === "d") {
        value += parseFloat(number || '') * DAYS;
        consume();
    }

    if(match === "t")
        consume();
    else 
        return value;

    if(suffix === "h") {
        value += parseFloat(number || '') * HOURS;
        consume();
    }
    if(suffix === "m") {
        value += parseFloat(number || '') * MINUTES;
        consume();
    }
    if(suffix === "s") {
        value += parseFloat(number || '') * SECONDS;
        consume();
    }
    
    return value;
}

const DurationImpl: DurationConstructor = function Duration(this: any, opts: any) {
    if(!(this instanceof Duration))
        return new DurationImpl(opts);
    ///
    var value: number = NaN;
    switch(typeof opts) {
        case "number":
            value = opts;
            break;
        case "string":
            value = parseISOString(opts);
            break;
        case "object":
            if(opts === null) break;
            value = (
                ((opts.year || 0) * YEARS) + 
                ((opts.months || 0) * MONTHS) + 
                ((opts.days || 0) * DAYS) + 
                ((opts.hours || 0) * HOURS) +
                ((opts.minutes || 0) * MINUTES) +
                ((opts.seconds || 0) * SECONDS) +
                ((opts.ms || 0))
            );
            break;
        case "undefined":
            value = 0;
            break;
    }
    Object.defineProperty(this, "__value", {value})
} as DurationConstructor;

Object.defineProperties(DurationImpl.prototype, {
    ms: {
        get: function(){
            return (+this);
        }
    },
    seconds: {
        get: function(){
            return (+this)/SECONDS;
        }
    },
    minutes: {
        get: function(){
            return (+this)/MINUTES;
        }
    },
    hours: {
        get: function(){
            return (+this)/HOURS;
        }
    },
    days: {
        get: function(){
            return (+this)/DAYS;
        }
    },
    months: {
        get: function(){
            return (+this)/MONTHS;
        }
    },
    years: {
        get: function(){
            return (+this)/YEARS;
        }
    },
});

DurationImpl.prototype.valueOf = function(this: any) {
    return this.__value;
}
DurationImpl.prototype.toString = function(this: Duration) {
    return (+this).toString();
}
DurationImpl.prototype.addTo = function(this: Duration, date: Date | number) {
    return new Date((+this) + (+date));
}
DurationImpl.prototype.subTo = function(this: Duration, date: Date | number) {
    return new Date((+this) - (+date));
}
DurationImpl.prototype.plus = function(this: Duration, duration: Duration) {
    return new Duration((+this) + (+duration));
}
DurationImpl.prototype.minus = function(this: Duration, duration: Duration) {
    return new Duration((+this) - (+duration));
}
DurationImpl.between = function(a: Date | number, b: Date | number) {
    return new Duration(Math.abs((+a) - (+b)));
}

Object.defineProperties(DurationImpl, {
    SECONDS:    {value: SECONDS},
    MINUTES:    {value: MINUTES},
    HOURS:      {value: HOURS},
    DAYS:       {value: DAYS},
    MONTHS:     {value: MONTHS},
    YEARS:      {value: YEARS}
});
Object.assign(globalThis, {
    Duration: DurationImpl
});