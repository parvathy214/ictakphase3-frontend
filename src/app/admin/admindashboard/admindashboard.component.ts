import { Component } from '@angular/core';
import { BackendService } from 'src/app/backend.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  user: any = [];
  Trainerhead: number = 0;
  placementofcr : number=0;
  
  constructor(private api:BackendService, private route:Router){}

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.api.getUserData().subscribe((res:any)=>{
      console.log("incoming data")
      this.user=res
      console.log(this.user)
      const counttrainer = this.user.filter((user:any) => user.role === 'Trainer Head');
        console.log(counttrainer); // Check if there are any items in the filtered array
        this.Trainerhead = counttrainer.length;
        const countplacement = this.user.filter((user:any) => user.role === 'Placement Officer');
        console.log(countplacement); // Check if there are any items in the filtered array
        this. placementofcr= countplacement.length;


    })
  }
  deleteUser(id:any){
    
    this.api.deletestaff(id).subscribe((res:any)=>{
      console.log(res.status)
      alert('Deleted Successfully!!!')
      this.user= this.user.filter((e:any)=>e._id !== id)
    })

  }
  logout(){
    localStorage.removeItem('token')
    this.route.navigate(['/login']);
  }
}
