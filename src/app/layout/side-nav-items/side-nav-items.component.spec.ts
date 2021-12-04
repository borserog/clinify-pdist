import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavItemsComponent } from './side-nav-items.component';

describe('SideNavItemsComponent', () => {
  let component: SideNavItemsComponent;
  let fixture: ComponentFixture<SideNavItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
