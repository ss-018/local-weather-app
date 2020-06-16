import { Component, OnInit } from "@angular/core";

import { ICurrentWeather } from "../interfaces";
import { WeatherService } from "../weather/weather.service";

@Component({
	selector: "app-current-weather",
	templateUrl: "./current-weather.component.html",
	styleUrls: ["./current-weather.component.css"],
})
export class CurrentWeatherComponent implements OnInit {
	current: ICurrentWeather;

	constructor(private weatherService: WeatherService) {}

	getOrdinal(date: number): string {
		const n = new Date(date).getDate();
		return n > 0 ? ["th", "st", "rd", "nd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : "";
	}

	ngOnInit(): void {
		this.weatherService
			.getCurrentWeather("Seattle", "US")
			.subscribe((data) => (this.current = data));
	}
}
