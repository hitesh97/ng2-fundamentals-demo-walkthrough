import { Component, Input, OnInit } from '@angular/core';
import { EventService, Event, Session } from '../shared/index';
import { RouteParams } from '@angular/router-deprecated';
import { SessionListComponent } from './session-list.component';
import { CreateSessionComponent } from './create-session.component';
import { TOASTR_TOKEN } from '../../common/toastr.service';

@Component({
  moduleId: module.id,
  selector: 'event-details',
  templateUrl: 'event-details.component.html',
  styles: ['a {cursor:pointer}'],
  directives: [SessionListComponent, CreateSessionComponent]
})
export class EventDetailsComponent implements OnInit {
  event: Event;
  addMode: boolean = false;
  filterBy: string = 'all';
  sortBy: string = 'votes'
  
  constructor(private eventService: EventService,
    private routeParams: RouteParams) {}
  
  ngOnInit() {
    this.eventService.getEvent(+this.routeParams.get('id'))
      .subscribe(event => this.event = event)
  }

  addSession() {
    this.addMode = true
  }

  saveNewSession(session:Session) {
    const nextId =  Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId + 1
    console.log(session.id);
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false

  }

  cancelAddSession() {
    this.addMode = false
  }
}