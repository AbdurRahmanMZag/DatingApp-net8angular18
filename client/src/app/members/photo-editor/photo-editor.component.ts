import { Member } from './../../_models/member';
import { Component, EventEmitter, inject, input, OnInit, Output } from '@angular/core';
import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [NgStyle, NgFor, NgIf, NgClass, FileUploadModule, DecimalPipe],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit {
  member = input.required<Member>();
  @Output() memberChange = new EventEmitter<Member>();

  uploader?: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  accountService = inject(AccountService);
  memberService = inject(MembersService);

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.accountService.currentUser()?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        const updatedMember = { ...this.member() };
        updatedMember.photos.push(photo);
        this.memberChange.emit(updatedMember);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.memberService.setMainPhoto(photo).subscribe(_ => {
      const user = this.accountService.currentUser();
      if (user) {
        user.photoUrl = photo.url;
        this.accountService.setCurrentUser(user);
      }
      const updatedMember = { ...this.member() };
      updatedMember.photoUrl = photo.url;
      updatedMember.photos.map(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
        return p;
      });
      this.memberChange.emit(updatedMember);
    })
  }
}
