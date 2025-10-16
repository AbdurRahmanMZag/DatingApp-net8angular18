import { NgxSpinnerService } from 'ngx-spinner';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private busyRequestCount = 0;
  private spinner = inject(NgxSpinnerService);
  busy() {
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      type: 'line-scale-party',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinner.hide();
    }
  }
}
