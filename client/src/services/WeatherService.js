var _ = require('lodash');
var differenceInHours = require('date-fns/differenceInHours').default
var parseISO  = require('date-fns/parseISO').default


const SUCCESS_CODE = "200";
const FORECAST_INTERVAL_IN_HOURS = 3;
function findForecastForDate(forecast, isoDate) {
    var date = parseISO(isoDate);
    return forecast && forecast.cod ===  SUCCESS_CODE
        ? _.find(forecast.list, hourForecast => differenceInHours(new Date(hourForecast.dt), date) < FORECAST_INTERVAL_IN_HOURS)
        : forecast && forecast.message || "";
}

export default class WeatherService {

    constructor(fetch, baseUrl, apiKey) {
        this.fetch = fetch;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
    }

    async getForecast(location, isoDate) {
        return this.fetch(this.baseUrl + "/forecast?q=" + encodeURIComponent(location) + "&appid=" + this.apiKey, { method: "GET" })
        .then(res => res.json())
        .then(forecast => findForecastForDate(forecast, isoDate));
    }
}
