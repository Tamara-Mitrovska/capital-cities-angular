import { Component } from '@angular/core';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  
  chartType = ChartType.GeoChart;

  chartData = [ // country, color
    ["United States", 0],
    ["Germany", 100]
  ];

  chartOptions = {
    region: 'world',  // Define the region (e.g., 'world', 'US', or any specific country)
    displayMode: 'regions',  // Show regions (countries)
    colorAxis: { colors: ['red', 'green'] },  // Color range for regions based on value
    backgroundColor: '#f0f0f0',  // Background color for the chart
    datalessRegionColor: '#f5f5f5',  // Color for regions with no data
    defaultColor: '#f5f5f5'  // Default color for regions
  }
}
