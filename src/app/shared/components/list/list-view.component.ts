import {
  Component,
  ContentChild,
  Input,
  OnInit,
  Output,
  TemplateRef,
  inject,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Router } from 'express';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './list-view.component.html',
})
export class ListViewComponent implements OnInit {
  pageSize = 3;
  currentPage = 1;
  totalPage = 0;
  paginatedItems: any[] = [];
  @Input() items: any[] = [];
  @ContentChild(TemplateRef) template: TemplateRef<any> | null = null;
  @Output() onPaginate = () => {};
  private router = inject(Router);
  ngOnInit(): void {
    this.totalPage = Math.ceil(this.items.length / this.pageSize);
    this.paginatedItems = this.items.slice(0, this.pageSize);
  }

  changePage(value: number) {
    this.currentPage += value;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    this.paginatedItems = this.items.slice(start, end);
  }
}
