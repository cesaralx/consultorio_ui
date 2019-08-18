import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Label } from 'ng2-charts';
import { ChartsServices } from './charts.service';
import { LayoutService } from '../layout.service';


import { CitaModel, UsuarioModel, ConsultorioModel, PacienteModel } from './charts.model';
import { reject } from 'q';
import { resolve } from 'url';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss'],
    animations: [routerTransition()]
})
export class ChartsComponent implements OnInit {
    // variables
    pacientes: PacienteModel [] = [];
    usuarios: UsuarioModel [] = [];
    consultorios: ConsultorioModel [] = [];
    citas: CitaModel [] = [];
    private g = new LayoutService();
    citaxmexconsul: any;
    


    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Noviembre',
        'Diciembre'
    ];
    public barChartType: string;
    public barChartLegend: boolean;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series C' }
    ];

    // Doughnut
    public doughnutChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail-Order Sales'
    ];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string;

    // Radar
    public radarChartLabels: string[] = [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ];
    public radarChartData: any = [
        { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
    ];
    public radarChartType: string;

    // Pie
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: string;
    public pieChartLegend: boolean;
    public pieChartColors: any[] = [
        {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
        }
    ];

    // PolarArea
    public polarAreaChartLabels: string[] = [
        'Download Sales',
        'In-Store Sales',
        'Mail Sales',
        'Telesales',
        'Corporate Sales'
    ];
    public polarAreaChartData: number[] = [300, 500, 100, 40, 120];
    public polarAreaLegend: boolean;

    public polarAreaChartType: string;

    // lineChart
    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        {
            // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        {
            // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean;
    public lineChartType: string;

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public randomize(): void {
        // Only Change 3 values
        console.log('ranodmize');
        const data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40
        ];
        this.barChartData[0].data = data;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }





    constructor(
        private chartsServices: ChartsServices
    ) {}

   async ngOnInit() {

    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.doughnutChartType = 'doughnut';
    this.radarChartType = 'radar';
    this.pieChartType = 'pie';
    this.pieChartLegend = true;
    this.polarAreaLegend = true;
    this.polarAreaChartType = 'polarArea';
    this.lineChartLegend = true;
    this.lineChartType = 'line';


        await this.getPacientes();
        await this.getCitas();
        await this.getConsultorios();
        await this.getUsuarios();
        await this.getCitasxMesxConsul();

        await this.AgregaDatosPacixMes();






        // this.citaxmexconsul.forEach(element, index => {
        //     console.log(element.meses[element].count);
        //     cucu.data.push(element.meses);
        //     cucu.label.push(element._id);
        // });



    }

    async AgregaDatosPacixMes() {
        const count: {} = await this.cuentaCitasConsul();
        console.log('conteo x consul', count);
        await this.asignaCitasConsul(count);

    // console.log(this.consultorios);
        this.consultorios.forEach(async element => {
        await this.pushDataPie(element.nombre , element.citas );
        });

        let cucu = { data: [], label: [] };
        let barChartData: any[] = [
        ];

        // let cucu: Array<any> = [
        //     { data: [], label: [] }
        // ];

        this.citaxmexconsul.forEach(function(element, index) {
            console.log(element);
            console.log(index);
            // cucu.data.push([element.meses.count]);


            element.meses.forEach(item => {
                // console.log('interno', item.count);
                // cucu.data.push( item.count);
                cucu.data.push(item.count);

            });
            // cucu.label.pop();
            cucu.label.push([element._id]) ;
            console.log('aqui esta', cucu);
            barChartData.push(cucu);

            // cucu[index].label.push(element._id);


        });

        console.log('Arreglo chido', cucu);
        // this.barChartData = [cucu];
        // barChartData.push(cucu);
        console.log('Arreglo chido2', barChartData);
        this.barChartData = barChartData;
    }


    asignaCitasConsul = (count: {}) => new Promise( (resolve) => {
        this.consultorios.forEach(element => {
            // console.log('consultorio', element);
            Object.keys(count).forEach(function (item) {
                if (element._id === item ) {
                    // console.log(item, element._id, count[item]);
                    element.citas = count[item];
                }
                // console.log(item); // key
                // console.log(count[item]); // value
            });
        });
        resolve(true);
    })

    cuentaCitasConsul = () => new Promise( (resolve) => {
        // cuenta cuantas citas para cada consultorio existen
        let counts = {};
        this.citas.forEach( cita => {
            counts[cita.id_consultorio] = (counts[cita.id_consultorio] || 0) + 1 ;
        });
        resolve(counts);
    })



    pushDataPie = (label, number) => new Promise((resolve) => {
        this.pieChartLabels.push(label);
        this.pieChartData.push(number);
        // this.pieChartColors[0].backgroundColor.push(color);
        resolve(true);
    })


    getCitasxMesxConsul = () => new Promise( (resolve, reject) => {
        this.chartsServices.getCitasxMesxConsul()
            .subscribe( (resp: any) => {
                // console.log(resp);
                resolve( this.citaxmexconsul = resp);
            },
            (error) => {
            console.log(error.message);
            reject(error);
            if (error.status === 403) { this.g.onLoggedout(); }
            });
        })



    getPacientes = () => new Promise( (resolve, reject) => {
    this.chartsServices.getPacientes()
        .subscribe( (resp: any) => {
            // console.log(resp);
            resolve( this.pacientes = resp);
        },
        (error) => {
        console.log(error.message);
        reject(error);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
    })

    getUsuarios = () => new Promise( (resolve, reject) => {
        this.chartsServices.getUsuarios()
            .subscribe( (resp: any) => {
                // console.log(resp);
                resolve( this.usuarios = resp);
            },
            (error) => {
            console.log(error.message);
            reject(error);
            if (error.status === 403) { this.g.onLoggedout(); }
            });
        })

    getConsultorios = () => new Promise( (resolve, reject) => {
        this.chartsServices.getConsultorios()
            .subscribe( (resp: any) => {
                // console.log(resp);
                resolve( this.consultorios = resp);
            },
            (error) => {
            console.log(error.message);
            reject(error);
            if (error.status === 403) { this.g.onLoggedout(); }
            });
        })

    getCitas = () => new Promise( (resolve, reject) => {
        this.chartsServices.getCitas()
            .subscribe( (resp: any) => {
                // console.log(resp);
                resolve( this.citas = resp);
            },
            (error) => {
            console.log(error.message);
            reject(error);
            if (error.status === 403) { this.g.onLoggedout(); }
            });
        })



}
