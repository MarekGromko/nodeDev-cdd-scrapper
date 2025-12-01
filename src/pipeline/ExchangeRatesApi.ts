import { Env, Profile , BaseURL, Interval, Pipeline, QueryingStep, ParsingStep,  } from "@common/decorator";
import { ErrorBreakpoint, NormalRejectionBreakpoint } from "@src/breakpoint";
import { Currency } from "@src/model/currency.model";
import { Logger } from "winston";

@Pipeline()
class ExchangeRatesApi {
    pipelineName!: string;
    logger!:       Logger

    @Env("pipelines.exchange-rates-api.access_key")
    access_key!: string

    @Profile("etag")
    etag!: string | undefined

    @BaseURL("https://api.exchangeratesapi.io/v1/latest")
    @Interval([99, "1m"])
    @QueryingStep
    async query(inst: Axios.AxiosInstance) {
        let req = await inst.get("/latest", {
            params: {
                access_key: this.access_key,
                base: "USD"
            }
        });

        if(req.status != 200)
            throw new ErrorBreakpoint();

        if(req.headers["ETag"] === this.etag)
            return new NormalRejectionBreakpoint();
        return req;
    }

    @ParsingStep
    parse(res: Axios.AxiosXHR<unknown>) {
        var data = JSON.parse(res.data as string);
        return Object.entries(data.rates)
            .map(([code, rate])=>{
                return {
                    code, 
                    rate,
                    timestamp: new Date(data.timestamp),
                    api: this.pipelineName
                } as Currency
            });
    }
}