/**
 * @file Define a classe base Veiculo.
 * @author Seu Nome <seu.email@example.com>
 */

/**
 * Representa um veículo genérico.
 * Classe base para outros tipos de veículos.
 * @class Veiculo
 */
export class Veiculo {
    /**
     * Cria uma instância de Veiculo.
     * @param {string} marca - A marca do veículo.
     * @param {string} modelo - O modelo do veículo.
     * @param {number} ano - O ano de fabricação do veículo.
     * @param {string} id - Um identificador único para o veículo (opcional, pode ser gerado).
     */
    constructor(marca, modelo, ano, id = crypto.randomUUID()) {
      if (this.constructor === Veiculo) {
        throw new Error("A classe abstrata 'Veiculo' não pode ser instanciada diretamente.");
      }
      /** @property {string} id Identificador único do veículo */
      this.id = id;
      /** @property {string} marca A marca do veículo */
      this.marca = marca;
      /** @property {string} modelo O modelo do veículo */
      this.modelo = modelo;
      /** @property {number} ano O ano de fabricação */
      this.ano = ano;
      /** @property {boolean} ligado Indica se o veículo está ligado */
      this.ligado = false;
    }
  
    /**
     * Liga o motor do veículo.
     * @returns {string} Mensagem indicando que o veículo foi ligado.
     */
    ligar() {
      if (!this.ligado) {
        this.ligado = true;
        console.log(`${this.marca} ${this.modelo} ligado.`);
        return `${this.marca} ${this.modelo} ligado.`;
      }
      return `${this.marca} ${this.modelo} já está ligado.`;
    }
  
    /**
     * Desliga o motor do veículo.
     * @returns {string} Mensagem indicando que o veículo foi desligado.
     */
    desligar() {
      if (this.ligado) {
        this.ligado = false;
        console.log(`${this.marca} ${this.modelo} desligado.`);
        return `${this.marca} ${this.modelo} desligado.`;
      }
      return `${this.marca} ${this.modelo} já está desligado.`;
    }
  
    /**
     * Retorna uma descrição básica do veículo.
     * Este método é um exemplo de onde o polimorfismo pode ser aplicado nas subclasses.
     * @returns {string} Descrição do veículo.
     */
    getDescricao() {
      return `Veículo: ${this.marca} ${this.modelo} (${this.ano})`;
    }
  
    /**
     * Retorna o tipo do veículo (deve ser sobrescrito nas subclasses).
     * @abstract
     * @returns {string} O tipo do veículo.
     */
    getTipo() {
        throw new Error("Método 'getTipo()' deve ser implementado pelas subclasses.");
    }
  
    /**
     * Converte o objeto Veiculo para um objeto simples para serialização (ex: JSON).
     * @returns {object} Um objeto simples representando o veículo.
     */
    toObject() {
      return {
        id: this.id,
        marca: this.marca,
        modelo: this.modelo,
        ano: this.ano,
        ligado: this.ligado,
        // Inclua a propriedade 'tipo' que virá do método getTipo()
        // É importante chamar o método da subclasse correta aqui
        tipo: this.getTipo()
      };
    }
  
