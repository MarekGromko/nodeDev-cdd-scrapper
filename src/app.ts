import "reflect-metadata";
import "@common/global";
import "@common/setup.config";
import "./pipeline/ExchangeRatesApi";

import pipelines from "@common/pipelines";
import { makeLogger } from "@common/logger";

for (let Pipeline of pipelines) {
    const profile   = {
        name: Pipeline.name
    } as Record<string, any>;
    const pipeline  = new Pipeline();
    const logger    = makeLogger(Pipeline.name);
    pipeline.name   = profile.name;
    pipeline.logger = logger;
    const queryMeta = Reflect.getMetadata("QueryingStep", Pipeline.prototype);
    logger.info(Pipeline.name);
    
}