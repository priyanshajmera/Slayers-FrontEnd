import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  isLoading$ = this.loaderService.isLoading$;
  message$ = this.loaderService.message$;

  constructor(private loaderService: LoaderService) {}
}
