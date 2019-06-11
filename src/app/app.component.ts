import { AfterViewInit, Compiler, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { createComponent } from './dynamic/dynamic-component-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('span', {read: ViewContainerRef, static: true}) span;

  title = 'cliApp802';

  constructor(private compiler: Compiler) {
  }

  ngAfterViewInit() {
    createComponent('<a routerLink="content1">Foo</a>', this.compiler, this.span);
  }
}
