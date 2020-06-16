import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { injectSpy } from "angular-unit-test-helper";
import { of } from "rxjs";

import { MaterialModule } from "../material.module";
import { WeatherService } from "../weather/weather.service";
import { fakeWeather } from "../weather/weather.service.fake";
import { CurrentWeatherComponent } from "./current-weather.component";

describe("CurrentWeatherComponent", () => {
	let component: CurrentWeatherComponent;
	let fixture: ComponentFixture<CurrentWeatherComponent>;
	let weatherServiceMock: jasmine.SpyObj<WeatherService>;

	beforeEach(async(() => {
		const weatherServiceSpy = jasmine.createSpyObj("WeatherService", ["getCurrentWeather"]);
		TestBed.configureTestingModule({
			declarations: [CurrentWeatherComponent],
			providers: [
				{
					provide: WeatherService,
					useValue: weatherServiceSpy,
				},
			],
			imports: [MaterialModule],
		}).compileComponents();
		weatherServiceMock = injectSpy(WeatherService);
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CurrentWeatherComponent);
		component = fixture.componentInstance;
	});

	it("should create", () => {
		// Arrange
		weatherServiceMock.getCurrentWeather.and.returnValue(of());
		// Act
		fixture.detectChanges(); // triggers ngOnInit
		// Assert
		expect(component).toBeTruthy();
	});

	it("should get currentWeather from weatherService", () => {
		// Arrange
		weatherServiceMock.getCurrentWeather.and.returnValue(of());
		// Act
		fixture.detectChanges();
		// Assert
		expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
	});

	it("should eagerly load currentWeather in Seattle from weatherService", () => {
		// Arrange
		weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
		// Act
		fixture.detectChanges();
		// Assert
		expect(component.current).toBeDefined();
		expect(component.current.city).toEqual("Seattle");
		expect(component.current.temperature).toEqual(280.32);

		// Assert on DOM
		const debugE1 = fixture.debugElement;
		const titleE1: HTMLElement = debugE1.query(By.css("span")).nativeElement;
		expect(titleE1.textContent).toContain("Seattle");
	});
});
