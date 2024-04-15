import { Component } from '@angular/core';
import { ITeachers } from './models/teachers_iface';
import { MatDialog } from '@angular/material/dialog';
import { TeachersDialogComponent } from './components/teachers-dialog/teachers-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'actions'];

  teachers: ITeachers[] = [ 
    { id: 1, name: 'Cuthbert', lastName: 'Binns', age:'75 años'},
    { id: 2, name: 'Severus', lastName: 'Snape', age:'69 años'},
    { id: 3, name: 'Filius', lastName: 'Flitwick', age:'67 años' },
    { id: 4, name: 'Rolanda', lastName: 'Hooch', age:'51 años' },
    { id: 5, name: 'Rubeus', lastName: 'Hagrid', age:'89 años' },
    { id: 6, name: 'Septima', lastName: 'Vector', age:'42 años' },
    { id: 7, name: 'Sybill', lastName: 'Trelawney', age:'89 años' },
    { id: 8, name: 'Horace', lastName: 'Slughorn', age:'74 años' },
];

constructor(private matDialog: MatDialog) {}

openDialog(editingTeacher?: ITeachers): void {
  this.matDialog
    .open(TeachersDialogComponent,{
      data: editingTeacher,
    })
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result){

          if(editingTeacher){
            this.teachers = this.teachers.map((u) => u.id === editingTeacher.id ? { ...u, ...result } : u);
          } else {
            result.id = new Date().getTime().toString().substring(0,2);
            this.teachers = [...this.teachers, result];
          }
      }
    },
  });
}

openBioTeacher(selectedTeacher: ITeachers){
  const { name, lastName } = selectedTeacher;
  const wikipediaUrl = `https://harrypotter.fandom.com/es/wiki/${name}_${lastName}`;
  window.open(wikipediaUrl, '_blank');
}

onDeleteTeacher(id: number): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará al profesor seleccionado.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.teachers = this.teachers.filter((u) => u.id != id);
      Swal.fire({
        title: '¡Realizado!',
        text: 'Profesor eliminado con éxito.',
        icon: 'success'
      });
    }
  });
}


}