    /**
     * Cria uma instância de uma subclasse de Veiculo a partir de um objeto simples.
     * Útil para recriar objetos a partir do LocalStorage.
     * @static
     * @param {object} obj - O objeto simples com os dados do veículo.
     * @param {string} obj.tipo - O tipo do veículo ('Carro', 'CarroEsportivo', 'Caminhao').
     * @param {string} obj.marca - A marca.
     * @param {string} obj.modelo - O modelo.
     * @param {number} obj.ano - O ano.
     * @param {string} [obj.id] - O ID (opcional).
     * @param {number} [obj.numPortas] - Número de portas (para Carro).
     * @param {number} [obj.velocidadeMaxima] - Velocidade máxima (para CarroEsportivo).
     * @param {number} [obj.capacidadeCarga] - Capacidade de carga (para Caminhao).
     * @returns {Veiculo} Uma instância da subclasse apropriada.
     * @throws {Error} Se o tipo do veículo for desconhecido.
     */
    static fromObject(obj) {
      // Importações dinâmicas ou condicionais aqui podem ser complexas.
      // Uma abordagem mais simples é garantir que todas as classes estejam carregadas
      // antes de chamar fromObject, ou usar um registro de classes.
      // Por simplicidade, faremos um switch case aqui, assumindo que as classes
      // Carro, CarroEsportivo, Caminhao estão disponíveis no escopo onde isso é chamado.
      // (Isso funciona bem quando importado no main.js que já importa tudo)
  
      // NOTE: Para isso funcionar corretamente, as classes filhas precisam ser importadas
      // no arquivo que chama Veiculo.fromObject (provavelmente Garagem.js ou main.js).
      switch (obj.tipo) {
        case 'Carro':
          // Precisamos importar Carro aqui ou garantir que já foi importado antes.
          // Exemplo simplificado (requer importação prévia):
          // return new Carro(obj.marca, obj.modelo, obj.ano, obj.numPortas, obj.id);
          // Para evitar dependência cíclica ou complexidade, a Garagem pode lidar com isso.
          // Veja a modificação em Garagem.js -> carregarDoLocalStorage
          throw new Error("fromObject deve ser chamado de um contexto que conhece as subclasses.");
        case 'CarroEsportivo':
           // throw new Error("fromObject deve ser chamado de um contexto que conhece as subclasses.");
           // Veja a modificação em Garagem.js -> carregarDoLocalStorage
           throw new Error("fromObject deve ser chamado de um contexto que conhece as subclasses.");
        case 'Caminhao':
           // Veja a modificação em Garagem.js -> carregarDoLocalStorage
           throw new Error("fromObject deve ser chamado de um contexto que conhece as subclasses.");
        default:
          throw new Error(`Tipo de veículo desconhecido: ${obj.tipo}`);
      }
      // A lógica de recriação será movida para a classe Garagem para simplificar.
    }
  }

  /**
 * @file Define a classe Carro, que herda de Veiculo.
 */
import { Veiculo } from './Veiculo.js';

/**
 * Representa um carro, especialização de Veiculo.
 * @class Carro
 * @extends Veiculo
 */
export class Carro extends Veiculo {
  /**
   * Cria uma instância de Carro.
   * @param {string} marca - A marca do carro.
   * @param {string} modelo - O modelo do carro.
   * @param {number} ano - O ano de fabricação.
   * @param {number} numPortas - O número de portas do carro.
   * @param {string} [id] - Um identificador único (opcional).
   */
  constructor(marca, modelo, ano, numPortas, id) {
    super(marca, modelo, ano, id); // Chama o construtor da classe pai (Veiculo)
    /** @property {number} numPortas O número de portas */
    this.numPortas = numPortas;
  }

  /**
   * Retorna o tipo do veículo.
   * @override
   * @returns {string} Sempre retorna 'Carro'.
   */
  getTipo() {
    return 'Carro';
  }

  /**
   * Retorna uma descrição do carro, incluindo o número de portas.
   * @override
   * @returns {string} Descrição do carro.
   */
  getDescricao() {
    return `${super.getDescricao()} com ${this.numPortas} portas`;
  }

  /**
   * Converte o objeto Carro para um objeto simples para serialização.
   * @override
   * @returns {object} Um objeto simples representando o carro.
   */
  toObject() {
    return {
      ...super.toObject(), // Pega as propriedades da classe pai
      numPortas: this.numPortas,
      // tipo já é definido em Veiculo.toObject() chamando this.getTipo()
    };
  }
}

/**
 * @file Define a classe CarroEsportivo, que herda de Carro.
 */
import { Carro } from './Carro.js';

/**
 * Representa um carro esportivo, especialização de Carro.
 * @class CarroEsportivo
 * @extends Carro
 */
