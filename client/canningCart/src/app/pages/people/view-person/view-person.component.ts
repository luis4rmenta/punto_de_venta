import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Person } from 'src/app/interfaces/person';
import { PeopleService } from 'src/app/services/people.service';
import { faPhone, faIdCard, faMapMarkedAlt, faAt, faGenderless, faBirthdayCake, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-person',
  templateUrl: './view-person.component.html',
  styleUrls: ['./view-person.component.css']
})
export class ViewPersonComponent implements OnInit {
  //icons
  faPhone = faPhone;
  faIdCard = faIdCard;
  faMapMarkedAlt = faMapMarkedAlt;
  faAt = faAt;
  faGenderless = faGenderless;
  faBirthdayCake = faBirthdayCake;
  faArrowLeft = faArrowLeft;
  faEdit = faEdit;


  person: Person;
  personId: number;

  constructor(
    private _peopleService: PeopleService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.personId = parseInt(this._route.snapshot.paramMap.get('id'));
    this.getPerson();
  }

  ngOnInit(): void {
  }

  getPerson() {
    this._peopleService.getPerson(this.personId).subscribe(res => {
      console.log(res);
      this.person = res;
    }, err => console.error);
  }

  


}
