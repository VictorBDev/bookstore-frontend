import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = 'http://localhost:4000/api/categorias';

  private categorias$: Subject<Categoria[]> = new Subject<Categoria[]>();

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }

  eliminarCategoria(categoria_id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${categoria_id}`);
  }

  guardarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, categoria);
  }

  obtenerCategoria(categoria_id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.url}/${categoria_id}`);
  }

  editarCategoria(categoria_id: number, categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.url}/${categoria_id}`, categoria);
  }

  actualizarCategorias() {
    this.getCategorias().subscribe(categorias => {
      this.categorias$.next(categorias);
    });
  }

  getCategoriasObservable(): Observable<Categoria[]> {
    return this.categorias$.asObservable();
  }
}