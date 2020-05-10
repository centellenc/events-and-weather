var _ = require('lodash');
var differenceInHours = require('date-fns/differenceInHours').default



const API_KEY_QUERY_PARAMETER = "&appid=990d1688684038ff997c7cf5ffb5ad8b";

const SUCCESS_CODE = "200";
const FORECAST_INTERVAL_IN_HOURS = 3;
function findForecastForDate(forecast, isoDate) {
    var date = new Date(Date.parse(isoDate));
    return forecast && forecast.cod ===  SUCCESS_CODE
        ? _.find(forecast.list, hourForecast => differenceInHours(new Date(hourForecast.dt), date) < FORECAST_INTERVAL_IN_HOURS)
        : forecast && forecast.message || "";
}

export default class WeatherService {

    constructor(fetch, baseUrl) {
        this.fetch = fetch;
        this.baseUrl = baseUrl;
    }

    async getForecast(location, isoDate) {
        return this.fetch(this.baseUrl + "/forecast?q=" + encodeURIComponent(location) + API_KEY_QUERY_PARAMETER, { method: "GET" })
        .then(res => res.json())
        .then(forecast => findForecastForDate(forecast, isoDate));
    }
}
