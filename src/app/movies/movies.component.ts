import { Component } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { OktaAuthStateService } from '@okta/okta-angular';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  newMovie: Movie = { "name": "", "likeCount": 0, "imageLink": "" };
  movies: Movie[] = [];
  movieToAdd: Movie = this.newMovie;
  showAddMovieForm: boolean = false;
  isLogin: boolean = false;
  showMessage: boolean = false;
  message: String = "";
  editMovie?: Movie;

  constructor(private movieService: MovieService, private _oktaAuthStateService: OktaAuthStateService) {

  }
  ngOnInit(): void {
    this.getMovies();
    this._oktaAuthStateService.authState$.subscribe(authState => this.isLogin = <boolean>authState.isAuthenticated);
  }
  getMovies(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }
  onLike(movie: Movie): void {
    this.movieService.likeMovie(movie).subscribe(movieRet => movie.likeCount = movieRet.likeCount);
  }
  onRequestToAddMovie(): void {
    this.movieToAdd = this.newMovie;
    this.showAddMovieForm = !this.showAddMovieForm;
  }
  onAddMovie(): void {
    this.movieService.addMovie(this.movieToAdd).subscribe({
      next: (movieRet) => {
        this.movies.push(movieRet);
        this.showAddMovieForm = false;
        this.showMessage = true;
        this.message = `${movieRet.name} has been added.`
      }, error: (error) => {
        this.showMessage = true;
        this.message = error.message;
      }
    });
  }
  onSaveMovie(movie: Movie): void {

    this.movieService.saveMovie(movie).subscribe(movieRet => {

      movie.imageLink = movieRet.imageLink;
      movie.likeCount = movieRet.likeCount;
      movie.name = movieRet.name;
      this.showMessage = true;
      this.message = `${movieRet.name} is saved.`
    });
  }

  onOKMessage(): void {
    this.showMessage = false;
  }
}
