import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/member';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  member?: Member;

  ngOnInit(): void {
    const user = this.accountService.currentUser();
    if (user) {
      this.memberService.getMember(user.username).subscribe({
        next: member => this.member = member
      })
    }
  }
}
