import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {};
  cancelRegister = output<boolean>();
  accountService = inject(AccountService);
  toastr = inject(ToastrService);

  register() {
    this.accountService.Register(this.model).subscribe({
      next: res => {
        this.cancel();
        console.log(res);
      },
      error: err => this.toastr.error(err.error),
      complete: () => console.log('request completed')
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
