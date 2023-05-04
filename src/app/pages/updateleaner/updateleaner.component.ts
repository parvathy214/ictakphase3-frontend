import { Component } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';

@Component({
  selector: 'app-updateleaner',
  templateUrl: './updateleaner.component.html',
  styleUrls: ['./updateleaner.component.css']
})
export class UpdateleanerComponent {

  updateForm: any = new FormGroup({
    'learnerid': new FormControl(''),
    'name': new FormControl(''),
    'course': new FormControl(''),
    'project': new FormControl(''),
    'batch': new FormControl(''),
    'coursestatus': new FormControl(''),
    'placementstatus': new FormControl('')
  })

  
   
  constructor(private fb:FormBuilder, private api:BackendService,
   private router:Router,private route:ActivatedRoute){

  
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
        this.api.getcurrent(this.route.snapshot.params['id']).subscribe((result=>{
          this.updateForm = new FormGroup({
            'learnerid': new FormControl((result as any).learnerid),
            'name': new FormControl((result as any).name),
            'course': new FormControl((result as any).course),
            'project': new FormControl((result as any).project),
            'batch': new FormControl((result as any).batch),
            'coursestatus': new FormControl((result as any).coursestatus),
            'placementstatus': new FormControl((result as any).placementstatus)
          })
        }))
  }

  updateLearner() {
    

    this.api.updateLearner(this.updateForm.value,this.route.snapshot.params['id']).subscribe((result)=>{
      //console.log(result)
      alert(' User Data Updated ')
       this.router.navigate(['/learners'])
  })
}


 
  

}