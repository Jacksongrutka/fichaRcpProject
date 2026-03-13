import { Ficha } from "../models/ficha";

export const fichaVazia: Ficha = {
    personagem: {
        informacaoPersonagem: {
            nome:"",
            rankAgente:"",
            idade:0,
            sexo:"",
            treinamentos:[],
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
            vida: 0,
            energia: 0,
            sanidade: 0,
            ferimentos: [],
        },
        pericias: {
            pericia:[{
                nome: "atletismo",
                valor: 1
            },
            {
                nome: "escalar",
                valor: 1
            },
            {
                nome: "luta",
                valor: 1
            },
            {
                nome: "acrobacia",
                valor: 1
            },
            {
                nome: "pontaria",
                valor: 1
            },
            {
                nome: "arremessar",
                valor: 1
            },
            {
                nome: "dirigir",
                valor: 1
            },
            {
                nome: "nadar",
                valor: 1
            },
            {
                nome: "furtividade",
                valor: 1
            },
            {
                nome: "ladinagem",
                valor: 1
            },
            {
                nome: "esquiva",
                valor: 1
            },
            {
                nome: "destrancar",
                valor: 1
            },
            {
                nome: "saltar",
                valor: 1
            },
            {
                nome: "labia",
                valor: 1,
            },
            {
                nome: "charme",
                valor: 1
            },
            {
                nome: "persuasão",
                valor: 1
            },
            {
                nome: "intimidação",
                valor: 1
            },
            {
                nome: "medicina",
                valor: 1
            },
            {
                nome: "atualidades",
                valor: 1
            },
            {
                nome: "história",
                valor: 1
            },
            {
                nome: "ocultismo",
                valor: 1
            },
            {
                nome: "pilotar",
                valor: 1
            },
            {
                nome: "Navegar",
                valor: 1
            },
            {
                nome: "Ciencias básica",
                valor: 1
            },
            {
                nome: "psicologia",
                valor: 1
            },
            {
                nome: "sobrevivencia",
                valor: 1
            },
            {
                nome: "lingua nativa",
                valor: 1
            },
            {
                nome: "concertos eletricos",
                valor: 1
            },
            {
                nome: "concertos mecanicos",
                valor: 1
            },
            {
                nome: "concertos eletronicos",
                valor: 1
            },
            {
                nome: "usar computadores",
                valor: 1
            },
            {
                nome: "rastrear",
                valor: 1
            },
            {
                nome: "investigaçao",
                valor: 1
            },
            {
                nome: "sorte",
                valor: 1
            },
            {
                nome: "credito",
                valor: 1
            },
        ]
        },
        bonus: {
            bonusCorpoACorpo: 0,
            resistencias: [],
            OutrosBonus: [],
        },
        ataques: {
            nome: "",
            pericia: "",
            dano: "",
            tipo: "",
            efeito: "",
            municao: 0,
        }
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