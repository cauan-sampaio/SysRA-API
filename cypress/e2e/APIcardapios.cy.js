/// <reference types="cypress"/>

describe('logar e encontrar um cardápio', () => {
    const data = require('../fixtures/User.json');
    let token;
    let id;
    let idRefeicao;
  
    before(() => {
        cy.token(data.matricula, data.password).then((tkn) => {token = tkn;
    });
});

it('Criar preparação', () => {
    cy.request({
      method: 'POST',
      url: '/restaurante/preparacoes',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        "nome": "maminha290",
        "preparacaoTipoId": 2,
        "modoDePreparo": "porco",
        "lactose": false,
        "gluten": false,
        "itens": [
          {
            "perCapitaBruto": 20,
            "fatorDeCorrecao": 10,
            "medidaCaseira": "kg",
            "custoUnitario": 0,
            "ingredienteId": 15
          }
        ] 
      } 
      }).then((Response)=>{
      return Response.body.id
      }).then((prepid) => {id = prepid})

    })
    it('Consultar preparação criada', () => {
      cy.request({
        method: 'GET',
        url:  `/restaurante/preparacoes/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
     
  
        })
      })
    it('Ativar refeições', () => {
      cy.request({
        method: 'PUT',
        url: '/restaurante/configuracao',
        headers: {
          authorization: `Bearer ${token}`
        },
        body: {
          cafeDaManha: 
            {
              "ativo": true,
              "horarioInicial": "13:45:42.0000000",
              "horarioFinal": "16:45:42.0000000",
              "confirmacaoObrigatoria": true,
              "toleranciaConfirmacao": true,
              "tempoTolerancia": "13:45:42.0000000",
              "valor": 0
            }
          
        }  
      })
    });
  
    it.only('Criar cardápio', () => {
      cy.request({
        method: 'POST',
        url: '/restaurante/cardapios', 
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          data: '2023-10-20',
          cafeDaManha: [
            {
              preparacaoId: id,
              gramas: 10,
            },
          ],
          lancheDaManha: [
            {
              preparacaoId: id,
              gramas: 10
            }
          ],
          almoco: [
            {
              preparacaoId: id,
              gramas: 10,
            },
          ],
          lancheDaTarde: [
            {
              preparacaoId: id,
              gramas: 10,
            },
          ],
          lancheDaNoite: [
            {
              preparacaoId: id,
              gramas: 10,
            },
          ],
          janta: [
            {
              preparacaoId: id,
              gramas: 10,
            },
          ],
        },
       
      }).then((Response) =>{
        return Response.body.id
      }).then((refeicao) => {idRefeicao = refeicao})
    });
  
    it('Consultar cardápio criado', () => {
      cy.request({
        method: 'GET',
        url: `/restaurante/cardapios/${idRefeicao}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
    });
})
/// <reference types="cypress"/>

describe('logar, cardápio sem informações', () => {
  const data = require('../fixtures/User.json');
  let token;
  let id;
  let idRefeicao;        

  before(() => {
      cy.token(data.matricula, data.password).then((tkn) => {token = tkn;
    })
  })
  it('Criar preparação', () => {
    cy.request({
      method: 'POST',
      url: '/restaurante/preparacoes',
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: {
        "nome": 'oi2wdasfew',
        "preparacaoTipoId": '1',
        "modoDePreparo": "porco",
        "lactose": false,
        "gluten": false,
        "itens": [
          {
            "perCapitaBruto": 20,
            "fatorDeCorrecao": 10,
            "medidaCaseira": "kg",
            "custoUnitario": 0,
            "ingredienteId": 15
          }
        ]
      }, 

      }).then((Response) =>{
        return Response.body.id
      }).then((prepid) => {id = prepid})
      })

    it('Consultar preparação criada', () => {
      cy.request({
        method: 'GET',
        url:  `/restaurante/preparacoes/${id}`,
        headers: {
          authorization: `Bearer ${token}`
        },
        })
      })
}) 