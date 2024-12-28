import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartType, GoogleChartComponent, GoogleChartsConfig } from 'angular-google-charts';
import { MapService } from './map.service';
import { Country } from './map.domain';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {

  @ViewChild('googleChart', {static: true}) googleChart!: GoogleChartComponent;
  
  chartType = ChartType.GeoChart;

  chartData: [string, number][] = [
    ["Russia", 0],
    ["Germany", 1],
    ["United States", 2],
  ];

  chartOptions = {
    region: 'world',
    displayMode: 'regions',
    colorAxis: { colors: ['grey', 'red', 'green'], values: [0, 1, 2] },
    legend: 'none',
    tooltip: {}
  }

  countries: Country[] = [];
  randomCountry?: Country;
  attemptedCapitals: string[] = [];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getAllCounties().subscribe(countries => {
      this.countries = countries;
      this.chartData = countries.map(c => [c.code, 0]);
      this.randomCountry = this.getRandomCountry(this.countries);
    })
  }

  ngAfterViewInit(): void {
    if (this.googleChart) {
      this.googleChart.ready.subscribe(_ => {
        const chart = this.googleChart.chartWrapper.getChart();
        google.visualization.events.addListener(chart, 'select', () => this.onSelect(chart));
      })
    }
  }

  onSelect(chart: any) {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const selectedCountry = this.chartData[selectedItem.row][0];
      if (this.randomCountry) {
        this.updateChartData(this.randomCountry.code, selectedCountry === this.randomCountry.code ? 2 : 1);
        this.attemptedCapitals.includes(this.randomCountry.capital);
        this.randomCountry = this.getRandomCountry(this.countries.filter(c => !this.attemptedCapitals.includes(c.capital)));
      }
      console.log(`Selected country: ${selectedCountry}`);
    }
  }

  getRandomCountry(countries: Country[]) {
    const i = Math.floor(Math.random() * countries.length);
    return countries[i];
  }

  updateChartData(countryCode: string, colorValue: number) {
    this.chartData = this.chartData.map(row => [row[0], countryCode === row[0] ? colorValue : row[1]]);
  }
}
