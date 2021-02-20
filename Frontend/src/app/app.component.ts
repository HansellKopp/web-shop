import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { Router } from '@angular/router'
import { MatIconRegistry } from '@angular/material/icon'
import {DomSanitizer} from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service'
import { SearchService } from 'src/app/services/search.service'
import {
  THUMBUP_ICON,
  FACEBOOK_ICON,
  INSTAGRAM_ICON,
} from 'src/app/icons/icons'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  currentUser?: string = ''

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private iconRegistry: MatIconRegistry,
    private search: SearchService,
    private users: UsersService
  ) {
     this.loadIcons()
  }
  
  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  loadIcons() {
    this.iconRegistry.addSvgIconLiteral('thumbs-up', this.sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    this.iconRegistry.addSvgIconLiteral('facebook', this.sanitizer.bypassSecurityTrustHtml(FACEBOOK_ICON));
    this.iconRegistry.addSvgIconLiteral('instagram', this.sanitizer.bypassSecurityTrustHtml(INSTAGRAM_ICON));
  }

  ngOnInit() {
    this.search.getValue().subscribe((term: string) => {
      if(term) this.router.navigate(['home','search', term])
    })
    this.users.getCurrentUser().subscribe(data=> this.currentUser=data ? data['email'] : '')
  }
}
