import { Ficha } from "../models/ficha";

export const fichaVazia: Ficha = {
    personagem: {
        informacaoPersonagem: {
            nome:"",
            rankAgente:"",
            idade:0,
            sexo:"",
            treinamentoCombatente: 0,
            treinamentoEspecialista: 0,
            treinamentoOcultista: 0,
        },
        atributos: {
            forca: 0,
            destreza: 0,
            constituicao: 0,
            tamanho: 0,
            inteligencia: 0,
            sabedoria: 0,
            carisma: 0,
            poder: 0,
        },
        status: {
            vidaAtual: 0,
            vidaMax: 0,
            energiaAtual: 0,
            energiaMax: 0,
            sanidadeAtual: 0,
            sanidadeMax: 0,
            ferimentos: [],
        },
        pericias: [
            {
                periciaNome: "atletismo",
                periciaValor: 1
            },
            {
                periciaNome: "escalar",
                periciaValor: 1
            },
            {
                periciaNome: "luta",
                periciaValor: 1
            },
            {
                periciaNome: "acrobacia",
                periciaValor: 1
            },
            {
                periciaNome: "pontaria",
                periciaValor: 1
            },
            {
                periciaNome: "arremessar",
                periciaValor: 1
            },
            {
                periciaNome: "dirigir",
                periciaValor: 1
            },
            {
                periciaNome: "nadar",
                periciaValor: 1
            },
            {
                periciaNome: "furtividade",
                periciaValor: 1
            },
            {
                periciaNome: "ladinagem",
                periciaValor: 1
            },
            {
                periciaNome: "esquiva",
                periciaValor: 1
            },
            {
                periciaNome: "destrancar",
                periciaValor: 1
            },
            {
                periciaNome: "saltar",
                periciaValor: 1
            },
            {
                periciaNome: "labia",
                periciaValor: 1
            },
            {
                periciaNome: "charme",
                periciaValor: 1
            },
            {
                periciaNome: "persuasão",
                periciaValor: 1
            },
            {
                periciaNome: "intimidação",
                periciaValor: 1
            },
            {
                periciaNome: "medicina",
                periciaValor: 1
            },
            {
                periciaNome: "atualidades",
                periciaValor: 1
            },
            {
                periciaNome: "história",
                periciaValor: 1
            },
            {
                periciaNome: "ocultismo",
                periciaValor: 1
            },
            {
                periciaNome: "pilotar",
                periciaValor: 1
            },
            {
                periciaNome: "Navegar",
                periciaValor: 1
            },
            {
                periciaNome: "Ciencias básica",
                periciaValor: 1
            },
            {
                periciaNome: "psicologia",
                periciaValor: 1
            },
            {
                periciaNome: "sobrevivencia",
                periciaValor: 1
            },
            {
                periciaNome: "lingua nativa",
                periciaValor: 1
            },
            {
                periciaNome: "concertos eletricos",
                periciaValor: 1
            },
            {
                periciaNome: "concertos mecanicos",
                periciaValor: 1
            },
            {
                periciaNome: "concertos eletronicos",
                periciaValor: 1
            },
            {
                periciaNome: "usar computadores",
                periciaValor: 1
            },
            {
                periciaNome: "rastrear",
                periciaValor: 1
            },
            {
                periciaNome: "investigaçao",
                periciaValor: 1
            },
            {
                periciaNome: "sorte",
                periciaValor: 1
            },
            {
                periciaNome: "credito",
                periciaValor: 1
            }
        ]
        ,
        bonus: {
            bonusCorpoACorpo: 0,
            resistencias: [],
            OutrosBonus: [],
        },
        ataques: [],
    },
    habilidades: {
        evolucoes: [],
        poderes: [],
        ritual: [],
    },
    inventario: {
        dinheiro: 0,
        item: [],
    },
    background: {
        aparencia: {
            idade: 0,
            altura: 0,
            corDosOlhos: "",
            membrosDecepados: "",
            aparenciaGeral: "",
        },
        historia: "",
        pessoasImportantes: [],
        traumas: "",
        ancoras: "",
    },
    notas: {
        nota: "",
    }};