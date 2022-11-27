const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});
test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_resposta(0, '2');
  modelo.cadastrar_resposta(1, '4');
  modelo.cadastrar_resposta(2, '6');
  const resposta = modelo.get_respostas(0)
  const resposta1 = modelo.get_respostas(1)
  const resposta2 = modelo.get_respostas(2)
  expect(resposta[0].texto).toBe('2')
  expect(resposta1[0].texto).toBe('4')
  expect(resposta2[0].texto).toBe('6')
});
test('Testando get perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  const pergunta = modelo.get_pergunta(perguntas[0].id_pergunta)
  const pergunta1 = modelo.get_pergunta(perguntas[1].id_pergunta)
  const pergunta2 = modelo.get_pergunta(perguntas[2].id_pergunta)
  expect(pergunta.texto).toBe('1 + 1 = ?')
  expect(pergunta1.texto).toBe('2 + 2 = ?')
  expect(pergunta2.texto).toBe('3 + 3 = ?')
})