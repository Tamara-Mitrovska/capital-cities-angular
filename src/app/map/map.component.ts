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

  chartData = [ // country, color
    ["United States", 0],
    ["Germany", 100]
  ];

  chartOptions = {
    region: 'world',  // use codes like 150 for Europe, or 'world' for all
    displayMode: 'regions',  // Show regions (countries)
    colorAxis: { colors: ['red', 'green'] },  // Color range for regions based on value (0-100) from chartData list
    
    backgroundColor: '#f0f0f0',  // Background color for the chart
    datalessRegionColor: '#f5f5f5',  // Color for regions with no data
    defaultColor: '#f5f5f5'  // Default color for regions
  }

  ngAfterViewInit(): void {
    if (this.googleChart) {
      this.googleChart.ready.subscribe(_ => {
        const chart = this.googleChart.chartWrapper.getChart();  // Access the chart instance
        google.visualization.events.addListener(chart, 'select', () => this.onSelect(chart));
      })
    }
  }

  onSelect(chart: any) {
    const selection = chart.getSelection();
    if (selection.length > 0) {
      const selectedItem = selection[0];
      const countryName = this.chartData[selectedItem.row][0];
      const population = this.chartData[selectedItem.row][1];
      console.log(`You clicked on ${countryName}.`);
    }
  }
}
