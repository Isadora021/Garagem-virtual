// Variáveis globais
let carroEsportivo;
let caminhao;

// Elementos de áudio
const audioBuzina = document.getElementById("audioBuzina");
const audioAceleracao = document.getElementById("audioAceleracao");
const audioFrenagem = document.getElementById("audioFrenagem");
const audioLigar = document.getElementById("audioLigar");
const audioDesligar = document.getElementById("audioDesligar");

// Classes (mantendo as já definidas)
class Carro {
    constructor(modelo, cor) {
        this.modelo = modelo;
        this.cor = cor;
        this.ligado = false;
        this.velocidade = 0;
        this.velocidadeMaxima = 180; // Velocidade máxima padrão
    }

    ligar() {
        if (!this.ligado) {
            this.ligado = true;
            atualizarInterface();
            playAudio(audioLigar);
            return "Carro ligado!";
        } else {
            return "O carro já está ligado.";
        }
    }

    desligar() {
        if (this.ligado) {
            this.ligado = false;
            this.velocidade = 0;
            atualizarInterface();
            playAudio(audioDesligar);
            return "Carro desligado!";
        } else {
            return "O carro já está desligado.";
        }
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O carro precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }

    frear(decremento) {
        if (this.velocidade === 0) {
            return "O carro já está parado.";
        }
        this.velocidade -= decremento;
        if (this.velocidade < 0) {
            this.velocidade = 0;
        }
        atualizarInterface();
        playAudio(audioFrenagem);
        return `Velocidade reduzida para ${this.velocidade} km/h.`;

    }

    buzinar() {
        playAudio(audioBuzina);
        return "Beep! Beep!";
    }
}

class CarroEsportivo extends Carro {
    constructor(modelo, cor) {
        super(modelo, cor);
        this.turboAtivado = false;
        this.velocidadeMaxima = 250;
    }

    ativarTurbo() {
        if (!this.ligado) {
            return "O carro precisa estar ligado para ativar o turbo.";
        }

        if (this.turboAtivado) {
            return "O turbo já está ativado.";
        }

        this.turboAtivado = true;
        this.velocidadeMaxima = 300;
        atualizarInterface();
        return "Turbo ativado!";
    }

    desativarTurbo() {
        this.turboAtivado = false;
        this.velocidadeMaxima = 250;
        atualizarInterface();
        return "Turbo desativado.";
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O carro precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }
}

class Caminhao extends Carro {
    constructor(modelo, cor, capacidadeCarga) {
        super(modelo, cor);
        this.capacidadeCarga = capacidadeCarga;
        this.cargaAtual = 0;
        this.velocidadeMaxima = 120;
    }

    carregar(quantidade) {
        if (quantidade <= 0) {
            return "A quantidade a carregar deve ser maior que zero.";
        }

        if (this.cargaAtual + quantidade > this.capacidadeCarga) {
            return "Capacidade máxima de carga excedida.";
        }
        this.cargaAtual += quantidade;
        atualizarInterface();
        return `Caminhão carregado. Carga atual: ${this.cargaAtual} kg.`;
    }

    descarregar(quantidade) {
        if (quantidade <= 0) {
            return "A quantidade a descarregar deve ser maior que zero.";
        }

        if (this.cargaAtual - quantidade < 0) {
            return "Não é possível descarregar mais do que o caminhão possui.";
        }
        this.cargaAtual -= quantidade;
        atualizarInterface();
        return `Caminhão descarregado. Carga atual: ${this.cargaAtual} kg.`;
    }

    ativarTurbo() {
        return "Caminhões não possuem turbo.";
    }

    acelerar(incremento) {
        if (!this.ligado) {
            return "O caminhão precisa estar ligado para acelerar.";
        }

        if (this.velocidade + incremento > this.velocidadeMaxima) {
            this.velocidade = this.velocidadeMaxima;
            atualizarInterface();
            return "Velocidade máxima atingida!";
        }
        this.velocidade += incremento;
        atualizarInterface();
        playAudio(audioAceleracao);
        return `Velocidade aumentada para ${this.velocidade} km/h.`;

    }
}

// Funções de criação
function criarCarroEsportivo() {
    const modelo = document.getElementById("modeloEsportivo").value;
    const cor = document.getElementById("corEsportivo").value;
    carroEsportivo = new CarroEsportivo(modelo, cor);
    atualizarInterface();
}

