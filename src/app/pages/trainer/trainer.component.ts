import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent {
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
    editlearner(id:any){
      
      this.route.navigate(['update',id])
    }
    deletelearner(id:any){
      this.api.deletelearner(id).subscribe((res:any)=>{
        alert('Deleted Successfully!!!')
        this.learner= this.learner.filter((e:any)=>e._id !== id)
      })
    }
    logout(){
      localStorage.removeItem('token')
      this.route.navigate(['/']);
    }
  }




