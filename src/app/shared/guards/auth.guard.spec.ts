import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>('AuthService', [
      'isAuthenticated',
    ]);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('deve permitir a navegação se o usuário estiver autenticado', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    expect(guard.canActivate()).toBeTrue();
  });

  it('deve redirecionar para "/" e exibir um alerta se o usuário não estiver autenticado', () => {
    spyOn(window, 'alert'); // Espionando a função alert()
    authServiceSpy.isAuthenticated.and.returnValue(false);

    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    expect(window.alert).toHaveBeenCalledWith('Você não está autenticado');
  });
});