function criarCaminhao() {
    const modelo = document.getElementById("modeloCaminhao").value;
    const cor = document.getElementById("corCaminhao").value;
    const capacidadeCarga = parseInt(document.getElementById("capacidadeCarga").value);
    caminhao = new Caminhao(modelo, cor, capacidadeCarga);
    atualizarInterface();
}

// Funções de interação
function ligarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.ligar());
}

function desligarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.desligar());
}

function acelerarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.acelerar(10));
}

function buzinarCarroEsportivo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.buzinar());
}

function ativarTurbo() {
    if (!carroEsportivo) {
        showAlert("Crie o carro esportivo primeiro!");
        return;
    }
    showAlert(carroEsportivo.ativarTurbo());
}

function ligarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.ligar());
}

function desligarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.desligar());
}

function acelerarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.acelerar(5));
}

function buzinarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    showAlert(caminhao.buzinar());
}

function carregarCaminhao() {
    if (!caminhao) {
        showAlert("Crie o caminhão primeiro!");
        return;
    }
    const quantidade = parseInt(document.getElementById("quantidadeCarga").value);
    showAlert(caminhao.carregar(quantidade));
}

// Funções auxiliares
function atualizarInterface() {
    // Carro Esportivo
    const carroEsportivoStatus = document.getElementById("carroEsportivoStatus");
    const carroEsportivoVelocidade = document.getElementById("carroEsportivoVelocidade");
    const carroEsportivoVelocidadeValor = document.getElementById("carroEsportivoVelocidadeValor");

    if (carroEsportivo) {
        carroEsportivoStatus.textContent = carroEsportivo.ligado ? "Ligado" : "Desligado";
        carroEsportivoStatus.className = carroEsportivo.ligado ? "ligado" : "desligado";
        carroEsportivoVelocidade.value = carroEsportivo.velocidade;
        carroEsportivoVelocidadeValor.textContent = `${carroEsportivo.velocidade} km/h`;
    } else {
        carroEsportivoStatus.textContent = "Desligado";
        carroEsportivoStatus.className = "desligado";
        carroEsportivoVelocidade.value = 0;
        carroEsportivoVelocidadeValor.textContent = "0 km/h";
    }

    // Caminhão
    const caminhaoStatus = document.getElementById("caminhaoStatus");
    const caminhaoVelocidade = document.getElementById("caminhaoVelocidade");
    const caminhaoVelocidadeValor = document.getElementById("caminhaoVelocidadeValor");
    const caminhaoCargaAtual = document.getElementById("caminhaoCargaAtual");
    const caminhaoCapacidadeCarga = document.getElementById("caminhaoCapacidadeCarga");

    if (caminhao) {
        caminhaoStatus.textContent = caminhao.ligado ? "Ligado" : "Desligado";
        caminhaoStatus.className = caminhao.ligado ? "ligado" : "desligado";
        caminhaoVelocidade.value = caminhao.velocidade;
        caminhaoVelocidadeValor.textContent = `${caminhao.velocidade} km/h`;
        caminhaoCargaAtual.textContent = caminhao.cargaAtual + " kg";
        caminhaoCapacidadeCarga.textContent = caminhao.capacidadeCarga + " kg";
    } else {
        caminhaoStatus.textContent = "Desligado";
        caminhaoStatus.className = "desligado";
        caminhaoVelocidade.value = 0;
        caminhaoVelocidadeValor.textContent = "0 km/h";
        caminhaoCargaAtual.textContent = "0 kg";
        caminhaoCapacidadeCarga.textContent = "0 kg";
    }
}

function showAlert(message) {
    const alertContainer = document.getElementById("alert-container");
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.textContent = message;
    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000); // Remove o alerta após 3 segundos
}

function playAudio(audioElement) {
    audioElement.currentTime = 0; // Reinicia o áudio
    audioElement.play();
}

// Volume control
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener("input", function() {
    const volume = volumeControl.value;
    audioBuzina.volume = volume;
    audioAceleracao.volume = volume;
    audioFrenagem.volume = volume;
    audioLigar.volume = volume;
    audioDesligar.volume = volume;
});

// Inicialização
atualizarInterface();

// --- Classes ---

