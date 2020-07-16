import { Component, OnInit } from '@angular/core';
import { CandidateData } from './CandidateData/candiadateData';
import { Candidate } from './model/candidatemodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Candidate-DemoApp';
  CandidateInfoList: Candidate[] = [];
  distinctDepartments;
  searchValue: string;
  Up = 1;

  ngOnInit() {
    this.CandidateInfoList = CandidateData;
    this.findDistictDepartments();
  }

  trackById(id, element) {
    return element.id;
  }

  // Prepare column name and count of dept
  findDistictDepartments() {
    this.distinctDepartments = this.CandidateInfoList.reduce((obj, element) => {
      const count = (obj[element.department] || 0) + 1;
      obj[element.department] = count;
      return obj;
    }, {});
  }

  // find 2 plus yr exp candidates
  find2YrsPlusCandidates() {
    let expArr = [];
    const length = this.CandidateInfoList.length;
    for (let index = 0; index < length; index++) {
      //we can use date pipe also
      const splitArr = this.CandidateInfoList[index].joining_date.split('/');
      const joinDateMMDDYYYY =
        splitArr[1] + '/' + splitArr[0] + '/' + splitArr[2];

      const joiningDate = new Date(joinDateMMDDYYYY);
      const todayDate = new Date();
      let diffrence = todayDate.getFullYear() - joiningDate.getFullYear();
      if (diffrence > 2) {
        expArr.push(this.CandidateInfoList[index]);
      }
    }
    this.CandidateInfoList = expArr;
    this.findDistictDepartments();
  }

  // Reomve dev dept from list
  removeDevDepartment() {
    this.CandidateInfoList = this.CandidateInfoList.filter(
      (item) => item.department !== 'Development'
    );
    this.findDistictDepartments();
  }

  // search by name
  searchCandidateByName() {
    this.CandidateInfoList = CandidateData.filter((item) =>
      item.name.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.findDistictDepartments();
  }

  // Sort column by name and joining_date
  sortCandidates(column) {
    this.CandidateInfoList.sort((r1, r2) => {
      let result = 0;
      if (isNaN(r1[column]) && isNaN(r2[column])) {
        result =
          this.Up *
          (r1[column].toString() < r2[column].toString()
            ? -1
            : r1[column].toString() > r2[column].toString()
            ? 1
            : 0);
      } else {
        result = this.Up * (r1[column] - r2[column]);
      }
      return result;
    });
    this.Up = this.Up === 1 ? -1 : 1;
  }

  // Show all candidates
  showAllCandidates(){
    this.CandidateInfoList =CandidateData;
    this.findDistictDepartments();
  }
}
