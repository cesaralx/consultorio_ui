import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

 export class LayoutService {
  


    constructor() { }

     onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('isLoggedinExternal');
    }

}

export const lenguaje = {
        'sProcessing': 'Procesando...',
        'sLengthMenu': 'Mostrar _MENU_ registros',
        'sZeroRecords': 'No se encontraron resultados',
        'sEmptyTable': 'Ningún dato disponible en esta tabla',
        'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
        'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
        'sInfoPostFix': '',
        'sSearch': 'Buscar:',
        'sUrl': '',
        'sInfoThousands': ',',
        'sLoadingRecords': 'Cargando...',
        'oPaginate': {
          'sFirst': 'Primero',
          'sLast': 'Último',
          'sNext': 'Siguiente',
          'sPrevious': 'Anterior'
        },
        'oAria': {
          'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
          'sSortDescending': ': Activar para ordenar la columna de manera descendente'
        },
        'buttons': {
          'pageLength': {
            _: 'Listar %d filas',
            '-1': 'Listar todo'
          }
        }
  };