class Manutencao {
    constructor(data, tipo, custo, descricao = '') {
        // Tenta converter a string de data para objeto Date
        const dataObj = new Date(data);
        // Verifica se a conversão resultou em uma data válida
        if (isNaN(dataObj.getTime())) {
            throw new Error("Data inválida fornecida para Manutenção.");
        }
        this.data = dataObj; // Armazena como objeto Date

        if (!tipo || typeof tipo !== 'string') {
            throw new Error("Tipo de serviço inválido ou ausente.");
        }
        this.tipo = tipo.trim();

        const custoNum = parseFloat(custo);
        if (isNaN(custoNum) || custoNum < 0) {
            throw new Error("Custo inválido ou negativo.");
        }
        this.custo = custoNum;
        this.descricao = descricao.trim() || ''; // Garante que seja string
    }

    // Método para formatar a exibição
    formatar() {
        const dataFormatada = this.data.toLocaleDateString('pt-BR', { timeZone: 'UTC' }); // UTC para evitar problemas de fuso
        const custoFormatado = this.custo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        let texto = `${this.tipo} em ${dataFormatada} - ${custoFormatado}`;
        if (this.descricao) {
            texto += ` (${this.descricao})`;
        }
        // Verifica se a data é futura (agendamento)
        if (this.data > new Date()) {
             const horaFormatada = this.data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
             texto += ` (Agendado para ${horaFormatada})`;
        }
        return texto;
    }

    // Método simples de validação (já feito no construtor, mas pode expandir)
    validar() {
        const errors = [];
        if (isNaN(this.data.getTime())) errors.push("Data inválida.");
        if (!this.tipo) errors.push("Tipo de serviço é obrigatório.");
        if (isNaN(this.custo) || this.custo < 0) errors.push("Custo deve ser um número positivo.");
        return errors; // Retorna array de erros (vazio se válido)
    }

     // Converte para um objeto simples para JSON (armazena data como ISO string)
    toJSON() {
        return {
            data: this.data.toISOString(), // Salva como string ISO 8601
            tipo: this.tipo,
            custo: this.custo,
            descricao: this.descricao
        };
    }

    // Cria uma instância a partir de um objeto simples (vindo do JSON)
    static fromJSON(json) {
        if (!json || !json.data || !json.tipo || json.custo == null) {
            console.error("Dados JSON inválidos para Manutencao:", json);
            // Retornar um objeto inválido ou lançar erro? Decidi logar e retornar null.
            // Dependendo da robustez desejada, poderia lançar um erro.
             return null;
        }
        try {
            // O construtor agora lida com a conversão da string ISO de volta para Date
            return new Manutencao(json.data, json.tipo, json.custo, json.descricao);
        } catch (error) {
            console.error("Erro ao recriar Manutencao do JSON:", error, json);
            return null; // Retorna null se a recriação falhar
        }
    }
}

class Veiculo {
    constructor(marca, modelo, ano, tipo = 'Veiculo') { // Adiciona tipo para persistência
        if (!marca || !modelo || !ano || ano < 1886 || ano > new Date().getFullYear() + 2) {
             throw new Error("Dados básicos do veículo inválidos (Marca, Modelo, Ano).");
        }
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.status = 'Disponível'; // Exemplo de status
        this.historicoManutencao = []; // Array de objetos Manutencao
        this._tipoVeiculo = tipo; // Armazena o tipo específico da classe para recriação
         // Gera um ID simples para identificar o veículo no select do formulário
         this.id = `${tipo}-${marca}-${modelo}-${Date.now()}${Math.random().toString(16).slice(2)}`;
    }

    adicionarManutencao(manutencao) {
        if (!(manutencao instanceof Manutencao)) {
            console.error("Tentativa de adicionar item inválido ao histórico:", manutencao);
            mostrarNotificacao("Erro interno: Tipo de manutenção inválido.", 'erro');
            return false; // Falha ao adicionar
        }
        const erros = manutencao.validar();
        if (erros.length > 0) {
            mostrarNotificacao(`Erro ao adicionar manutenção: ${erros.join(' ')}`, 'erro');
            return false; // Falha ao adicionar
        }
        this.historicoManutencao.push(manutencao);
        // Ordena o histórico por data (mais recente primeiro)
        this.historicoManutencao.sort((a, b) => b.data - a.data);
        console.log(`Manutenção adicionada ao ${this.modelo}:`, manutencao.formatar());
        return true; // Sucesso
    }

