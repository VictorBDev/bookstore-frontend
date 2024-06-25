import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  url = 'http://localhost:4000/api/libros';

  private libros$: Subject<Libro[]> = new Subject<Libro[]>();

  constructor(private http: HttpClient) { }

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.url);
  }

  eliminarLibro(libro_id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${libro_id}`);
  }

  guardarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.url, libro);
  }

  obtenerLibro(libro_id: string): Observable<Libro> {
    return this.http.get<Libro>(`${this.url}/${libro_id}`);
  }

  editarLibro(libro_id: string, libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.url}/${libro_id}`, libro);
  }

  actualizarLibros() {
    this.getLibros().subscribe(libros => {
      this.libros$.next(libros);
    });
  }

  getLibrosObservable(): Observable<Libro[]> {
    return this.libros$.asObservable();
  }
}