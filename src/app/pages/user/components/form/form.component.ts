import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppService } from '@services/app.service';
import { Acl } from '../../../../models/user.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  private appService = inject(AppService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: new FormControl(''),
    email: new FormControl(''),
    acl: this.fb.group({}),
  });

  acl!: Acl;
  load = false;
  aclKeys: string[] = [];

  ngOnInit(): void {
    this.appService.getACL().subscribe((acl) => {
      this.aclKeys = Object.keys(acl);
      this.acl = acl;
      this.load = true;
    });
  }
}