    // Retorna apenas o histórico passado formatado
    getHistoricoPassadoFormatado() {
        const agora = new Date();
        return this.historicoManutencao
            .filter(m => m.data <= agora) // Filtra apenas datas passadas ou hoje
            .map(m => `<li class="historico-item historico-passado">${m.formatar()}</li>`) // Adiciona classe para estilo
            .join('');
    }

    // Retorna apenas os agendamentos futuros formatados
    getAgendamentosFuturosFormatado() {
        const agora = new Date();
        return this.historicoManutencao
            .filter(m => m.data > agora) // Filtra apenas datas futuras
            .map(m => `<li class="historico-item agendamento-item">${m.formatar()}</li>`) // Adiciona classe para estilo
            .join('');
    }

    // Método para exibir informações básicas do veículo
    getInfoBasica() {
         return `${this.marca} ${this.modelo} (${this.ano})`;
    }

    // Prepara o objeto para ser salvo no LocalStorage
    toJSON() {
        return {
            _tipoVeiculo: this._tipoVeiculo, // Salva o tipo!
            marca: this.marca,
            modelo: this.modelo,
            ano: this.ano,
            status: this.status,
            id: this.id, // Salva o ID
            // Mapeia cada manutenção para seu formato JSON
            historicoManutencao: this.historicoManutencao.map(m => m.toJSON())
        };
    }

    // Método estático (ou uma função helper) para recriar a instância
    static fromJSON(json) {
        if (!json || !json._tipoVeiculo || !json.marca || !json.modelo || !json.ano || !json.id) {
            console.error("Dados JSON inválidos para Veiculo:", json);
            return null; // Retorna null se dados básicos estiverem faltando
        }

        let veiculo;
        // Usa o _tipoVeiculo para instanciar a classe correta
        switch (json._tipoVeiculo) {
            case 'Carro':
                veiculo = new Carro(json.marca, json.modelo, json.ano, json.numPortas);
                break;
            case 'CarroEsportivo':
                veiculo = new CarroEsportivo(json.marca, json.modelo, json.ano, json.numPortas, json.velocidadeMaxima);
                 // Atributo numPortas pode não existir se a estrutura original não o tinha
                 if (json.numPortas !== undefined) veiculo.numPortas = json.numPortas;
                break;
            case 'Caminhao':
                veiculo = new Caminhao(json.marca, json.modelo, json.ano, json.capacidadeCarga);
                break;
            default:
                console.warn(`Tipo de veículo desconhecido encontrado no JSON: ${json._tipoVeiculo}. Criando como Veiculo base.`);
                veiculo = new Veiculo(json.marca, json.modelo, json.ano);
        }

        // Restaura outros atributos comuns e o ID
        veiculo.status = json.status || 'Disponível'; // Default se não existir
        veiculo.id = json.id; // Restaura o ID

        // Recria os objetos Manutencao do array no JSON
        if (json.historicoManutencao && Array.isArray(json.historicoManutencao)) {
             veiculo.historicoManutencao = json.historicoManutencao
                 .map(mJson => Manutencao.fromJSON(mJson))
                 .filter(m => m !== null); // Filtra quaisquer manutenções que falharam ao recriar
             // Reordena após carregar
              veiculo.historicoManutencao.sort((a, b) => b.data - a.data);
        } else {
            veiculo.historicoManutencao = []; // Garante que seja um array vazio se não houver histórico
        }

        return veiculo;
    }
}

class Carro extends Veiculo {
    constructor(marca, modelo, ano, numPortas) {
        super(marca, modelo, ano, 'Carro'); // Passa o tipo específico
        const portas = parseInt(numPortas);
        if (isNaN(portas) || portas < 1) {
             throw new Error("Número de portas inválido para Carro.");
        }
        this.numPortas = portas;
    }

    // Sobrescreve toJSON para incluir numPortas
    toJSON() {
        const jsonBase = super.toJSON();
        return {
            ...jsonBase, // Copia atributos da classe pai
            numPortas: this.numPortas
        };
    }
}

class CarroEsportivo extends Carro { // Pode herdar de Carro
    constructor(marca, modelo, ano, numPortas, velocidadeMaxima) {
        super(marca, modelo, ano, numPortas); // Chama construtor do Carro
        this._tipoVeiculo = 'CarroEsportivo'; // Sobrescreve o tipo
        const velMax = parseInt(velocidadeMaxima);
         if (isNaN(velMax) || velMax <= 0) {
             throw new Error("Velocidade máxima inválida para Carro Esportivo.");
        }
        this.velocidadeMaxima = velMax;
    }

