import React from 'react';
import { Icon } from "leaflet";
import { useEffect, useState } from 'react';
   

import { Chart } from "react-google-charts";

import 'moment/locale/pt-br'
import _ from 'lodash';
import axios from 'axios';

import favorito from '../src/Data/favorito.json'

const open = new Icon({ iconUrl: "/open.gif", iconSize: [35, 35] })
const camera = new Icon({ iconUrl: "/camera.png", iconSize: [15, 15] })
const operacaopolicial = new Icon({ iconUrl: "/operacaopolicial.png", iconSize: [40, 40] })
const buraconavia = new Icon({ iconUrl: "/buraconavia.png", iconSize: [35, 35] })
const obrasnavia = new Icon({ iconUrl: "/obrasnavia.png", iconSize: [40, 40] })
const falhanosemaforo = new Icon({ iconUrl: "/falhanosemaforo.png", iconSize: [30, 30] })
const acidenteleve = new Icon({ iconUrl: "/acidenteleve.png", iconSize: [40, 40] })
const asfaltoliso = new Icon({ iconUrl: "/asfaltoliso.png", iconSize: [40, 40] })
const evento = new Icon({ iconUrl: "/evento.png", iconSize: [40, 40], shadowSize:   [50, 64] })
const manifestacao = new Icon({ iconUrl: "/manifestacao.png", iconSize: [40, 40], shadowSize:   [50, 64] })
const deslizamento = new Icon({ iconUrl: "/deslizamento.png", iconSize: [40, 40], shadowSize:   [50, 64] })
const vazamentodeagua = new Icon({ iconUrl: "/vazamentodeagua.png", iconSize: [30, 30] })
const bueiro = new Icon({ iconUrl: "/bueiro.png", iconSize: [40, 40] })
const incendio = new Icon({ iconUrl: "/incendio.png", iconSize: [30, 30] })
const quedadearvore = new Icon({ iconUrl: "/quedadearvore.png", iconSize: [45, 45] })



export const options = {
    title: "Total de Ocorrências",
    legend: { position: 'none' },
    colors: ['#ce6b01'],
   
    backgroundColor: '#FFF',
    chartArea: { width: "100%", height: "100%" },
    
    hAxis: {
//      title: "Total de Ocorrências Abertas",
      minValue: 0,
      format: 0
      
    },
    vAxis: {
      //title: "Ocorrências por POP",
      scaleType: 'log'
    },
  };

  export const optionsPop = {
    //title: "Total de Ocorrências",
    colors: ['#ce6b01'],
    legend: { position: 'none' },
    backgroundColor: '#FFF',
    chartArea: { width: "50%", height: "90%" },
    
    
    hAxis: {
//      title: "Total de Ocorrências Abertas",
      minValue: 0,
      format: 0
      
    },
    vAxis: {
      //title: "Ocorrências por POP",
      scaleType: 'log'
      
    },
  };

  function pops(params) {
  
    var pop = params;
    if (pop === 1) {pop = 'Acidente/enguiço sem vítima';
    } else if (pop === 2) {pop = 'Acidente com vítima(s)';
    } else if (pop === 3) {pop = 'Acidente com vítima(s) fatal(is)';
    } else if (pop === 4) {pop = 'Incêndio em veículo(s)';
    } else if (pop === 5) {pop = 'Bolsão dágua em via';
    } else if (pop === 6) {pop = 'Alagamentos e enchentes';
    } else if (pop === 7) {pop = 'Manifestação em local público';
    } else if (pop === 8) {pop = 'Incêndio em imóvel';
    } else if (pop === 9) {pop = 'Sinais de trânsito com mau funcionamento';
    } else if (pop === 10) {pop = 'Reintegração de Posse';
    } else if (pop === 11) {pop = 'Queda de árvore';
    } else if (pop === 12) {pop = 'Queda de poste';
    } else if (pop === 13) {pop = 'Acidente com queda de carga';
    } else if (pop === 14) {pop = 'Incêndio no entorno de vias públicas';
    } else if (pop === 15) {pop = 'Incêndio dentro de túneis';
    } else if (pop === 16) {pop = 'Vazamento de água / esgoto';
    } else if (pop === 17) {pop = 'Falta de luz / Apagão';
    } else if (pop === 18) {pop = 'Implosão';
    } else if (pop === 19) {pop = 'Queda de estrutura de alvenaria';
    } else if (pop === 20) {pop = 'Vazamento de gás';
    } else if (pop === 21) {pop = 'Evento em local público ou particular';
    } else if (pop === 22) {pop = 'Atropelamento';
    } else if (pop === 23) {pop = 'Afundamento de Pista / Buraco na via';
    } else if (pop === 24) {pop = 'Abalroamento';
    } else if (pop === 25) {pop = 'Obra em local público';
    } else if (pop === 26) {pop = 'Operação policial';
    } else if (pop === 27) {pop = 'Bloco de Rua';
    } else if (pop === 28) {pop = 'Deslizamento';
    } else if (pop === 29) {pop = 'Animal em local público';
    } else if (pop === 30) {pop = 'Acionamento de sirenes';
    } else if (pop === 31) {pop = 'Alagamento';
    } else if (pop === 32) {pop = 'Enchente';
    } else if (pop === 33) {pop = 'Lâmina dágua';
    } else if (pop === 34) {pop = 'Acidente ambiental';
    } else if (pop === 35) {pop = 'Bueiro';
    } else if (pop === 36) {pop = 'Resgate ou remoção de Animais Terrestres e Aéreos';
    } else if (pop === 37) {pop = 'Remoção de Animais Mortos na Areia';
    } else if (pop === 38) {pop = 'Resgate de Animal Marinho Preso em rede / Encalhado';
    } else if (pop === 39) {pop = 'Incendio em vegetacao';
    } else if (pop === 40) {pop = 'Galho sobre fiação';
    } else {pop = 'vazio';}
  
    return pop
    
  }

  

  
