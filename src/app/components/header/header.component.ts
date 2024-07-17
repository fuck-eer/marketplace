import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'MarketPlace';
  @Input() showLogout?: boolean = false;
  @Input() userName?: string = '';
  @Output() logout: EventEmitter<void> = new EventEmitter();
  constructor() {}
  ngOnInit(): void {}

  onLogout() {
    console.log('HeaderComponent logout');
    this.logout?.emit();
  }
}