     // Sobrescreve toJSON para incluir velocidadeMaxima
    toJSON() {
        const jsonBase = super.toJSON();
        return {
            ...jsonBase,
            velocidadeMaxima: this.velocidadeMaxima
        };
    }
}

class Caminhao extends Veiculo {
    constructor(marca, modelo, ano, capacidadeCarga) {
        super(marca, modelo, ano, 'Caminhao'); // Passa o tipo específico
        const carga = parseFloat(capacidadeCarga);
         if (isNaN(carga) || carga < 0) {
             throw new Error("Capacidade de carga inválida para Caminhão.");
        }
        this.capacidadeCarga = carga;
    }

    // Sobrescreve toJSON para incluir capacidadeCarga
    toJSON() {
        const jsonBase = super.toJSON();
        return {
            ...jsonBase,
            capacidadeCarga: this.capacidadeCarga
        };
    }
}

class Garagem {
    constructor() {
        this.veiculos = [];
    }

    adicionarVeiculo(veiculo) {
        if (!(veiculo instanceof Veiculo)) {
            console.error("Tentativa de adicionar objeto inválido à garagem:", veiculo);
            mostrarNotificacao("Erro interno: Tipo de veículo inválido.", 'erro');
            return;
        }
        // Verifica se já existe um veículo com o mesmo ID (pouco provável, mas seguro)
        if (this.veiculos.some(v => v.id === veiculo.id)) {
             mostrarNotificacao(`Veículo ${veiculo.getInfoBasica()} já existe na garagem.`, 'aviso');
             return;
        }
        this.veiculos.push(veiculo);
        console.log(`Veículo ${veiculo.getInfoBasica()} adicionado à garagem.`);
    }

    listarVeiculos() {
        return this.veiculos;
    }

    encontrarVeiculoPorId(id) {
        return this.veiculos.find(v => v.id === id);
    }

    // Salva todos os veículos no LocalStorage
    salvarNoLocalStorage() {
        try {
            const veiculosJSON = this.veiculos.map(v => v.toJSON());
            localStorage.setItem('garagemVeiculos', JSON.stringify(veiculosJSON));
            console.log("Garagem salva no LocalStorage.");
        } catch (error) {
            console.error("Erro ao salvar garagem no LocalStorage:", error);
            mostrarNotificacao("Erro ao salvar dados. Verifique o console.", 'erro');
        }
    }

    // Carrega os veículos do LocalStorage
    carregarDoLocalStorage() {
        const veiculosJSONString = localStorage.getItem('garagemVeiculos');
        if (veiculosJSONString) {
            try {
                const veiculosJSON = JSON.parse(veiculosJSONString);
                // Mapeia os dados JSON de volta para instâncias das classes corretas
                this.veiculos = veiculosJSON
                                    .map(json => Veiculo.fromJSON(json))
                                    .filter(v => v !== null); // Filtra veículos que falharam na recriação
                console.log("Garagem carregada do LocalStorage. Veículos:", this.veiculos.length);
            } catch (error) {
                console.error("Erro ao carregar ou parsear garagem do LocalStorage:", error);
                mostrarNotificacao("Erro ao carregar dados salvos. Iniciando com garagem vazia.", 'erro');
                this.veiculos = []; // Reseta se houver erro de parse
                localStorage.removeItem('garagemVeiculos'); // Remove dados corrompidos
            }
        } else {
            this.veiculos = []; // Inicia vazio se não houver nada salvo
            console.log("Nenhum dado encontrado no LocalStorage. Iniciando garagem vazia.");
        }
    }
}

// --- Instância da Garagem e Elementos do DOM ---

const minhaGaragem = new Garagem();

const formAddVeiculo = document.getElementById('form-add-veiculo');
const selectTipoVeiculo = document.getElementById('tipo-veiculo');
const camposCarro = document.getElementById('campos-carro');
const camposCarroEsportivo = document.getElementById('campos-carro-esportivo');
const camposCaminhao = document.getElementById('campos-caminhao');
const listaVeiculosDiv = document.getElementById('lista-veiculos');

const formAgendarManutencao = document.getElementById('form-agendar-manutencao');
const selectVeiculoManutencao = document.getElementById('veiculo-select');
const listaAgendamentosDiv = document.getElementById('lista-agendamentos');
const notificacoesDiv = document.getElementById('notificacoes');