export class CarroEsportivo extends Carro {
  /**
   * Cria uma instância de CarroEsportivo.
   * @param {string} marca - A marca do carro.
   * @param {string} modelo - O modelo do carro.
   * @param {number} ano - O ano de fabricação.
   * @param {number} numPortas - O número de portas.
   * @param {number} velocidadeMaxima - A velocidade máxima em km/h.
   * @param {string} [id] - Um identificador único (opcional).
   */
  constructor(marca, modelo, ano, numPortas, velocidadeMaxima, id) {
    super(marca, modelo, ano, numPortas, id); // Chama o construtor da classe pai (Carro)
    /** @property {number} velocidadeMaxima A velocidade máxima em km/h */
    this.velocidadeMaxima = velocidadeMaxima;
  }

  /**
   * Retorna o tipo do veículo.
   * @override
   * @returns {string} Sempre retorna 'CarroEsportivo'.
   */
  getTipo() {
    return 'CarroEsportivo';
  }

  /**
   * Retorna uma descrição do carro esportivo.
   * @override
   * @returns {string} Descrição do carro esportivo.
   */
  getDescricao() {
    return `${super.getDescricao()}, Velocidade Máxima: ${this.velocidadeMaxima} km/h`;
  }

  /**
   * Simula a ativação do nitro.
   * @returns {string} Mensagem sobre o nitro.
   */
  ativarNitro() {
      const msg = `${this.marca} ${this.modelo} ativou o NITRO!`;
      console.log(msg);
      return msg;
  }

  /**
   * Converte o objeto CarroEsportivo para um objeto simples para serialização.
   * @override
   * @returns {object} Um objeto simples representando o carro esportivo.
   */
  toObject() {
    return {
      ...super.toObject(), // Pega as propriedades da classe pai (Carro)
      velocidadeMaxima: this.velocidadeMaxima,
    };
  }
}

/**
 * @file Define a classe Caminhao, que herda de Veiculo.
 */
import { Veiculo } from './Veiculo.js';

/**
 * Representa um caminhão, especialização de Veiculo.
 * @class Caminhao
 * @extends Veiculo
 */
export class Caminhao extends Veiculo {
  /**
   * Cria uma instância de Caminhao.
   * @param {string} marca - A marca do caminhão.
   * @param {string} modelo - O modelo do caminhão.
   * @param {number} ano - O ano de fabricação.
   * @param {number} capacidadeCarga - A capacidade de carga em toneladas.
   * @param {string} [id] - Um identificador único (opcional).
   */
  constructor(marca, modelo, ano, capacidadeCarga, id) {
    super(marca, modelo, ano, id); // Chama o construtor da classe pai (Veiculo)
    /** @property {number} capacidadeCarga Capacidade de carga em toneladas */
    this.capacidadeCarga = capacidadeCarga;
  }

   /**
   * Retorna o tipo do veículo.
   * @override
   * @returns {string} Sempre retorna 'Caminhao'.
   */
  getTipo() {
    return 'Caminhao';
  }

  /**
   * Retorna uma descrição do caminhão.
   * @override
   * @returns {string} Descrição do caminhão.
   */
  getDescricao() {
    return `${super.getDescricao()}, Capacidade: ${this.capacidadeCarga} toneladas`;
  }

  /**
   * Simula o carregamento do caminhão.
   * @param {string} item - O item a ser carregado.
   * @returns {string} Mensagem sobre o carregamento.
   */
  carregar(item) {
    const msg = `${this.marca} ${this.modelo} está carregando ${item}.`;
    console.log(msg);
    return msg;
  }

  /**
   * Converte o objeto Caminhao para um objeto simples para serialização.
   * @override
   * @returns {object} Um objeto simples representando o caminhão.
   */
  toObject() {
    return {
      ...super.toObject(), // Pega as propriedades da classe pai (Veiculo)
      capacidadeCarga: this.capacidadeCarga,
    };
  }
}

/**
 * @file Define a classe Manutencao.
 */

/**
 * Representa um registro de manutenção para um veículo.
 * @class Manutencao
 */
