import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})

export class MenuLateralComponent implements OnInit {
  @Input("contentId") public contentId: string;
  @Input("side") public side: string;

  constructor() { }

  ngOnInit() { }

}
