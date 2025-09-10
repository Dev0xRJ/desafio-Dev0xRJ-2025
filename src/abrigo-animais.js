class AbrigoAnimais {
  constructor() {
    this.animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };
  }

  encontraPessoas(brinquedos1, brinquedos2, ordem) {
    try {
      const lista1 = this._validarBrinquedos(brinquedos1);
      const lista2 = this._validarBrinquedos(brinquedos2);
      const ordemAnimais = ordem.split(",").map((a) => a.trim());

      const vistos = new Set();
      for (let animal of ordemAnimais) {
        if (!this.animais[animal] || vistos.has(animal)) {
          return { erro: "Animal inválido" };
        }
        vistos.add(animal);
      }

      let adotados = { p1: 0, p2: 0 };
      let resultados = [];

      for (let nome of ordemAnimais) {
        const { tipo, brinquedos } = this.animais[nome];
        let destino = "abrigo";

        if (nome === "Loco") {
          if (ordemAnimais.length === 1) {
            destino = "abrigo";
          } else {
            const p1Tem = lista1.includes("SKATE") || lista1.includes("RATO");
            const p2Tem = lista2.includes("SKATE") || lista2.includes("RATO");

            if (p1Tem && !p2Tem && adotados.p1 < 3) {
              destino = "pessoa 1";
              adotados.p1++;
            } else if (p2Tem && !p1Tem && adotados.p2 < 3) {
              destino = "pessoa 2";
              adotados.p2++;
            } else if (p1Tem && p2Tem) {
              destino = "abrigo";
            }
          }
        } else {
          const cond1 = this._segueOrdem(lista1, brinquedos, tipo);
          const cond2 = this._segueOrdem(lista2, brinquedos, tipo);

          if (cond1 && !cond2 && adotados.p1 < 3) {
            destino = "pessoa 1";
            adotados.p1++;
          } else if (cond2 && !cond1 && adotados.p2 < 3) {
            destino = "pessoa 2";
            adotados.p2++;
          } else if (cond1 && cond2) {
            destino = "abrigo";
          }
        }

        resultados.push(`${nome} - ${destino}`);
      }

      return { lista: resultados.sort() };
    } catch (e) {
      return { erro: e.message };
    }
  }

  _validarBrinquedos(texto) {
    if (!texto) return [];
    const itens = texto.split(",").map((b) => b.trim());

    const set = new Set();
    for (let item of itens) {
      if (set.has(item)) throw new Error("Brinquedo inválido");
      set.add(item);
    }
    return itens;
  }

  _segueOrdem(listaPessoa, brinquedosAnimal, tipo) {
    let idx = 0;
    for (let item of listaPessoa) {
      if (item === brinquedosAnimal[idx]) {
        idx++;
        if (idx === brinquedosAnimal.length) return true;
      }
    }
    return idx === brinquedosAnimal.length;
  }
}

export { AbrigoAnimais as AbrigoAnimais };
