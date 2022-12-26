
import { weatherFuture } from "./weatherfuture"

export interface weatherData {
    data: object,
    reason: string,
    result: object,
    city: string,
    realtime: object
    temperature: string,
    humidity: string,
    info: string,
    wid: string,
    direct: string,
    power: string,
    aqi: string,

    future: Array<weatherFuture>,
    error_code: number
    status: number,
    statusText: string,
    headers: object,
    "access-control-allow-origin": string,
    connection: string,
    "content-type": string,
    date: string,
    etag: string,
    "transfer-encoding": string
    ,
    config: object,
    transitional: object,
    silentJSONParsing: string,
    forcedJSONParsing: string,
    clarifyTimeoutError: string,
    adapter: object,
    xhr: string,
    http: string,
    transformRequest:string,
    transformResponse:string,
    timeout: number,
    xsrfCookieName: string,
    xsrfHeaderName: string,
    maxContentLength: number,
    maxBodyLength: number,
    env: object,
    Accept: string,
    method: string,
    url: string,
    request: string
}