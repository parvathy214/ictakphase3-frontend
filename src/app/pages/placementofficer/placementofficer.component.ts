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
      })
    }
    editplacementstatus(id:any){

      this.route.navigate(['edit-status-placement',id])
    }



  }



