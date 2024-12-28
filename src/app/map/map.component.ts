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

  chartData = [
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

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.getAllCounties().subscribe(countries => {
      this.countries = countries;
      this.chartData = countries.map(c => [c.code, 0])
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
      const country = this.chartData[selectedItem.row][0];
      console.log(`Selected country: ${country}`);
    }
  }
}
