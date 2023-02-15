import { Injectable, Inject } from '@angular/core';
import { Movie } from './movie';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Environment } from '../environments/ienvironment'
import { ENV } from '../environments/environment.provider'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  

  constructor(private http: HttpClient, @Inject(ENV) private env: Environment) { 
    
  }

  getMovies() : Observable<Movie[]>{
    return this.http.get<Movie[]>(this.env.movieAPIEndpoint);
  }
  likeMovie(movie: Movie) : Observable<Movie>{
    const like = { "likeCount" : "++" };
    return this.http.patch<Movie>(`${this.env.movieAPIEndpoint}/${movie.name}`, like);
  }
  saveMovie(movie: Movie) : Observable<Movie>{    
    return this.http.patch<Movie>(`${this.env.movieAPIEndpoint}/${movie.name}`, movie);
  }
  addMovie(movie: Movie) : Observable<Movie>{
    return this.http.post<Movie>(this.env.movieAPIEndpoint, movie).pipe(
      catchError(error => {
        let msg: string;
        if (error.error instanceof ErrorEvent){
          msg = error.error.message;
        } else{
          msg = this.getMessageString(error);
        }
        return throwError(()=> new Error(msg));
      })
    );
  }

  private getMessageString(error: HttpErrorResponse): string{
    switch(error.status){
      case 400: {
        return 'Bad Request.';
      }
      case 403: {
        return 'Access Denied.';
      }
      default: {
        return 'Unknown Error.';
      }
    }
  }
}
