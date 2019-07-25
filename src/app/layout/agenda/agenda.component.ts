import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  closeResult: string;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]; // important!
  calendarEvents: EventInput[] = [
    { title: 'Evento de ginecología', start: new Date() }
  ];
  constructor(private translate: TranslateService, private modal: NgbModal) { }


  ngOnInit() {
  }
  modifyTitle(eventIndex, newTitle) {
    const calendarEvents = this.calendarEvents.slice(); // a clone
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
    singleEvent.title = newTitle;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }

  // handleDateClick(arg) { // handler method
  //   alert(arg.dateStr);
  // }


  handleDateClick(arg) {
   if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
     this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
       title: 'New Event',
       start: arg.date,
       allDay: arg.allDay
     });
   }

}

open(content) {
  this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {

  });
}
eventClick(model, content) {
   console.log(model.event);
   this.open(content);
 }

}
