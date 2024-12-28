import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChartType, GoogleChartComponent, GoogleChartsConfig } from 'angular-google-charts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('googleChart', {static: true}) googleChart!: GoogleChartComponent;
  
  chartType = ChartType.GeoChart;

  chartData = [
    ["Germany", 0],
    ["United States", 100],
  ];

  chartOptions = {
    region: 'world',
    displayMode: 'regions',
    colorAxis: { colors: ['red', 'green'] },
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
    }
  }
}