export class Manutencao {
    /**
     * Cria uma instância de Manutencao.
     * @param {string} veiculoId - O ID do veículo ao qual esta manutenção pertence.
     * @param {string} descricao - Descrição do serviço realizado.
     * @param {Date} data - Data da manutenção.
     * @param {number} custo - Custo da manutenção.
     * @param {string} [id] - Identificador único da manutenção (opcional).
     */
    constructor(veiculoId, descricao, data, custo, id = crypto.randomUUID()) {
       /** @property {string} id Identificador único da manutenção */
      this.id = id;
       /** @property {string} veiculoId ID do veículo associado */
      this.veiculoId = veiculoId;
       /** @property {string} descricao Descrição do serviço */
      this.descricao = descricao;
       /** @property {Date} data Data da manutenção */
      this.data = data instanceof Date ? data : new Date(data); // Garante que é um objeto Date
       /** @property {number} custo Custo do serviço */
      this.custo = custo;
    }
  
    /**
     * Retorna uma descrição formatada da manutenção.
     * @returns {string} Descrição formatada.
     */
    getDescricaoFormatada() {
      return `Manutenção [${this.id}] em ${this.data.toLocaleDateString()}: ${this.descricao} (Custo: R$ ${this.custo.toFixed(2)})`;
    }
  
    /**
     * Converte o objeto Manutencao para um objeto simples para serialização.
     * @returns {object} Um objeto simples representando a manutenção.
     */
    toObject() {
      return {
        id: this.id,
        veiculoId: this.veiculoId,
        descricao: this.descricao,
        data: this.data.toISOString(), // Salvar data como string ISO 8601
        custo: this.custo,
      };
    }
  
     /**
     * Cria uma instância de Manutencao a partir de um objeto simples.
     * @static
     * @param {object} obj - O objeto simples com os dados da manutenção.
     * @returns {Manutencao} Uma instância de Manutencao.
     */
    static fromObject(obj) {
      return new Manutencao(obj.veiculoId, obj.descricao, obj.data, obj.custo, obj.id);
    }
  }

  /**
 * @file Define a classe Garagem para gerenciar veículos e manutenções.
 */
import { Veiculo } from '../models/Veiculo.js';
import { Manutencao } from '../models/Manutencao.js';
// Importa as subclasses para que o método fromObject funcione corretamente
import { Carro } from '../models/Carro.js';
import { CarroEsportivo } from '../models/CarroEsportivo.js';
import { Caminhao } from '../models/Caminhao.js';


/**
 * Gerencia uma coleção de veículos e seus registros de manutenção,
 * com persistência em LocalStorage.
 * @class Garagem
 */
export class Garagem {
  /** @type {string} Chave usada no LocalStorage para salvar os veículos. */
  #localStorageKeyVeiculos = 'garagem_veiculos';
  /** @type {string} Chave usada no LocalStorage para salvar as manutenções. */
  #localStorageKeyManutencoes = 'garagem_manutencoes';

  /**
   * Cria uma instância de Garagem.
   * @param {string} nome - O nome da garagem.
   */
  constructor(nome = "Minha Garagem") {
    /** @property {string} nome O nome da garagem */
    this.nome = nome;
    /**
     * @property {Veiculo[]} veiculos Lista de veículos na garagem.
     * @private
     */
    this.veiculos = [];
     /**
     * @property {Manutencao[]} manutencoes Lista de manutenções realizadas.
     * @private
     */
    this.manutencoes = [];

    this.carregarDoLocalStorage(); // Carrega dados ao instanciar
  }

  /**
   * Adiciona um veículo à garagem.
   * @param {Veiculo} veiculo - A instância do veículo a ser adicionado.
   * @throws {Error} Se o objeto fornecido não for uma instância de Veiculo.
   * @throws {Error} Se um veículo com o mesmo ID já existir.
   */
  adicionarVeiculo(veiculo) {
    if (!(veiculo instanceof Veiculo)) {
      throw new Error("Só é possível adicionar objetos do tipo Veiculo ou suas subclasses.");
    }
    if (this.veiculos.some(v => v.id === veiculo.id)) {
        throw new Error(`Veículo com ID ${veiculo.id} já existe na garagem.`);
    }
    this.veiculos.push(veiculo);
    console.log(`${veiculo.getTipo()} ${veiculo.marca} ${veiculo.modelo} adicionado à garagem.`);
    this.salvarNoLocalStorage(); // Salva após modificar
  }

