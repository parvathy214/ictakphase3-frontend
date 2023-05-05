import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-placementofficer',
  templateUrl: './placementofficer.component.html',
  styleUrls: ['./placementofficer.component.css']
})

export class PlacementofficerComponent {

  learner:any
  completedCount: number = 0;
 placedLearnersCount : number=0;

  constructor(private api:BackendService, private route:Router,private location:Location){}

    ngOnInit() {
      this.getData()
    }
    goBack(): void {
      this.location.back();
    }
    


    logout(){
      localStorage.removeItem('token')
      this.route.navigate(['/']);
    }

    getData(){
      this.api.getData().subscribe((res:any)=>{
        console.log("incoming data")
        this.learner=res.data
        console.log(this.learner)
        const qualifiedLearners = this.learner.filter((learner:any) => learner.coursestatus === 'Qualified');
        console.log(qualifiedLearners); // Check if there are any items in the filtered array
        this.completedCount = qualifiedLearners.length;

        const placedLearners = this.learner.filter((learner:any) => learner.placementstatus === 'Placed');
        console.log(placedLearners); // Check if there are any items in the filtered array
        this.placedLearnersCount = placedLearners.length;
        
      })
    }
    editplacementstatus(id:any){

      this.route.navigate(['edit-status-placement',id])
    }



  }



