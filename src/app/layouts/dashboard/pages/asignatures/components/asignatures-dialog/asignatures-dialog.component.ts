import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAsignatures } from '../../models/asignatures_iface';


@Component({
  selector: 'app-asignatures-dialog',
  templateUrl: './asignatures-dialog.component.html',
  styleUrls: ['./asignatures-dialog.component.scss']
})
export class AsignaturesDialogComponent {
  asignaturesForm: FormGroup;
  mode: 'add' | 'edit';

constructor(private formBuilder: FormBuilder,
            private matDialogRef: MatDialogRef<AsignaturesDialogComponent>,
            @Inject(MAT_DIALOG_DATA) private editingAsignature?: IAsignatures){
              this.mode = editingAsignature ? 'edit' : 'add';  
            this.asignaturesForm = this.formBuilder.group({
              id: [editingAsignature?.id || ''], 
              asignature: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'),]],
              professor: ['', [Validators.required, Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$'),]],
              asignatureType: ['', [Validators.required]],
            }); 
      if (editingAsignature){
        this.asignaturesForm.patchValue(editingAsignature);
      }
}

  get asignatureControl() {
    return this.asignaturesForm.get('asignature');
  }
  
  get professorControl() {
    return this.asignaturesForm.get('professor');
  }
  
  get asignatureTypeControl() {
    return this.asignaturesForm.get('asignatureType');
  }

  onSave(): void{
    if(this.asignaturesForm.invalid){ // Invalid form
      this.asignaturesForm.markAllAsTouched();
    }else{ // Valid form
      this.matDialogRef.close(this.asignaturesForm.value);
    }
  }

}