  /**
   * Remove um veículo da garagem pelo seu ID.
   * @param {string} veiculoId - O ID do veículo a ser removido.
   * @returns {boolean} Retorna true se o veículo foi removido, false caso contrário.
   */
  removerVeiculo(veiculoId) {
    const indice = this.veiculos.findIndex(v => v.id === veiculoId);
    if (indice !== -1) {
      const removido = this.veiculos.splice(indice, 1)[0];
      console.log(`${removido.getTipo()} ${removido.marca} ${removido.modelo} removido da garagem.`);
      // Opcional: Remover manutenções associadas a este veículo?
      // this.manutencoes = this.manutencoes.filter(m => m.veiculoId !== veiculoId);
      this.salvarNoLocalStorage(); // Salva após modificar
      return true;
    }
    console.warn(`Veículo com ID ${veiculoId} não encontrado para remoção.`);
    return false;
  }

  /**
   * Busca um veículo na garagem pelo seu ID.
   * @param {string} veiculoId - O ID do veículo a ser buscado.
   * @returns {Veiculo | undefined} O veículo encontrado ou undefined se não existir.
   */
  buscarVeiculoPorId(veiculoId) {
    return this.veiculos.find(v => v.id === veiculoId);
  }

  /**
   * Lista todos os veículos na garagem.
   * @returns {Veiculo[]} Uma cópia da lista de veículos.
   */
  listarVeiculos() {
    // Retorna uma cópia para evitar modificação externa direta do array original
    return [...this.veiculos];
  }

  /**
   * Adiciona um registro de manutenção.
   * @param {Manutencao} manutencao - A instância de Manutencao a ser adicionada.
   * @throws {Error} Se o objeto não for uma instância de Manutencao.
   * @throws {Error} Se o veiculoId associado não existir na garagem.
   */
  adicionarManutencao(manutencao) {
    if (!(manutencao instanceof Manutencao)) {
        throw new Error("Só é possível adicionar objetos do tipo Manutencao.");
    }
    if (!this.buscarVeiculoPorId(manutencao.veiculoId)) {
        throw new Error(`Veículo com ID ${manutencao.veiculoId} não encontrado na garagem.`);
    }
    this.manutencoes.push(manutencao);
    console.log(`Manutenção registrada para o veículo ${manutencao.veiculoId}.`);
    this.salvarNoLocalStorage(); // Salva após modificar
  }

