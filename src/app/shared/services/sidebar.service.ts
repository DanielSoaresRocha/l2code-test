import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface Data {
  showSideBar?: boolean;
  activeView?: number;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebar = new Subject<Data>();

  toggleSideBar(data: Data) {
    this.sidebar.next(data);
  }

  sideBarObserver(): Observable<Data> {
    return this.sidebar.asObservable();
  }
}
