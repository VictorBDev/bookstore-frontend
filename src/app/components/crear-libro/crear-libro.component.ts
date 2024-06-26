import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../../services/libro.service';
import { CategoriaService } from '../../services/categoria.service';
import { Libro } from '../../models/libro';
import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

  libroForm: FormGroup;
  titulo = 'Crear libro';
  libro_id: string | null;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private categoriaService: CategoriaService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      descripcion: [''],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria_id: ['', Validators.required]
    });
    this.libro_id = this.aRouter.snapshot.paramMap.get('libro_id');
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.esEditar();
  }

  agregarLibro(): void {
    const LIBRO: Libro = {
      titulo: this.libroForm.get('titulo')?.value,
      autor: this.libroForm.get('autor')?.value,
      descripcion: this.libroForm.get('descripcion')?.value,
      precio: this.libroForm.get('precio')?.value,
      stock: this.libroForm.get('stock')?.value,
      categoria_id: this.libroForm.get('categoria_id')?.value,
    };
    console.log('Datos de libro a enviar:', LIBRO); // Log para depuración

    if (this.libro_id !== null) {
      // Editar Libro
      this.libroService.editarLibro(this.libro_id, LIBRO).subscribe(
        (libroActualizado) => {
        console.log('Libro actualizado con éxito', libroActualizado); // Log para depuración
        this.libroService.actualizarLibros();
        this.router.navigate(['/libros']);
      },
      error => {
        console.error('Error al actualizar libro:', error);// Log para depuración
      }
    );
    } else {
      // Agregar Libro
      this.libroService.guardarLibro(LIBRO).subscribe(() => {
        console.log('Libro guardado con éxito'); // Log para depuración
        this.libroService.actualizarLibros();
        this.router.navigate(['/libros']);
      },
      error => {
        console.error('Error al guardar libro:', error);// Log para depuración
      }
    );
    }
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
        if (this.categorias.length === 0) {
          this.agregarCategoriasPorDefecto();
        } else {
          if (!this.libro_id) {
            this.establecerCategoriasPorDefecto();
          }
        }
      },
      error => console.error('Error al cargar categorías:', error)
    );
  }

  agregarCategoriasPorDefecto(): void {
    const categoriasDefault = [
      { nombre: 'Libros de literatura', descripcion: 'Libros de ficción y no ficción literaria' },
      { nombre: 'Libros artísticos e ilustrados', descripcion: 'Libros con enfoque en arte y diseño' }
    ];

    let categoriasAgregadas = 0;

    categoriasDefault.forEach(cat => {
      this.categoriaService.guardarCategoria(cat).subscribe(
        () => {
          categoriasAgregadas++;
          if (categoriasAgregadas === categoriasDefault.length) {
            this.cargarCategorias();
          }
        },
        error => console.error('Error al agregar categoría por defecto:', error)
      );
    });
  }

  establecerCategoriasPorDefecto(): void {
    if (this.categorias.length > 0) {
      this.libroForm.get('categoria_id')?.setValue(this.categorias[0].categoria_id);
    }
  }

  esEditar(): void {
    if (this.libro_id !== null) {
      this.titulo = 'Editar libro';
      this.libroService.obtenerLibro(this.libro_id).subscribe(data => {
        console.log('Datos del libro recibidos:', data);// Log para depuración
        //De setValue a patchValue para evitar errores
        this.libroForm.patchValue({
          titulo: data.titulo,
          autor: data.autor,
          descripcion: data.descripcion,
          precio: data.precio,
          stock: data.stock,
          categoria_id: data.categoria_id
        });
      },
      error => {
        console.error('Error al obtener el libro:', error);
      }
    );
    }
  }
}
