import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BaseService } from '../shared/services';

@Injectable()
export class NoteService {

  private getUrl = '/api/notes';
  private saveUrl = '/api/note';

  constructor(private baseService: BaseService) { }

  getNotes(): Observable<any> {
    return this.baseService.getAll(this.getUrl);
  }

  countNotes(): Observable<any> {
    return this.baseService.count(this.saveUrl + '/count').map(res => res.json());
  }

  addNote(note: any): Observable<any> {
    return this.baseService.add(this.saveUrl, note);
  }

  getNote(note: any): Observable<any> {
    return this.baseService.getById(this.saveUrl, note).map(res => res.json());
  }

  editNote(note: any): Observable<any> {
    return this.baseService.editById(this.saveUrl, note);
  }

  deleteNote(note: any): Observable<any> {
    return this.baseService.deleteById(this.saveUrl, note);
  }

}
