import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { hideFooterInRoutes } from 'src/app/params';

@Component({
  selector: 'app-footer-new',
  templateUrl: './footer-new.component.html',
  styleUrls: ['./footer-new.component.scss']
})
export class FooterNewComponent implements OnInit {

  public privacyCookie = true;
  public hideFooter = false;
  public buyFooter = false;

  constructor(
    private router: Router,
  ) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.hideFooter = !hideFooterInRoutes.includes(event.url);
        this.buyFooter = event.url === '/buy';
      }

      if (event instanceof NavigationError) {
        // console.warn(event.error);
      }
    });
  }

  public privacyCookieSet() {
    window['jQuery']['cookie']('privacyCookie', true);
    this.privacyCookie = false;
  }

  ngOnInit() {
    if (window['jQuery']['cookie']('privacyCookie')) {
      this.privacyCookie = false;
    }

    const bottomMenu = document.getElementsByClassName('footer-menu');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < bottomMenu.length; i++) {
      bottomMenu[i].addEventListener('click', function () {
        if ($(this).hasClass('footer-menu')) {
          if ($(this).parent().hasClass('footer-menu-same') && !$(this).parent().hasClass('footer-menu-same-open')) {
            $(this).parent().addClass('footer-menu-same-open');
            return;
          } else if ($(this).parent().hasClass('footer-menu-same') && $(this).parent().hasClass('footer-menu-same-open')) {
            $(this).parent().removeClass('footer-menu-same-open');
            return;
          }
          if ($(this).hasClass('footer-menu-open')) {
            $(this).removeClass('footer-menu-open');
          } else {
            $(this).addClass('footer-menu-open');
          }
        }
      });
    }

  }

}
