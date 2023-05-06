import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  constructor(private location:Location){}
  goBack(): void {
    this.location.back();
  }

}
