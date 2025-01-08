import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virtual-try-on',
  templateUrl: './virtual-try-on.component.html',
  styleUrl: './virtual-try-on.component.css'
})
export class VirtualTryOnComponent {

  constructor(private router: Router) {}

  tryOnData:any;

  ngOnInit(): void {
    this.tryOnData = history.state.response;
  }
}
