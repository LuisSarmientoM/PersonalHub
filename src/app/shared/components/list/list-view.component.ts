import {
  Component,
  ContentChild,
  Input,
  TemplateRef,
  inject,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';

interface eventEmit {
  from: number;
  to: number;
  total: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './list-view.component.html',
})
export class ListViewComponent implements DoCheck {
  @Input() pageSize = 10;
  @Input({ required: true }) items: any[] = [];
  currentPage = 1;
  totalPage = 0;
  paginatedItems: any[] = [];
  itemFrom = 1;
  itemTo = this.pageSize;
  @ContentChild(TemplateRef) template: TemplateRef<any> | null = null;
  @Output() pageChange: EventEmitter<eventEmit> = new EventEmitter();
  private router = inject(Router);

  ngDoCheck(): void {
    this.checkPagination();
  }

  checkPagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    this.paginatedItems = this.items.slice(start, end);
    this.totalPage = Math.ceil(this.items.length / this.pageSize);
    this.changePage(0);
  }

  changePage(value: number) {
    this.currentPage += value;
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    this.itemFrom = start + 1;
    this.itemTo = end > this.items.length ? this.items.length : end;
    this.paginatedItems = this.items.slice(start, end);
    // this.pageChange.emit({
    //   from: this.itemFrom,
    //   to: this.itemTo,
    //   currentPage: this.currentPage,
    // });
  }
}
