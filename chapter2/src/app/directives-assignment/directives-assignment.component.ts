import { Component } from '@angular/core';

@Component({
  selector: 'app-directives-assignment',
  templateUrl: './directives-assignment.component.html',
  styleUrl: './directives-assignment.component.css'
})
export class DirectivesAssignmentComponent {
  showDetails= false;
  clicks=[];

  onClick(){
    this.clicks.push(Date.now());
    this.showDetails = !this.showDetails;
  }
}
