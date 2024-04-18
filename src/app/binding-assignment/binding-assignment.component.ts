import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-assignment',
  templateUrl: './binding-assignment.component.html',
  styleUrl: './binding-assignment.component.css'
})
export class BindingAssignmentComponent {
  username = '';
  onUserClearClick() {
    this.username='';
  }
}
