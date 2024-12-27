import {Component} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-client-we-serve',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './client-we-serve.component.html',
  styleUrl: './client-we-serve.component.css'
})
export class ClientWeServeComponent {

}