// Input de data/hora (usando Flatpickr se disponível)
const inputDataManutencao = document.getElementById('data-manutencao');
if (typeof flatpickr !== 'undefined') {
    flatpickr(inputDataManutencao, {
        enableTime: true,
        dateFormat: "Y-m-d H:i", // Formato compatível com datetime-local e new Date()
        time_24hr: true,
        locale: "pt" // Usa a tradução carregada
    });
}


// --- Funções Auxiliares ---

// Função para exibir notificações
function mostrarNotificacao(mensagem, tipo = 'info', duracao = 5000) {
    const div = document.createElement('div');
    div.className = `notificacao ${tipo}`;
    div.textContent = mensagem;
    notificacoesDiv.appendChild(div);

    // Remove a notificação após a duração
    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 500); // Espera a transição de opacidade
    }, duracao);
}

// Atualiza as opções do select de veículos no form de manutenção
function atualizarSelectVeiculos() {
    selectVeiculoManutencao.innerHTML = '<option value="" disabled selected>Selecione um veículo</option>'; // Limpa e adiciona placeholder
    minhaGaragem.listarVeiculos().forEach(veiculo => {
        const option = document.createElement('option');
        option.value = veiculo.id; // Usa o ID único como valor
        option.textContent = veiculo.getInfoBasica();
        selectVeiculoManutencao.appendChild(option);
    });
}

// Renderiza a lista de veículos na interface
function renderizarListaVeiculos() {
    listaVeiculosDiv.innerHTML = ''; // Limpa a lista atual
    const veiculos = minhaGaragem.listarVeiculos();

    if (veiculos.length === 0) {
        listaVeiculosDiv.innerHTML = '<p>Nenhum veículo na garagem.</p>';
        return;
    }

    veiculos.forEach(veiculo => {
        const card = document.createElement('div');
        card.className = 'veiculo-card';
        card.dataset.id = veiculo.id; // Adiciona ID para referência futura se necessário

        let detalhesEspecificos = '';
        if (veiculo instanceof Carro) {
            detalhesEspecificos += `<p><strong>Portas:</strong> ${veiculo.numPortas}</p>`;
        }
        if (veiculo instanceof CarroEsportivo) {
            detalhesEspecificos += `<p><strong>Vel. Máxima:</strong> ${veiculo.velocidadeMaxima} km/h</p>`;
        }
        if (veiculo instanceof Caminhao) {
            detalhesEspecificos += `<p><strong>Cap. Carga:</strong> ${veiculo.capacidadeCarga} Ton</p>`;
        }

        const historicoPassadoHtml = veiculo.getHistoricoPassadoFormatado();
        const agendamentosFuturosHtml = veiculo.getAgendamentosFuturosFormatado();

        card.innerHTML = `
            <h3>${veiculo.getInfoBasica()} <small>(${veiculo._tipoVeiculo})</small></h3>
            <p><strong>Status:</strong> ${veiculo.status}</p>
            ${detalhesEspecificos}
            <div class="historico-manutencao">
                ${agendamentosFuturosHtml ? `<h4>Agendamentos Futuros</h4><ul>${agendamentosFuturosHtml}</ul>` : ''}
                ${historicoPassadoHtml ? `<h4>Histórico de Manutenção</h4><ul>${historicoPassadoHtml}</ul>` : '<h4>Histórico de Manutenção</h4><p><small>Nenhuma manutenção registrada.</small></p>'}
            </div>
        `;
        listaVeiculosDiv.appendChild(card);
    });
}

// Renderiza a lista global de agendamentos futuros
function renderizarAgendamentosGlobais() {
     listaAgendamentosDiv.innerHTML = ''; // Limpa
     const agora = new Date();
     let agendamentosHtml = '';

     minhaGaragem.listarVeiculos().forEach(veiculo => {
         veiculo.historicoManutencao
             .filter(m => m.data > agora) // Apenas futuros
             .forEach(m => {
                 agendamentosHtml += `
                     <div class="agendamento-item">
                         <p><strong>Veículo:</strong> ${veiculo.getInfoBasica()}</p>
                         <p>${m.formatar()}</p>
                     </div>
                 `;
             });
     });

     if (agendamentosHtml === '') {
         listaAgendamentosDiv.innerHTML = '<p>Nenhum agendamento futuro.</p>';
     } else {
         listaAgendamentosDiv.innerHTML = agendamentosHtml;
     }
}

