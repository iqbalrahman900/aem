import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
    selector: 'app-donut',
    templateUrl: './donut.component.html',
    styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {

    title = 'Donut Chart';
    @Input() data: any;

    private width: any;
    private height: any;

    private svg: any;     // TODO replace all `any` by the right type

    radius: any;

    private arc: any;
    private pie: any;
    private color: any;

    private g: any;

    constructor() { }

    ngOnInit() {
        this.data = this.data.chartDonut;
        this.initSvg();
        this.drawChart(this.data);
    }

    private initSvg() {
        this.svg = d3.select('svg');

        this.width = +this.svg.attr('width');
        this.height = +this.svg.attr('height');
        this.radius = Math.min(this.width, this.height) / 2;

        this.color = d3Scale.scaleOrdinal()
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(this.radius - 70);

        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.value);

        this.svg = d3.select('svg')
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }

    private drawChart(data: any[]) {
        let g = this.svg.selectAll('.arc')
            .data(this.pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', this.arc)
            .style('fill', (d: { data: { name: any; }; }) => this.color(d.data.name));

        g.append('text')
            .attr('transform', (d: any) => 'translate(' + this.arc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text((d: { data: { name: any; }; }) => d.data.name);
    }

}
