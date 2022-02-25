import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/services/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  isAuthenticated = false;
  userSubscription: Subscription;

  collapsed = true;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    })
  }

  onLogout() {
    this.authService.logout();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