// Verifica agendamentos próximos e mostra alertas
function verificarAgendamentosProximos() {
    const agora = new Date();
    const amanha = new Date();
    amanha.setDate(agora.getDate() + 1);
    const limiteAmanha = new Date(amanha.getFullYear(), amanha.getMonth(), amanha.getDate(), 23, 59, 59); // Fim do dia de amanhã

    minhaGaragem.listarVeiculos().forEach(veiculo => {
        veiculo.historicoManutencao
            .filter(m => m.data > agora && m.data <= limiteAmanha) // Agendados para hoje (mais tarde) ou amanhã
            .forEach(m => {
                const dataHoraFormatada = m.data.toLocaleString('pt-BR', {dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC'});
                 const quando = m.data.toDateString() === agora.toDateString() ? "hoje" : "amanhã";
                 mostrarNotificacao(`Lembrete: ${m.tipo} para ${veiculo.getInfoBasica()} agendada para ${quando} (${dataHoraFormatada})`, 'aviso', 10000); // 10 segundos
            });
    });
}

// Função completa para atualizar toda a UI
function atualizarUICompleta() {
     renderizarListaVeiculos();
     atualizarSelectVeiculos();
     renderizarAgendamentosGlobais();
     // Salva o estado atual no LocalStorage após qualquer mudança relevante
     minhaGaragem.salvarNoLocalStorage();
}

// --- Event Listeners ---

// Listener para mudar os campos específicos ao selecionar o tipo de veículo
selectTipoVeiculo.addEventListener('change', (e) => {
    const tipo = e.target.value;
    // Oculta todos primeiro
    camposCarro.style.display = 'none';
    camposCarroEsportivo.style.display = 'none';
    camposCaminhao.style.display = 'none';
    // Desabilita inputs para não serem enviados se ocultos (melhor prática)
    camposCarro.querySelectorAll('input').forEach(input => input.required = false);
    camposCarroEsportivo.querySelectorAll('input').forEach(input => input.required = false);
    camposCaminhao.querySelectorAll('input').forEach(input => input.required = false);


    // Mostra os campos relevantes e torna inputs required
    if (tipo === 'Carro' || tipo === 'CarroEsportivo') {
        camposCarro.style.display = 'block';
        camposCarro.querySelector('#num-portas').required = true;
    }
    if (tipo === 'CarroEsportivo') {
        camposCarroEsportivo.style.display = 'block';
        camposCarroEsportivo.querySelector('#vel-maxima').required = true;
    }
    if (tipo === 'Caminhao') {
        camposCaminhao.style.display = 'block';
        camposCaminhao.querySelector('#cap-carga').required = true;
    }
});

// Listener para adicionar veículo
formAddVeiculo.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const tipo = document.getElementById('tipo-veiculo').value;
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const ano = parseInt(document.getElementById('ano').value);

    try {
        let novoVeiculo;
        switch (tipo) {
            case 'Carro':
                const numPortas = document.getElementById('num-portas').value;
                novoVeiculo = new Carro(marca, modelo, ano, numPortas);
                break;
            case 'CarroEsportivo':
                const numPortasEsportivo = document.getElementById('num-portas').value; // Pega do campo Carro
                const velMaxima = document.getElementById('vel-maxima').value;
                novoVeiculo = new CarroEsportivo(marca, modelo, ano, numPortasEsportivo, velMaxima);
                break;
            case 'Caminhao':
                const capCarga = document.getElementById('cap-carga').value;
                novoVeiculo = new Caminhao(marca, modelo, ano, capCarga);
                break;
            default:
                mostrarNotificacao('Tipo de veículo inválido selecionado.', 'erro');
                return; // Sai da função se o tipo for inválido
        }

        minhaGaragem.adicionarVeiculo(novoVeiculo);
        atualizarUICompleta(); // Atualiza a lista, select, salva no LS
        formAddVeiculo.reset(); // Limpa o formulário
        // Oculta campos específicos novamente após adicionar
        camposCarro.style.display = 'none';
        camposCarroEsportivo.style.display = 'none';
        camposCaminhao.style.display = 'none';
        mostrarNotificacao(`Veículo ${novoVeiculo.getInfoBasica()} adicionado com sucesso!`, 'sucesso');

    } catch (error) {
        console.error("Erro ao criar veículo:", error);
        mostrarNotificacao(`Erro ao adicionar veículo: ${error.message}`, 'erro');
    }
});

