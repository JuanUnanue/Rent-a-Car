import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditClientComponent } from './client-edit.component';


describe('EditClientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
