import { FormateDatePipe } from './formate-date.pipe';

describe('FormateDatePipe', () => {
  let pipe: FormateDatePipe;

  beforeEach(() => {
    pipe = new FormateDatePipe();
  });

  it('deve formatar corretamente uma data para o formato pt-BR', () => {
    const date = new Date('2024-03-03T00:00:00Z'); // Exemplo de data UTC
    expect(pipe.transform(date)).toBe(date.toLocaleDateString('pt-BR'));
  });

  it('deve lidar com valores nulos ou indefinidos', () => {
    expect(pipe.transform(null as any)).toBeUndefined();
    expect(pipe.transform(undefined as any)).toBeUndefined();
  });

  it('deve lidar com strings de data', () => {
    const dateStr = '2024-03-03';
    expect(pipe.transform(new Date(dateStr))).toBe(
      new Date(dateStr).toLocaleDateString('pt-BR')
    );
  });

  it('deve lidar com timestamps', () => {
    const timestamp = 1710000000000; // Timestamp em milissegundos
    expect(pipe.transform(new Date(timestamp))).toBe(
      new Date(timestamp).toLocaleDateString('pt-BR')
    );
  });
});
