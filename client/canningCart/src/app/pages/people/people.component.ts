import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { PeopleService } from 'src/app/services/people.service';
import { faEdit, faPlus, faSignature, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPhone, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  //icons
  faSignature = faSignature;
  faPhone = faPhone;
  faIdCard = faIdCard;
  faPlus = faPlus;
  faTash = faTrash;
  faEdit = faEdit;

  roll: string

  people: Person[] = []

  constructor(
    private _peopleService: PeopleService,
    private _router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserType().subscribe(res => this.roll = res.roll, err => console.log);
    this.getPeople();
  }
  
  getPeople() {
    this._peopleService.getPeople().subscribe(people => {
      this.people = people;
    }, err =>  console.error);
  }

  view(personId: number | string) : void {
    this._router.navigate(['/view', 'person', personId]);
  }

  deletePerson(personId: number) {
    this._peopleService.removePerson(personId).subscribe((res: {message: string}) => {
      if (res.message == 'Person deleted') {
        this.getPeople();
      } else {
        return;
      }
    }, err => console.error(err));
  }
  

}
