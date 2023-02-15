import { Component, Input } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Router } from '@angular/router'

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent {
  @Input() movie?: Movie;
  showMessage: boolean = false;
  message: String = "";

  constructor(private movieService: MovieService, private router: Router) {

  }

  onSaveMovie(): void {
    if(this.movie){
      this.movieService.saveMovie(this.movie).subscribe(movieRet=>{
        if(this.movie){
          this.movie.imageLink = movieRet.imageLink;
          this.movie.likeCount = movieRet.likeCount;
          this.movie.name = movieRet.name;
          this.showMessage = true;
          this.message = `${movieRet.name} is saved.`
        }        
      });
    }    
  }
  onOKMessage(): void {
    this.showMessage = false;
  }
  close(): void {
    this.router.navigate([".."]);
  }
}
