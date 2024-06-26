import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  titulo = "Crear categoría";
  categoria_id: string | null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
    
    this.categoria_id = this.aRouter.snapshot.paramMap.get('categoria_id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarCategoria() {
    const CATEGORIA: Categoria = {
      nombre: this.categoriaForm.get('nombre')?.value,
      descripcion: this.categoriaForm.get('descripcion')?.value
    };
    console.log('Datos de categoría a enviar:', CATEGORIA); // Log para depuración
    if (this.categoria_id !== null) {
      //editar categoria
      this.categoriaService.editarCategoria(this.categoria_id, CATEGORIA).subscribe(() => {
        console.log('Categoría actualizada con éxito'); // Log para depuración
        this.categoriaService.actualizarCategorias();
        this.router.navigate(['/categorias']);
      }, error => {
        console.error('Error al actualizar categoría:', error);// Log para depuración
      });
    } else {
      //Agregar categoria
      this.categoriaService.guardarCategoria(CATEGORIA).subscribe(() => {
        console.log('Categoría guardada con éxito'); // Log para depuración
        this.categoriaService.actualizarCategorias();
        this.router.navigate(['/categorias']);
      }, error => {
        console.error('Error al guardar categoría:', error);// Log para depuración
      });
    }
  }

  esEditar() {
    if (this.categoria_id !== null) {
      this.titulo = "Editar categoría";
      //pasamos los categoria_id a string en su service
      this.categoriaService.obtenerCategoria(this.categoria_id).subscribe(data => {
        this.categoriaForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion
        });
      });
    }
  }
}