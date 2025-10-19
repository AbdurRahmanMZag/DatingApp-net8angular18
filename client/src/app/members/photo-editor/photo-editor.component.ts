import { Member } from './../../_models/member';
import { Component, input, signal } from '@angular/core';
import { Dir } from "../../../../node_modules/@angular/cdk/bidi/index";

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent {
  member = input.required<Member>();
}
