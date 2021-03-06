import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})

export class ClientComponent {
  id: string;
  private sub: any;
  user: User;
  userExercise: any;

  exerciseName: string;
  time: number;
  numOfReps: number;

  constructor(private storageService: StorageService, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.storageService.getUser(this.id).subscribe((user => {
        this.user = user;
      }));
      this.storageService.getUserExercise(this.id).subscribe((userExerciseCol => {
        this.userExercise = userExerciseCol;
      }));
    });
  }

  assignExercise(formData) {
    this.exerciseName = formData.value.exerciseName;
    this.numOfReps = formData.value.numOfReps;
    // Create an Exercise ID for all of this
    this.storageService.postNewExercise(this.exerciseName, this.numOfReps, this.id);
  }
}