function zonas(params) {

  
    var zona = params;
    if (zona === "São Cristóvão") {zona = 'CENTRAL';
} else if (zona === "Benfica") {zona = 'CENTRAL';
} else if (zona === "Caju") {zona = 'CENTRAL';
} else if (zona === "Catumbi") {zona = 'CENTRAL';
} else if (zona === "Centro") {zona = 'CENTRAL';
} else if (zona === "Cidade Nova") {zona = 'CENTRAL';
} else if (zona === "Estácio") {zona = 'CENTRAL';
} else if (zona === "Gamboa") {zona = 'CENTRAL';
} else if (zona === "Lapa") {zona = 'CENTRAL';
} else if (zona === "Mangueira") {zona = 'CENTRAL';
} else if (zona === "Paquetá") {zona = 'CENTRAL';
} else if (zona === "Rio Comprido") {zona = 'CENTRAL';
} else if (zona === "Santa Teresa") {zona = 'CENTRAL';
} else if (zona === "Santo Cristo") {zona = 'CENTRAL';
} else if (zona === "Saúde") {zona = 'CENTRAL';
} else if (zona === "Vasco da Gama") {zona = 'CENTRAL';
} else if (zona === "Alto da Boa Vista") {zona = 'NORTE';
} else if (zona === "Andaraí") {zona = 'NORTE';
} else if (zona === "Grajaú") {zona = 'NORTE';
} else if (zona === "Grajau") {zona = 'NORTE';
} else if (zona === "Maracanã") {zona = 'NORTE';
} else if (zona === "Praça da Bandeira") {zona = 'NORTE';
} else if (zona.includes("Praca da Bandeira")) {zona = 'NORTE';
} else if (zona === "Tijuca") {zona = 'NORTE';
} else if (zona === "Vila Isabel") {zona = 'NORTE';
} else if (zona === "Abolição") {zona = 'NORTE';
} else if (zona === "Água Santa") {zona = 'NORTE';
} else if (zona === "Cachambi") {zona = 'NORTE';
} else if (zona === "Del Castilho") {zona = 'NORTE';
} else if (zona === "Encantado") {zona = 'NORTE';
} else if (zona === "Engenho de Dentro") {zona = 'NORTE';
} else if (zona === "Engenho Novo") {zona = 'NORTE';
} else if (zona === "Higienópolis") {zona = 'NORTE';
} else if (zona === "Ilha do Governador") {zona = 'NORTE';
} else if (zona === "Fundao") {zona = 'NORTE';
} else if (zona === "Fundão") {zona = 'NORTE';
} else if (zona === "Cidade Universitária da Universidade Federal do Rio de Janeiro") {zona = 'NORTE';
} else if (zona === "Jacaré") {zona = 'NORTE';
} else if (zona === "Jacarezinho") {zona = 'NORTE';
} else if (zona === "Lins de Vasconcelos") {zona = 'NORTE';
} else if (zona === "Manguinhos") {zona = 'NORTE';
} else if (zona === "Maria da Graça") {zona = 'NORTE';
} else if (zona === "Méier") {zona = 'NORTE';
} else if (zona === "Piedade") {zona = 'NORTE';
} else if (zona === "Pilares") {zona = 'NORTE';
} else if (zona === "Riachuelo") {zona = 'NORTE';
} else if (zona === "Rocha") {zona = 'NORTE';
} else if (zona === "Sampaio") {zona = 'NORTE';
} else if (zona === "São Francisco Xavier") {zona = 'NORTE';
} else if (zona === "Todos os Santos") {zona = 'NORTE';
} else if (zona === "Bonsucesso") {zona = 'NORTE';
} else if (zona === "Bancários") {zona = 'NORTE';
} else if (zona === "Cacuia") {zona = 'NORTE';
} else if (zona === "Cidade Universitária") {zona = 'NORTE';
} else if (zona === "Cocotá") {zona = 'NORTE';
} else if (zona === "Freguesia") {zona = 'NORTE';
} else if (zona === "Galeão") {zona = 'NORTE';
} else if (zona === "Jardim Carioca") {zona = 'NORTE';
} else if (zona === "Jardim Guanabara") {zona = 'NORTE';
} else if (zona === "Maré") {zona = 'NORTE';
} else if (zona === "Moneró") {zona = 'NORTE';
} else if (zona === "Olaria") {zona = 'NORTE';
} else if (zona === "Pitangueiras") {zona = 'NORTE';
} else if (zona === "Portuguesa") {zona = 'NORTE';
} else if (zona === "Praia da Bandeira") {zona = 'NORTE';
} else if (zona === "Ramos") {zona = 'NORTE';
} else if (zona === "Ribeira") {zona = 'NORTE';
} else if (zona === "Tauá") {zona = 'NORTE';
} else if (zona === "Zumbi") {zona = 'NORTE';
} else if (zona === "Acari") {zona = 'NORTE';
} else if (zona === "Anchieta") {zona = 'NORTE';
} else if (zona === "Barros Filho") {zona = 'NORTE';
} else if (zona === "Bento Ribeiro") {zona = 'NORTE';
} else if (zona === "Brás de Pina") {zona = 'NORTE';
} else if (zona === "Campinho") {zona = 'NORTE';
} else if (zona === "Cavalcanti") {zona = 'NORTE';
} else if (zona === "Cavalcante") {zona = 'NORTE';
} else if (zona === "Cascadura") {zona = 'NORTE';
} else if (zona === "Coelho Neto") {zona = 'NORTE';
} else if (zona === "Colégio") {zona = 'NORTE';
} else if (zona === "Complexo do Alemão") {zona = 'NORTE';
} else if (zona === "Cordovil") {zona = 'NORTE';
} else if (zona === "Costa Barros") {zona = 'NORTE';
} else if (zona === "Engenheiro Leal") {zona = 'NORTE';
} else if (zona === "Engenho da Rainha") {zona = 'NORTE';
} else if (zona === "Guadalupe") {zona = 'NORTE';
} else if (zona === "Galeao") {zona = 'NORTE';
} else if (zona === "Galeão") {zona = 'NORTE';
} else if (zona === "Honório Gurgel") {zona = 'NORTE';
} else if (zona === "Inhaúma") {zona = 'NORTE';
} else if (zona === "Inhauma") {zona = 'NORTE';
} else if (zona === "Irajá") {zona = 'NORTE';
} else if (zona === "Jardim América") {zona = 'NORTE';
} else if (zona === "Madureira") {zona = 'NORTE';
} else if (zona === "Marechal Hermes") {zona = 'NORTE';
} else if (zona === "Mal. Hermes") {zona = 'NORTE';
} else if (zona === "Oswaldo Cruz") {zona = 'NORTE';
} else if (zona === "Parada de Lucas") {zona = 'NORTE';
} else if (zona === "Parque Anchieta") {zona = 'NORTE';
} else if (zona === "Parque Colúmbia") {zona = 'NORTE';
} else if (zona === "Parque Columbia") {zona = 'NORTE';
} else if (zona === "Pavuna") {zona = 'NORTE';
} else if (zona === "Penha") {zona = 'NORTE';
} else if (zona === "Penha Circular") {zona = 'NORTE';
} else if (zona === "Quintino Bocaiúva") {zona = 'NORTE';
} else if (zona === "Quintino Bocaiuva") {zona = 'NORTE';
} else if (zona === "Ricardo de Albuquerque") {zona = 'NORTE';
} else if (zona === "Rocha Miranda") {zona = 'NORTE';
} else if (zona === "Tomás Coelho") {zona = 'NORTE';
} else if (zona === "Tomas Coelho") {zona = 'NORTE';
} else if (zona === "Turiaçu") {zona = 'NORTE';
} else if (zona === "Turiacu") {zona = 'NORTE';
} else if (zona === "Vaz Lobo") {zona = 'NORTE';
} else if (zona === "Váz Lobo") {zona = 'NORTE';
} else if (zona === "Vicente de Carvalho") {zona = 'NORTE';
} else if (zona === "Vigario Geral") {zona = 'NORTE';
} else if (zona === "Vigário Geral") {zona = 'NORTE';
} else if (zona === "Vila da Penha") {zona = 'NORTE';
} else if (zona === "Vila Kosmos") {zona = 'NORTE';
} else if (zona === "Vista Alegre") {zona = 'NORTE';
} else if (zona === "São Conrado") {zona = 'SUL';
} else if (zona === "Sao Conrado") {zona = 'SUL';
} else if (zona === "Lagoa") {zona = 'SUL';
} else if (zona === "Botafogo") {zona = 'SUL';
} else if (zona === "Catete") {zona = 'SUL';
} else if (zona === "Copacabana") {zona = 'SUL';
} else if (zona.includes("Arpoador")) {zona = 'SUL';
} else if (zona === "Cosme Velho") {zona = 'SUL';
} else if (zona === "Flamengo") {zona = 'SUL';
} else if (zona === "Gávea") {zona = 'SUL';
} else if (zona === "Gavea") {zona = 'SUL';
} else if (zona === "Glória") {zona = 'SUL';
} else if (zona === "Gloria") {zona = 'SUL';
} else if (zona === "Humaitá") {zona = 'SUL';
} else if (zona === "Humaita") {zona = 'SUL';
} else if (zona === "Ipanema") {zona = 'SUL';
} else if (zona === "Jardim Botânico") {zona = 'SUL';
} else if (zona === "Jardim Botanico") {zona = 'SUL';
} else if (zona === "Laranjeiras") {zona = 'SUL';
} else if (zona === "Leblon") {zona = 'SUL';
} else if (zona === "Leme") {zona = 'SUL';
} else if (zona.includes("Rocinha")) {zona = 'SUL';
} else if (zona === "Urca") {zona = 'SUL';
} else if (zona === "Vidigal") {zona = 'SUL';
} else if (zona === "Anil") {zona = 'OESTE';
} else if (zona === "Barra da Tijuca") {zona = 'OESTE';
} else if (zona === "Camorim") {zona = 'OESTE';
} else if (zona === "Cidade de Deus") {zona = 'OESTE';
} else if (zona === "Curicica") {zona = 'OESTE';
} else if (zona === "Freguesia de Jacarepaguá") {zona = 'OESTE';
} else if (zona === "Gardênia Azul") {zona = 'OESTE';
} else if (zona === "Gardenia Azul") {zona = 'OESTE';
} else if (zona === "Grumari") {zona = 'OESTE';
} else if (zona === "Itanhangá") {zona = 'OESTE';
} else if (zona === "Itanhanga") {zona = 'OESTE';
} else if (zona === "Jacarepaguá") {zona = 'OESTE';
} else if (zona === "Jacarepagua") {zona = 'OESTE';
} else if (zona === "Joá") {zona = 'OESTE';
} else if (zona === "Joa") {zona = 'OESTE';
} else if (zona === "Praça Seca") {zona = 'OESTE';
} else if (zona === "Praca Seca") {zona = 'OESTE';
} else if (zona === "Pechincha") {zona = 'OESTE';
} else if (zona === "Recreio dos Bandeirantes") {zona = 'OESTE';
} else if (zona === "Rio das Pedras") {zona = 'OESTE';
} else if (zona === "Tanque") {zona = 'OESTE';
} else if (zona === "Taquara") {zona = 'OESTE';
} else if (zona === "Vargem Grande") {zona = 'OESTE';
} else if (zona === "Vargem Pequena") {zona = 'OESTE';
} else if (zona === "Vila Valqueire") {zona = 'OESTE';
} else if (zona === "Jardim Sulacap") {zona = 'OESTE';
} else if (zona === "Bangu") {zona = 'OESTE';
} else if (zona === "Bangú") {zona = 'OESTE';
} else if (zona === "Campo dos Afonsos") {zona = 'OESTE';
} else if (zona === "Deodoro") {zona = 'OESTE';
} else if (zona === "Gericinó") {zona = 'OESTE';
} else if (zona === "Magalhães Bastos") {zona = 'OESTE';
} else if (zona === "Padre Miguel") {zona = 'OESTE';
} else if (zona === "Realengo") {zona = 'OESTE';
} else if (zona === "Santíssimo") {zona = 'OESTE';
} else if (zona === "Senador Camará") {zona = 'OESTE';
} else if (zona === "Vila Kennedy") {zona = 'OESTE';
} else if (zona === "Vila Militar") {zona = 'OESTE';
} else if (zona === "Barra de Guaratiba") {zona = 'OESTE';
} else if (zona === "Campo Grande") {zona = 'OESTE';
} else if (zona === "Cosmos") {zona = 'OESTE';
} else if (zona === "Guaratiba") {zona = 'OESTE';
} else if (zona === "Inhoaíba") {zona = 'OESTE';
} else if (zona === "Paciência") {zona = 'OESTE';
} else if (zona === "Paciencia") {zona = 'OESTE';
} else if (zona === "Pedra de Guaratiba") {zona = 'OESTE';
} else if (zona === "Santa Cruz") {zona = 'OESTE';
} else if (zona === "Senador Vasconcelos") {zona = 'OESTE';
} else if (zona === "Sepetiba") {zona = 'OESTE';
    } else {zona = 'N/D';}
  
    return zona
    
  }


