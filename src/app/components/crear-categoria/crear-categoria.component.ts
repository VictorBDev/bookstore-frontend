import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = "Crear categoría";

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  ngOnInit(): void {
  }

  agregarCategoria() {
    const CATEGORIA: Categoria = {
      nombre: this.categoriaForm.get('nombre')?.value,
      descripcion: this.categoriaForm.get('descripcion')?.value
    };
    console.log('Datos de categoría a enviar:', CATEGORIA); // Log para depuración
    this.categoriaService.guardarCategoria(CATEGORIA).subscribe(() => {
      console.log('Categoría guardada con éxito'); // Log para depuración
      this.router.navigate(['/categorias']);
    }, error => {
      console.error('Error al guardar categoría:', error);
    });
  }
}