// Listener para agendar/registrar manutenção
formAgendarManutencao.addEventListener('submit', (e) => {
     e.preventDefault();

     const veiculoId = selectVeiculoManutencao.value;
     const dataHora = inputDataManutencao.value; // Vem no formato 'YYYY-MM-DDTHH:mm' ou do flatpickr
     const tipoServico = document.getElementById('tipo-servico').value.trim();
     const custo = document.getElementById('custo-manutencao').value;
     const descricao = document.getElementById('descricao-manutencao').value.trim();

     // Validação básica do formulário
     if (!veiculoId) {
         mostrarNotificacao("Selecione um veículo.", 'erro');
         return;
     }
      if (!dataHora) {
         mostrarNotificacao("Selecione a data e hora da manutenção.", 'erro');
         return;
     }
      if (!tipoServico) {
         mostrarNotificacao("Informe o tipo de serviço.", 'erro');
         return;
     }
       if (custo === '' || parseFloat(custo) < 0) {
         mostrarNotificacao("Informe um custo válido (maior ou igual a zero).", 'erro');
         return;
     }

     const veiculo = minhaGaragem.encontrarVeiculoPorId(veiculoId);
     if (!veiculo) {
         mostrarNotificacao("Erro: Veículo selecionado não encontrado.", 'erro');
         return;
     }

     try {
         // Cria a instância de Manutencao (o construtor valida os dados)
         const novaManutencao = new Manutencao(dataHora, tipoServico, custo, descricao);

         // Adiciona ao histórico do veículo
         if (veiculo.adicionarManutencao(novaManutencao)) {
             atualizarUICompleta(); // Atualiza tudo e salva no LS
             formAgendarManutencao.reset(); // Limpa o formulário
             // Reset flatpickr visualmente se estiver usando
             if (inputDataManutencao._flatpickr) {
                inputDataManutencao._flatpickr.clear();
             }

             // Verifica se é agendamento ou registro para a mensagem
             if (novaManutencao.data > new Date()) {
                 mostrarNotificacao(`Manutenção agendada para ${veiculo.getInfoBasica()}!`, 'sucesso');
                 verificarAgendamentosProximos(); // Re-verifica alertas após novo agendamento
             } else {
                  mostrarNotificacao(`Manutenção registrada para ${veiculo.getInfoBasica()}!`, 'sucesso');
             }
         }
         // Se adicionarManutencao retornar false, a notificação de erro já foi mostrada lá dentro

     } catch (error) {
         console.error("Erro ao criar ou adicionar manutenção:", error);
         mostrarNotificacao(`Erro: ${error.message}`, 'erro');
     }
});


// --- Inicialização ---

// Executa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado. Iniciando aplicação.");
    minhaGaragem.carregarDoLocalStorage(); // Carrega dados salvos

    // <<< INÍCIO DA MODIFICAÇÃO >>>
    // Verifica se a garagem está vazia após carregar do localStorage
    if (minhaGaragem.listarVeiculos().length === 0) {
        console.log("Garagem vazia após carregar. Adicionando veículo padrão para demonstração.");
        try {
            // Cria um veículo de exemplo (pode ser qualquer tipo)
            const veiculoPadrao = new Carro('Marca Padrão', 'Modelo Exemplo', 2020, 4);
            minhaGaragem.adicionarVeiculo(veiculoPadrao);
            // Opcional: Notificar o usuário
            mostrarNotificacao('Veículo de exemplo adicionado automaticamente.', 'info');
            // Não precisa salvar aqui imediatamente, pois atualizarUICompleta() fará isso.
        } catch (error) {
            console.error("Erro ao criar o veículo padrão:", error);
            // A aplicação continua mesmo se a criação do padrão falhar
        }
    }
    // <<< FIM DA MODIFICAÇÃO >>>

    atualizarUICompleta(); // Renderiza a UI inicial (agora incluirá o veículo padrão se foi adicionado)
    verificarAgendamentosProximos(); // Verifica alertas ao carregar a página
     // Garante que os campos específicos corretos estejam visíveis se o formulário não foi resetado
     selectTipoVeiculo.dispatchEvent(new Event('change'));
});