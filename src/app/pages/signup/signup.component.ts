import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registrationForm: FormGroup;
  confirmPasswordControl: AbstractControl | null = null;
  avatarSrc: string = 'assets/default-avatar-thumbnail.png'; // Ruta de la imagen por defecto

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    // Almacena una referencia al control confirmPassword
    this.confirmPasswordControl = this.registrationForm.get('confirmPassword');

    // Suscripción al evento valueChanges del control confirmPassword
    if (this.confirmPasswordControl) {
      this.confirmPasswordControl.valueChanges.subscribe(() => {
        this.passwordMatchValidator(this.registrationForm);
      });
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
  
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  
  onSubmit(): void {
    console.log("Submiting...");
    if (this.registrationForm.valid) {
      // Si el formulario es válido, navega a la ruta "/welcome"
      this.router.navigate(['/welcome']);
    } else {
      // Si el formulario no es válido, muestra mensajes de error o realiza otras acciones necesarias
      this.markAllFieldsAsTouched(this.registrationForm);
    }
  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      // Si el control es un FormGroup, se llama recursivamente
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }


  isMismatchError(): boolean {
    return !!this.confirmPasswordControl?.errors?.['mismatch'];
  }  

  selectProfilePhoto() {
    const profilePhotoInput = document.getElementById('profile-photo');
    if (profilePhotoInput) {
      profilePhotoInput.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Obtenemos el archivo seleccionado
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Mostramos la imagen seleccionada como el avatar
      this.avatarSrc = e.target.result;
    };

    reader.readAsDataURL(file);
  }

}
