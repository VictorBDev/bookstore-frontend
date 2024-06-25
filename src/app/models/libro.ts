export class Libro {
  libro_id?: number;
  titulo: string;
  autor: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria_id: number;

  constructor(titulo: string, autor: string, precio: number, stock: number, categoria_id: number, descripcion?: string) {
    this.titulo = titulo;
    this.autor = autor;
    this.precio = precio;
    this.stock = stock;
    this.categoria_id = categoria_id;
    this.descripcion = descripcion;
  }
}