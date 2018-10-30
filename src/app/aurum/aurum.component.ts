import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';


@Component({
  selector: 'app-aurum',
  templateUrl: './aurum.component.html',
  styleUrls: ['./aurum.component.scss']
})
export class AurumComponent implements OnInit {

  constructor(    private themeService: ThemeService,
    private renderer: Renderer2

  ) { }

  ngAfterViewInit() {
    this.themeService.applyMatTheme(this.renderer)
  }
  ngOnInit() {
  }

}