function App() {


    const moment = require('moment');
  
    const [eventosAbertos, setEventosAbertos] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [chartDataPop, setChartDataPop] = useState([]);
    const [primario, setPrimario] = useState([]);
    const [secundario, setSecundario] = useState([]);
    const [countdown, setCountdown] = useState(300000)
    const [filtroaplicado, setFiltroAplicado] = useState([]);
    const [search, setSearch] = useState("TODOS");
    const [showcameras, setShowCameras] = useState("Não");
    const [estagio, setEstagio] = useState("Branco");
    const [tempoestagio, setTempoEstagio] = useState(" ");
    const [corestagio, setCorEstagio] = useState("#ffffff");
    const [mensagemestagio, setMensagemEstagio] = useState("");
    const [mensagem2estagio, setMensagem2Estagio] = useState("");
    
  
    const [status, setStatus] = useState({
      loading: false
    });
  
      function ObterCorLinha(prioridade) {
          if (prioridade === 'BAIXO' || prioridade === null) {
              return 'table-success';
          }
          if (prioridade === 'MEDIO') {
              return 'table-warning';
          }
  
          if (prioridade === 'ALTA') {
              return 'table-danger';
          }
      }
  
      function ObterCamera(props) {
        //if (props.includes('CAM ')) {return props;}
  
        const titulo = props.normalize('NFD').replace(/[\])}[{(]/g, '').toLowerCase();
        const dataPtBr = titulo.split(' ')
        const lista = dataPtBr.length
        // let id = food.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '').replace(/\./g, '').replace(/[\])}[{(]/g, '').toLowerCase() + '&&' + food; 
        
        
          if (dataPtBr.length >= (dataPtBr.length-1)) {
            const lista = dataPtBr.length-1
            const cam = parseInt(dataPtBr[lista])
            if(typeof(cam)){
              return cam
             }else{
              return '150'
             }
          }
      }
      
    function icone(props) {
  
      if (props === '') {return open;}
      if (props.includes('Operação policial')) {return operacaopolicial;}
      if (props === 'Afundamento de Pista / Buraco na via') {return buraconavia;}
      if (props.includes('Atropelamento')) {return acidenteleve;}
      if (props.includes('Obra em local público')) {return obrasnavia;}
      if (props.includes('Evento')) {return evento;}
      if (props.includes('Asfalto')) {return asfaltoliso;}
      if (props.includes('Acidente/enguiço sem vítima')) {return acidenteleve;}
      if (props === "Acidente com vítima(s)") {return acidenteleve;}
      if (props.includes('Manifestação em local público')) {return manifestacao;}
      if (props.includes('Deslizamento')) {return deslizamento;}
      if (props.includes('Incêndio no entorno de vias públicas')) {  return incendio;}
      if (props.includes('Incêndio em imóvel')) {return incendio;}
      if (props.includes('Incêndio em veículo(s)')) {return incendio;}
      if (props ==='Sinais de trânsito com mau funcionamento') {return falhanosemaforo;}
      if (props ==='Vazamento de água / esgoto') { return vazamentodeagua;}
      if (props ==='Galho sobre fiação') {return open;}
      if (props ==='Bueiro') {return bueiro;}
      if (props ==='Queda de árvore') {return quedadearvore;}
  
      
  
      
      
  
      return open;
    }
  
    
  
  
  
    const filtroPrimario = (data) => {
  
      const filteres = data.filter((valorAtual) => {
        return valorAtual.tipo.includes("PRIMARIO")
            })
        return filteres
     }
  
     const filtroSecundario = (data) => {
  
      const filteres = data.filter((valorAtual) => {
        return valorAtual.tipo.includes("SECUNDARIO")
            })
        return filteres
     }
  
    const loadData = (data) => {
        const values = _.groupBy(data, (value) => zonas(value.bairro));
        const result = _.map(values, (value, key) => [
            key,
            values[key].length
        ]);
        return [["Ocorrência", "Abertas"], ...result];
    }
  
  
  
    const loadDataPop = (data) => {
        const values = _.groupBy(data, (value) => pops(value.pop_id));
        const result = _.map(values, (value, key) => [
            key,
            values[key].length
        ]);
        return [["Ocorrência", "Abertas"], ...result];
    }
    
    
    
    const getAlertas = async () => {
      console.count("Reiniciou getAlertas   " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
      await axios({
          method: 'get',
          baseURL: 'http://aplicativo.cocr.com.br/estagio_api'
                          
        }).then(estagioatual => {
          
    try {
      setTempoEstagio(moment(estagioatual.data.inicio).format('DD/MM/YYYY HH:mm') + " " + "(" + moment(estagioatual.data.inicio).startOf('hour').fromNow() + "" + ")");
      setEstagio(estagioatual.data.estagio);
      setCorEstagio(estagioatual.data.cor);
      setMensagemEstagio(estagioatual.data.mensagem);
      setMensagem2Estagio(estagioatual.data.mensagem2);
    
  } catch (error) {
    console.log(error)
    setTempoEstagio("Não conseguimos o acesso a api que retorna informações do Estágio Atual da Cidade");
    setEstagio("Branco");
    setCorEstagio("#ffffff")
    setMensagemEstagio("");
    setMensagem2Estagio("");
  
  }
  
  
            
  
      }).catch(err => {
        console.log(err)
        setTempoEstagio("Não conseguimos o acesso a api que retorna informações do Estágio Atual da Cidade");
        setCorEstagio("#ffffff")
        setMensagemEstagio("");
    setMensagem2Estagio("");
      });
  }
  useEffect(() => {getAlertas();}, [])
  
    const getEventosAbertos = async () => {
      console.count("Reiniciou getEventosAbertos   " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
      await axios({
          method: 'get',
          baseURL: 'https://api.dados.rio/v2/adm_cor_comando/ocorrencias_abertas'
          
  //        https://api.dados.rio/v2/adm_cor_comando/ocorrencias_abertas/
                          
      }).then(evento => {
  
          try {
            setEventosAbertos(evento.data.eventos);
            setChartData(loadData(evento.data.eventos));
            setChartDataPop(loadDataPop(evento.data.eventos));
            setFiltroAplicado(evento.data.eventos);
            setPrimario(filtroPrimario(evento.data.eventos));
            setSecundario(filtroSecundario(evento.data.eventos));
            setSearch(favorito.tipo);
  
            if (evento.status > 200) {
              setCountdown(10001)
              console.count("status: " + evento.status + "Contador em 10001   " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
            } else {setCountdown(300000)
              console.count("status: " + evento.status + " Contador em 300000   " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
            }
  
  
          } catch (error) {
  
              setCountdown(10001)
              console.count("Contador em 10001 Erro catch   " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
          }
  
        setStatus({
          loading: true
      })
  
  
      }).catch(err => {
        setCountdown(10001)
        console.count("Erro catch then Contador em 10001    " +  moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'));
          setStatus({
            loading: false
        })
      });
  }
  useEffect(() => {getEventosAbertos();}, [])
  
  const getEventosJaFiltrados = async () => {
      
  
    if(search === "TODOS") {
  
        setFiltroAplicado(eventosAbertos);
        setChartData(loadData(eventosAbertos));
        setChartDataPop(loadDataPop(eventosAbertos));
        setFiltroAplicado(eventosAbertos);
    }
  
  
    if(search === "PRIMARIO") {
  
        setChartData(loadData(primario));
        setChartDataPop(loadDataPop(primario));
        setFiltroAplicado(primario);
    }
  
    if(search === "SECUNDARIO") {
  
        setChartData(loadData(secundario));
        setChartDataPop(loadDataPop(secundario));
        setFiltroAplicado(secundario);
    }
   
  }
  useEffect(() => {getEventosJaFiltrados();}, [search, filtroaplicado]);
  
    useEffect(() => {
      const timerId = setInterval(() => {
        setCountdown(prevState => prevState - 1)
        
        getEventosAbertos();
        getAlertas();
        
      }, countdown);
      return () => clearInterval(timerId)
    }, [countdown])



  return (
   <>
   
   {/* d */}
   {/*  Page Wrapper */}
    <div id="wrapper">

        {/*  Sidebar */}
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*  Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            {/*  Divider */}
            <hr className="sidebar-divider my-0" />

            {/*  Nav Item - Dashboard */}
            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            {/*  Divider */}
            <hr className="sidebar-divider" />

            {/*  Heading */}
            <div className="sidebar-heading">
                Interface
            </div>

            {/*  Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>

            {/*  Nav Item - Utilities Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i className="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Utilities:</h6>
                        <a className="collapse-item" href="utilities-color.html">Colors</a>
                        <a className="collapse-item" href="utilities-border.html">Borders</a>
                        <a className="collapse-item" href="utilities-animation.html">Animations</a>
                        <a className="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>

            {/*  Divider */}
            <hr className="sidebar-divider" />

            {/*  Heading */}
            <div className="sidebar-heading">
                Addons
            </div>

            {/*  Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Pages</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Login Screens:</h6>
                        <a className="collapse-item" href="login.html">Login</a>
                        <a className="collapse-item" href="register.html">Register</a>
                        <a className="collapse-item" href="forgot-password.html">Forgot Password</a>
                        <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6>
                        <a className="collapse-item" href="404.html">404 Page</a>
                        <a className="collapse-item" href="blank.html">Blank Page</a>
                    </div>
                </div>
            </li>

            {/*  Nav Item - Charts */}
            <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Charts</span></a>
            </li>

            {/*  Nav Item - Tables */}
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tables</span></a>
            </li>

            {/*  Divider */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/*  Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            {/*  Sidebar Message */}
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                <p className="text-center mb-2"><strong>SB Admin Pro</strong> is packed with premium features, components, and more!</p>
                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div>

        </ul>
        {/*  End of Sidebar */}

        {/*  Content Wrapper */}
        <div id="content-wrapper" className="d-flex flex-column">

            {/*  Main Content */}
            <div id="content">

                {/*  Topbar */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    {/*  Sidebar Toggle (Topbar) */}
                    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                        <i className="fa fa-bars"></i>
                    </button>

                    {/*  Topbar Search */}
                    <form
                        className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <div className="input-group">
                            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..."
                                aria-label="Search" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                    {/*  Topbar Navbar */}
                    <ul className="navbar-nav ml-auto">

                        {/*  Nav Item - Search Dropdown (Visible Only XS) */}
                        <li className="nav-item dropdown no-arrow d-sm-none">
                            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-search fa-fw"></i>
                            </a>
                            {/*  Dropdown - Messages */}
                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                                aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small"
                                            placeholder="Search for..." aria-label="Search"
                                            aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </li>

                        {/*  Nav Item - Alerts */}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bell fa-fw"></i>
                                {/*  Counter - Alerts */}
                                <span className="badge badge-danger badge-counter">3+</span>
                            </a>
                            {/*  Dropdown - Alerts */}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="alertsDropdown">
                                <h6 className="dropdown-header">
                                    Alerts Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-primary">
                                            <i className="fas fa-file-alt text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 12, 2019</div>
                                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-success">
                                            <i className="fas fa-donate text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 7, 2019</div>
                                        $290.29 has been deposited into your account!
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="mr-3">
                                        <div className="icon-circle bg-warning">
                                            <i className="fas fa-exclamation-triangle text-white"></i>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="small text-gray-500">December 2, 2019</div>
                                        Spending Alert: We've noticed unusually high spending for your account.
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                            </div>
                        </li>

                        {/*  Nav Item - Messages */}
                        <li className="nav-item dropdown no-arrow mx-1">
                            <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-envelope fa-fw"></i>
                                {/*  Counter - Messages */}
                                <span className="badge badge-danger badge-counter">7</span>
                            </a>
                            {/*  Dropdown - Messages */}
                            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="messagesDropdown">
                                <h6 className="dropdown-header">
                                    Message Center
                                </h6>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_1.svg"
                                            alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div className="font-weight-bold">
                                        <div className="text-truncate">Hi there! I am wondering if you can help me with a
                                            problem I've been having.</div>
                                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_2.svg"
                                            alt="..." />
                                        <div className="status-indicator"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">I have the photos that you ordered last month, how
                                            would you like them sent to you?</div>
                                        <div className="small text-gray-500">Jae Chun · 1d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="img/undraw_profile_3.svg"
                                            alt="..." />
                                        <div className="status-indicator bg-warning"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Last month's report looks great, I am very happy with
                                            the progress so far, keep up the good work!</div>
                                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                    </div>
                                </a>
                                <a className="dropdown-item d-flex align-items-center" href="#">
                                    <div className="dropdown-list-image mr-3">
                                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                                            alt="..." />
                                        <div className="status-indicator bg-success"></div>
                                    </div>
                                    <div>
                                        <div className="text-truncate">Am I a good boy? The reason I ask is because someone
                                            told me that people say this to all dogs, even if they aren't good...</div>
                                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                    </div>
                                </a>
                                <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                            </div>
                        </li>

                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/*  Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow">
                            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg" />
                            </a>
                            {/*  Dropdown - User Information */}
                            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Settings
                                </a>
                                <a className="dropdown-item" href="#">
                                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Activity Log
                                </a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                {/*  End of Topbar */}

                {/*  Begin Page Content */}
                <div className="container-fluid">

                    {/*  Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                    </div>

                    {/*  Content Row */}
                    <div className="row">

                        {/*  Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-danger shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="h5 text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                ABERTAS: {eventosAbertos.length}</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{primario.length} Primárias e {secundario.length} Secundárias</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="h5 text-xs font-weight-bold text-success text-uppercase mb-1">
                                                FECHADAS HOJE</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">{primario.length} Primárias e {secundario.length} Secundárias</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Earnings (Monthly) Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                                <div className="col-auto">
                                                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                </div>
                                                <div className="col">
                                                    <div className="progress progress-sm mr-2">
                                                        <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Pending Requests Card Example */}
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Pending Requests</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-comments fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Content Row */}

                    <div className="row">

                        {/*  Area Chart */}
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/*  Card Header - Dropdown */}
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                                    <div className="dropdown no-arrow">
                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div className="dropdown-header">Dropdown Header:</div>
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                {/*  Card Body */}
                                <div className="card-body">
                                    <div className="chart-area">
                                        <canvas id="myAreaChart"></canvas>
                                        <Chart
                  chartType="Bar"
                  width="100%"
                  height="400px"
                  data={chartData}
                  options={options}

                />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*  Pie Chart */}
                        <div className="col-xl-4 col-lg-5">
                            <div className="card shadow mb-4">
                                {/*  Card Header - Dropdown */}
                                <div
                                    className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                                    <div className="dropdown no-arrow">
                                        <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                            aria-labelledby="dropdownMenuLink">
                                            <div className="dropdown-header">Dropdown Header:</div>
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                                {/*  Card Body */}
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                        <canvas id="myPieChart"></canvas>
                                    </div>
                                    <div className="mt-4 text-center small">
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-primary"></i> Direct
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-success"></i> Social
                                        </span>
                                        <span className="mr-2">
                                            <i className="fas fa-circle text-info"></i> Referral
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Content Row */}
                    <div className="row">

                        {/*  Content Column */}
                        <div className="col-lg-6 mb-4">

                            {/*  Project Card Example */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                                </div>
                                <div className="card-body">
                                    <h4 className="small font-weight-bold">Server Migration <span
                                            className="float-right">20%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}}
                                            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Sales Tracking <span
                                            className="float-right">40%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{width: "40%"}}
                                            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Customer Database <span
                                            className="float-right">60%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar" role="progressbar" style={{width: "60%"}}
                                            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Payout Details <span
                                            className="float-right">80%</span></h4>
                                    <div className="progress mb-4">
                                        <div className="progress-bar bg-info" role="progressbar" style={{width: "80%"}}
                                            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 className="small font-weight-bold">Account Setup <span
                                            className="float-right">Complete!</span></h4>
                                    <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: "100%"}}
                                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>

                            {/*  Color System */}
                            <div className="row">
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-primary text-white shadow">
                                        <div className="card-body">
                                            Primary
                                            <div className="text-white-50 small">#4e73df</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-success text-white shadow">
                                        <div className="card-body">
                                            Success
                                            <div className="text-white-50 small">#1cc88a</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-info text-white shadow">
                                        <div className="card-body">
                                            Info
                                            <div className="text-white-50 small">#36b9cc</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-warning text-white shadow">
                                        <div className="card-body">
                                            Warning
                                            <div className="text-white-50 small">#f6c23e</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-danger text-white shadow">
                                        <div className="card-body">
                                            Danger
                                            <div className="text-white-50 small">#e74a3b</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-secondary text-white shadow">
                                        <div className="card-body">
                                            Secondary
                                            <div className="text-white-50 small">#858796</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-light text-black shadow">
                                        <div className="card-body">
                                            Light
                                            <div className="text-black-50 small">#f8f9fc</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="card bg-dark text-white shadow">
                                        <div className="card-body">
                                            Dark
                                            <div className="text-white-50 small">#5a5c69</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-lg-6 mb-4">

                            {/*  Illustrations */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                                </div>
                                <div className="card-body">
                                    <div className="text-center">
                                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem;"}}
                                            src="http://187.111.99.18:9004/?CODE=591" alt="..." />
                                    </div>
                                    <p>Add some quality, svg illustrations to your project courtesy of <a
                                            target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a
                                        constantly updated collection of beautiful svg images that you can use
                                        completely free and without attribution!</p>
                                    <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                                        unDraw &rarr;</a>
                                </div>
                            </div>

                            {/*  Approach */}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                                </div>
                                <div className="card-body">
                                    <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                                        CSS bloat and poor page performance. Custom CSS classes are used to create
                                        custom components and custom utility classes.</p>
                                    <p className="mb-0">Before working with this theme, you should become familiar with the
                                        Bootstrap framework, especially the utility classes.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {/*  /.container-fluid */}

            </div>
            {/*  End of Main Content */}

            {/*  Footer */}
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        <span>Copyright &copy; Your Website 2021</span>
                    </div>
                </div>
            </footer>
            {/*  End of Footer */}

        </div>
        {/*  End of Content Wrapper */}

    </div>
    {/*  End of Page Wrapper */}

    {/*  Scroll to Top Button*/}
    <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
    </a>

    {/*  Logout Modal*/}
    <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                    <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                    <a className="btn btn-primary" href="login.html">Logout</a>
                </div>
            </div>
        </div>
    </div>

   </>
  );
}

export default App;
