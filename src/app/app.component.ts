import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  Events: any = [
    {
      start: '2021-08-28',
      title: 'Ir a Google',
      textColor: '#E8F2F0 ',
      color: '#581845',
      url: 'http://google.com/',
    },
    {
      start: '2021-08-29',
      end: '2021-08-31',
      title: 'Odontólogo',
      color: '#E8880C',
      textColor: '#0F0F0F',
    },
    {
      start: '2021-09-02',
      end: '2021-08-31',
      title: 'ITV',
      display: 'background',
      textColor: '#0F0F0F',
    },
    {
      start: '2021-08-31',
      end: '2021-08-31',
      title: 'Happy Birthday',
      textColor: '#0B0C0B ',
      color: '#73E1CD',
    },
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    weekends: false, // initial value
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      return this.httpClient
        .get('http://localhost:4200/dynamic-events.php')
        .subscribe((res: any) => {
          this.Events.push(res);
          console.log(this.Events);
        });
    }, 2500);

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateSelect.bind(this),
        events: this.Events,
      };
    }, 2500);
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }
  onDateSelect(arg: any) {
    alert('Has hecho click en: ' + arg.dateStr);
  }
}
