import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';

describe('AppComponent', () => {
  // Test Setup
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavBarComponent, HomeComponent]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  }));
});
