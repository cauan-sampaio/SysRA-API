///  <reference types= "cypress"/>

describe('Login SysRA pela API', () => {
    it('Logar na conta com sucesso', () => {
      cy.request({
        method: 'POST',
        url:'https://api.sysra-h.maracanau.ifce.edu.br/v1/auth/login',
        body:
        {
  "identificacao": 32742955,
  "senha": "(Eez8_&|5#b5wSZ%"
        }
      }).then((response) => {
        expect(response.status).to.equal(200)
      })
    });
    it('Login na conta sem indetificação', () => {
      cy.request({
        method: 'POST',
        url:'https://api.sysra-h.maracanau.ifce.edu.br/v1/auth/login',
        body:
        {
      "senha": "87489308Ca#"
        },
        failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.equal(401)
      expect(response.body[0]).to.equal("Usuário e/ou senha incorretos")
    })
});
  it('Login na conta sem senha ', () => {
    cy.request({
      method: 'POST',
      url:'https://api.sysra-h.maracanau.ifce.edu.br/v1/auth/login',
      body:
      {
  "identificacao": 20221045050443
      },
      failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(400)
    expect(response.body.erros[0]).to.equal("The Senha field is required.")
  })
});
  it('Login na conta com os dados errados', () => {
    cy.request({
      method: 'POST',
      url:'https://api.sysra-h.maracanau.ifce.edu.br/v1/auth/login',
      body:
      {
  "identificacao": 2022104505044,
  "senha": "87489308Ca"
      },
      failOnStatusCode: false
  }).then((response) => {
  expect(response.status).to.equal(401)
  expect(response.body[0]).to.equal("Usuário e/ou senha incorretos")
})
});
})