  /**
   * Lista todas as manutenções registradas ou filtra por ID do veículo.
   * @param {string} [veiculoId] - O ID do veículo para filtrar as manutenções (opcional).
   * @returns {Manutencao[]} Uma lista de manutenções.
   */
  listarManutencoes(veiculoId) {
      const lista = veiculoId
          ? this.manutencoes.filter(m => m.veiculoId === veiculoId)
          : [...this.manutencoes]; // Retorna cópia se não filtrar

      // Ordena por data, da mais recente para a mais antiga
      return lista.sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  /**
   * Salva o estado atual da garagem (veículos e manutenções) no LocalStorage.
   * Converte os objetos para JSON antes de salvar.
   * @private
   */
  salvarNoLocalStorage() {
    try {
      const veiculosParaSalvar = this.veiculos.map(v => v.toObject());
      const manutencoesParaSalvar = this.manutencoes.map(m => m.toObject());

      localStorage.setItem(this.#localStorageKeyVeiculos, JSON.stringify(veiculosParaSalvar));
      localStorage.setItem(this.#localStorageKeyManutencoes, JSON.stringify(manutencoesParaSalvar));
      console.log("Dados da garagem salvos no LocalStorage.");
    } catch (error) {
      console.error("Erro ao salvar dados no LocalStorage:", error);
      // Poderia adicionar uma notificação para o usuário aqui
    }
  }

  /**
   * Carrega o estado da garagem (veículos e manutenções) do LocalStorage.
   * Reconstrói as instâncias das classes a partir dos dados JSON.
   * @private
   */
  carregarDoLocalStorage() {
    try {
      const veiculosSalvos = localStorage.getItem(this.#localStorageKeyVeiculos);
      const manutencoesSalvas = localStorage.getItem(this.#localStorageKeyManutencoes);

      if (veiculosSalvos) {
        const veiculosObjetos = JSON.parse(veiculosSalvos);
        // Usa o método estático 'fromObject' para recriar as instâncias corretas
        this.veiculos = veiculosObjetos.map(obj => this.reconstruirVeiculo(obj));
      } else {
        this.veiculos = []; // Inicia vazio se não houver nada salvo
      }

       if (manutencoesSalvas) {
        const manutencoesObjetos = JSON.parse(manutencoesSalvas);
        this.manutencoes = manutencoesObjetos.map(obj => Manutencao.fromObject(obj));
      } else {
        this.manutencoes = [];
      }

      console.log("Dados da garagem carregados do LocalStorage.");

    } catch (error) {
      console.error("Erro ao carregar dados do LocalStorage:", error);
      // Reseta para estado vazio em caso de erro de parse ou outro problema
      this.veiculos = [];
      this.manutencoes = [];
      // Poderia limpar o localStorage corrompido
      // localStorage.removeItem(this.#localStorageKeyVeiculos);
      // localStorage.removeItem(this.#localStorageKeyManutencoes);
    }
  }

  /**
   * Reconstrói a instância correta da subclasse de Veiculo a partir de um objeto simples.
   * Este método centraliza a lógica que antes estava em `Veiculo.fromObject`.
   * @private
   * @param {object} obj - O objeto simples lido do LocalStorage.
   * @returns {Veiculo} A instância reconstruída da classe apropriada.
   * @throws {Error} Se o tipo do veículo for desconhecido.
   */
  reconstruirVeiculo(obj) {
      switch (obj.tipo) {
          case 'Carro':
              return new Carro(obj.marca, obj.modelo, obj.ano, obj.numPortas, obj.id);
          case 'CarroEsportivo':
              return new CarroEsportivo(obj.marca, obj.modelo, obj.ano, obj.numPortas, obj.velocidadeMaxima, obj.id);
          case 'Caminhao':
              return new Caminhao(obj.marca, obj.modelo, obj.ano, obj.capacidadeCarga, obj.id);
          // Adicione outros tipos de veículos aqui se necessário
          default:
              console.error(`Tipo de veículo desconhecido durante a reconstrução: ${obj.tipo}`, obj);
              // Poderia retornar null ou lançar um erro mais específico
              // Retornar null pode ser mais robusto para não quebrar toda a carga
              // throw new Error(`Tipo de veículo desconhecido: ${obj.tipo}`);
              return null; // Retorna null para ignorar objetos inválidos
      }
  }

}

/**
 * @file Script principal da aplicação de gerenciamento de garagem.
 * Inicializa a garagem, manipula o DOM e interage com o usuário.
 */

// Importa as classes necessárias
import { Garagem } from './services/Garagem.js';
import { Carro } from './models/Carro.js';
import { CarroEsportivo } from './models/CarroEsportivo.js';
import { Caminhao } from './models/Caminhao.js';
import { Manutencao } from './models/Manutencao.js';

// --- Instanciação da Garagem ---
const minhaGaragem = new Garagem("Garagem Central");

// --- Seletores do DOM (Exemplo) ---
const formAdicionarVeiculo = document.getElementById('form-add-veiculo');
const selectTipoVeiculo = document.getElementById('tipo-veiculo');
const camposCarro = document.getElementById('campos-carro'); // Div com campos específicos de carro
const camposCarroEsportivo = document.getElementById('campos-carro-esportivo'); // Div com campos específicos de carro esportivo
const camposCaminhao = document.getElementById('campos-caminhao'); // Div com campos específicos de caminhão
const listaVeiculosElement = document.getElementById('lista-veiculos'); // Onde a lista será exibida (ex: uma <ul> ou <tbody>)
const btnLimparStorage = document.getElementById('limpar-storage'); // Botão para limpar dados

// --- Funções de Manipulação do DOM ---

/**
 * Atualiza a exibição da lista de veículos na página HTML.
 */
function renderizarListaVeiculos() {
    if (!listaVeiculosElement) return; // Sai se o elemento não existir

    listaVeiculosElement.innerHTML = ''; // Limpa a lista atual
    const veiculos = minhaGaragem.listarVeiculos();

    if (veiculos.length === 0) {
        listaVeiculosElement.innerHTML = '<li>Nenhum veículo na garagem.</li>';
        return;
    }

    veiculos.forEach(veiculo => {
        if (!veiculo) return; // Pula veículos que podem ter falhado na reconstrução

        const itemLista = document.createElement('li');
        itemLista.dataset.id = veiculo.id; // Adiciona ID para facilitar a remoção/edição

        // Conteúdo do item (pode ser mais elaborado)
        itemLista.innerHTML = `
            <span>${veiculo.getDescricao()} (ID: ${veiculo.id})</span>
            <button class="btn-remover" data-id="${veiculo.id}">Remover</button>
            <button class="btn-detalhes" data-id="${veiculo.id}">Detalhes</button>
            <!-- Adicionar mais botões/informações conforme necessário -->
        `;
        listaVeiculosElement.appendChild(itemLista);
    });
}

/**
 * Mostra/esconde campos do formulário baseados no tipo de veículo selecionado.
 */
function atualizarCamposFormulario() {
    const tipo = selectTipoVeiculo?.value;

    // Esconde todos os campos específicos primeiro
    if (camposCarro) camposCarro.style.display = 'none';
    if (camposCarroEsportivo) camposCarroEsportivo.style.display = 'none';
    if (camposCaminhao) camposCaminhao.style.display = 'none';

    // Mostra os campos relevantes
    if (tipo === 'Carro' || tipo === 'CarroEsportivo') {
        if (camposCarro) camposCarro.style.display = 'block';
    }
    if (tipo === 'CarroEsportivo') {
        if (camposCarroEsportivo) camposCarroEsportivo.style.display = 'block';
    }
    if (tipo === 'Caminhao') {
        if (camposCaminhao) camposCaminhao.style.display = 'block';
    }
}

// --- Lógica de Event Listeners ---

/**
 * Manipulador para o envio do formulário de adição de veículo.
 * @param {Event} event - O objeto do evento de submit.
 */
function handleAdicionarVeiculo(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const formData = new FormData(formAdicionarVeiculo);
    const marca = formData.get('marca');
    const modelo = formData.get('modelo');
    const ano = parseInt(formData.get('ano'), 10);
    const tipo = formData.get('tipo');

    // Validação básica (adicione mais conforme necessário)
    if (!marca || !modelo || isNaN(ano) || !tipo) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    try {
        let novoVeiculo;

        switch (tipo) {
            case 'Carro':
                const numPortasCarro = parseInt(formData.get('numPortas'), 10);
                if (isNaN(numPortasCarro)) throw new Error("Número de portas inválido.");
                novoVeiculo = new Carro(marca, modelo, ano, numPortasCarro);
                break;
            case 'CarroEsportivo':
                 const numPortasEsportivo = parseInt(formData.get('numPortas'), 10);
                 const velocidadeMaxima = parseInt(formData.get('velocidadeMaxima'), 10);
                 if (isNaN(numPortasEsportivo) || isNaN(velocidadeMaxima)) throw new Error("Dados do carro esportivo inválidos.");
                novoVeiculo = new CarroEsportivo(marca, modelo, ano, numPortasEsportivo, velocidadeMaxima);
                break;
            case 'Caminhao':
                const capacidadeCarga = parseFloat(formData.get('capacidadeCarga'));
                 if (isNaN(capacidadeCarga)) throw new Error("Capacidade de carga inválida.");
                novoVeiculo = new Caminhao(marca, modelo, ano, capacidadeCarga);
                break;
            default:
                alert("Tipo de veículo inválido.");
                return;
        }

        minhaGaragem.adicionarVeiculo(novoVeiculo);
        renderizarListaVeiculos(); // Atualiza a lista na tela
        formAdicionarVeiculo.reset(); // Limpa o formulário
        atualizarCamposFormulario(); // Reseta a visibilidade dos campos

    } catch (error) {
        console.error("Erro ao adicionar veículo:", error);
        alert(`Erro ao adicionar veículo: ${error.message}`);
    }
}

/**
 * Manipulador para cliques na lista de veículos (delegação de eventos).
 * @param {Event} event - O objeto do evento de clique.
 */
function handleListaVeiculosClick(event) {
    const target = event.target;
    const veiculoId = target.dataset.id; // Pega o ID do botão ou elemento pai

    if (!veiculoId) return; // Sai se não clicou em algo com ID

    // --- Ação de Remover ---
    if (target.classList.contains('btn-remover')) {
        if (confirm(`Tem certeza que deseja remover o veículo com ID ${veiculoId}?`)) {
            if (minhaGaragem.removerVeiculo(veiculoId)) {
                renderizarListaVeiculos(); // Atualiza a UI
            } else {
                alert("Não foi possível remover o veículo.");
            }
        }
    }

    // --- Ação de Ver Detalhes ---
    if (target.classList.contains('btn-detalhes')) {
        const veiculo = minhaGaragem.buscarVeiculoPorId(veiculoId);
        if (veiculo) {
            // Aqui você pode mostrar os detalhes em um modal, outra seção, etc.
            alert(`Detalhes:\n${veiculo.getDescricao()}\nLigado: ${veiculo.ligado}`);
            // Exemplo de polimorfismo: chamar métodos específicos se existirem
            if (veiculo instanceof CarroEsportivo) {
                alert(veiculo.ativarNitro()); // Chama método específico do CarroEsportivo
            }
             if (veiculo instanceof Caminhao) {
                alert(veiculo.carregar("Carga Genérica")); // Chama método específico do Caminhão
            }
            // Poderia também listar manutenções aqui
             const manutencoesVeiculo = minhaGaragem.listarManutencoes(veiculoId);
             if(manutencoesVeiculo.length > 0) {
                alert(`Manutenções:\n${manutencoesVeiculo.map(m => m.getDescricaoFormatada()).join('\n')}`);
             } else {
                alert("Nenhuma manutenção registrada para este veículo.");
             }

        } else {
            alert("Veículo não encontrado.");
        }
    }

     // Adicione outras ações (ex: editar, ligar/desligar) aqui
}


// --- Inicialização e Registro de Eventos ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Inicializando aplicação.");

    // Inicializa a visibilidade dos campos do formulário
    if (selectTipoVeiculo) {
        selectTipoVeiculo.addEventListener('change', atualizarCamposFormulario);
        atualizarCamposFormulario(); // Chama uma vez para o estado inicial
    }

    // Adiciona listener para o formulário
    if (formAdicionarVeiculo) {
        formAdicionarVeiculo.addEventListener('submit', handleAdicionarVeiculo);
    }

    // Adiciona listener para a lista de veículos (delegação de eventos)
    if (listaVeiculosElement) {
        listaVeiculosElement.addEventListener('click', handleListaVeiculosClick);
    }

     // Botão opcional para limpar LocalStorage (para testes)
     if(btnLimparStorage) {
        btnLimparStorage.addEventListener('click', () => {
            if(confirm("ATENÇÃO: Isso apagará TODOS os dados da garagem salvos. Deseja continuar?")) {
                localStorage.removeItem('garagem_veiculos');
                localStorage.removeItem('garagem_manutencoes');
                // Recria a garagem vazia e renderiza
                // (ou simplesmente recarrega a página)
                window.location.reload();
            }
        });
     }


    // Renderiza a lista inicial de veículos (carregada do LocalStorage pela Garagem)
    renderizarListaVeiculos();

    // Exemplo: Adicionar uma manutenção (poderia vir de outro formulário)
    /*
    const veiculos = minhaGaragem.listarVeiculos();
    if (veiculos.length > 0) {
        const primeiroVeiculoId = veiculos[0].id;
        try {
            const novaManutencao = new Manutencao(primeiroVeiculoId, "Troca de óleo", new Date(), 150.00);
            minhaGaragem.adicionarManutencao(novaManutencao);
            console.log("Manutenção de exemplo adicionada.");
        } catch (error) {
            console.warn("Não foi possível adicionar manutenção de exemplo:", error.message);
        }
    }
    */

});
