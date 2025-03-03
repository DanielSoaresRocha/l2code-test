import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  let pipe: PhoneNumberPipe;

  beforeEach(() => {
    pipe = new PhoneNumberPipe();
  });

  it('deve formatar corretamente um número de telefone', () => {
    expect(pipe.transform(11987654321)).toBe('(11) 98765-4321');
  });

  it('deve lidar com valores nulos ou indefinidos', () => {
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('deve lidar com números menores do que 11 dígitos', () => {
    expect(pipe.transform(1198765)).toBe('(11) 98765-');
  });

  it('deve lidar com números maiores do que 11 dígitos', () => {
    expect(pipe.transform(5511987654321)).toBe('(55) 11987-654321');
  });
});
