import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Observable } from "rxjs/Observable";
import { Router, NavigationExtras } from "@angular/router";
import { Routes } from '@angular/router';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  rows = [];
  columns = [];
  temp = [];
  students: Student[];
  selected = [];
  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.studentService.getAllStudents().subscribe(stud => {
      this.students = stud
      this.rows = this.temp = this.students
    });

    this.columns = [
      {
        prop: 'serialNo',
        name: 'Roll No'
      },
      {
        prop: 'division',
        name: 'Division'
      },

      {
        prop: 'firstName',
        name: 'First Name'
      },
      {
        prop: 'lastName',
        name: 'Last Name'
      },
    ];

  }
  updateFilter(event) {
    // console.log("--- event is fired ---")
    // console.log(event.target.value.toLowerCase())
    const val = event.target.value.toLowerCase();
    var columns = Object.keys(this.temp[0]);
    // Removes last "$$index" from "column"
    columns.splice(columns.length - 1);

    // console.log(columns);
    if (!columns.length)
      return;

    const rows = this.temp.filter(function (d) {
      for (let i = 0; i <= columns.length; i++) {
        let column = columns[i];
        // console.log(d[column]);
        if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
          return true;
        }
      }
    });

    this.rows = rows;

  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    console.log(this.selected[0].firstName)
    const navigationExtras: NavigationExtras = {
      queryParams: {
        division: this.selected[0].division,
        firstName: this.selected[0].firstName,
        lastName: this.selected[0].lastName,
        serialNo: this.selected[0].serialNo,

      }
    }
    this.router.navigate(['print_certificate'], navigationExtras);
  }
}