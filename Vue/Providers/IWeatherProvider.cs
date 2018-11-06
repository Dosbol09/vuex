using System.Collections.Generic;
using Vue.Models;

namespace Vue.Providers
{
    public interface IWeatherProvider
    {
        List<WeatherForecast> GetForecasts();
    }
}
