import * as color from "colors/safe";
import { createLogger, format, transports } from "winston";

const leveledColor = (level: string) => {
    switch(level) {
        case "silly":   return color.grey
        case "debug":   return color.magenta
        case "verbose": return color.blue
        case "http":    return color.grey 
        case "info":    return color.green
        case "warn":    return color.yellow
        case "error":   return color.red
        default: return color.green
    }
}

const consoleFormat = format.printf(({timestamp, level, message, ...opts})=>{
    return [
        color.grey(`${timestamp}`),
        opts.pipeline       ? `(${opts.pipeline})` : '',
        opts.pipelineStep   ? `(${opts.pipelineStep})` : '',
        `[${leveledColor(level)}]`,
        `: ${level === "error" ? color.red(`${message}`) : message}`
    ].filter(x=>x).join(" ");
});

const consoleTransport = new transports.Console({
    format: format.combine(
        format.timestamp(),
        consoleFormat
    ),
    level: "silly",
});

const userTransport = new transports.Console({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    level: "info"
});

const errorTransport = new transports.File({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    level: "error"
});

export const rootLogger = createLogger({
    level: 'silly',
    transports: [
        consoleTransport,
        userTransport,
        errorTransport
    ]
});

export const makeLogger = (pipeline?: string, pipelineStep?: string)=>{
    let opts = {} as any; 
    if(pipeline)
        opts.pipeline = pipeline;
    if(pipelineStep)
        opts.pipelineStep = pipelineStep;
    return rootLogger.child(opts);
}