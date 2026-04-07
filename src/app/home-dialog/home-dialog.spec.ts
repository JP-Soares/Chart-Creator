import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDialog } from './home-dialog';

describe('HomeDialog', () => {
  let component: HomeDialog;
  let fixture: ComponentFixture<HomeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
