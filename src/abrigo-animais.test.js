import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});


describe("Abrigo de Animais - Novos Testes ", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("caso válido com adoção única", () => {
    const res = abrigo.encontraPessoas("RATO,BOLA", "RATO,NOVELO", "Rex,Fofo");
    expect(res).toEqual({
      lista: ["Fofo - abrigo", "Rex - pessoa 1"].sort(),
    });
  });

  test("erro de animal inválido", () => {
    const res = abrigo.encontraPessoas("CAIXA,RATO", "RATO,BOLA", "Lulu");
    expect(res).toEqual({ erro: "Animal inválido" });
  });

  test("erro de brinquedo duplicado", () => {
    const res = abrigo.encontraPessoas("RATO,RATO,BOLA", "NOVELO", "Rex");
    expect(res).toEqual({ erro: "Brinquedo inválido" });
  });

  test("empate entre pessoas → fica no abrigo", () => {
    const res = abrigo.encontraPessoas("RATO,BOLA", "RATO,BOLA", "Rex");
    expect(res).toEqual({ lista: ["Rex - abrigo"] });
  });

  test("limite de 3 adoções por pessoa", () => {
    const ordem = "Rex,Mimi,Fofo,Zero,Bola,Bebe";
    const res = abrigo.encontraPessoas(
      "RATO,BOLA,LASER,NOVELO,CAIXA",
      "RATO,BOLA,LASER,NOVELO,CAIXA",
      ordem
    );
    const adotadosP1 = res.lista.filter((l) => l.includes("pessoa 1")).length;
    expect(adotadosP1).toBeLessThanOrEqual(3);
  });

  test("Loco só sai se houver companhia", () => {
    let res = abrigo.encontraPessoas("SKATE,RATO", "SKATE,RATO", "Loco");
    expect(res).toEqual({ lista: ["Loco - abrigo"] });

    res = abrigo.encontraPessoas("RATO,BOLA,SKATE", "NOVELO", "Rex,Loco");
    expect(res.lista).toContain("Loco - pessoa 1");
  });
});
