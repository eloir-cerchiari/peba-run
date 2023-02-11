# PebaRun

## Objetivo

Construir uma plataforma de gameficação para o incentivo de atividades físicas dentro de um circulo de amigos ou colegas de trabalho.

<details>
<summary>To do</summary>

- [x] Login do participante no strava

- [x] Autorizar o uso de dados de atividades na plataforma

- [ ] Receber um Hook com os dados dos usuários

- [ ] Salvar dados basicos da atividade em banco de dados

- [ ] Gerar relatório das atividades

</details>

<sdetails>
	<summary>Manifesto</summary>

- Objetivo

Criar uma ferramenta barata para gamificar o incentivo a prática esportiva.

- Como?

Pegando dados de práticas esportivas dos usuários e equalizando de acordo com as características físicas, costumes e aptidões de cada participante.

- Com quais tecnologias?

• Strava para capturar dados, pois é uma plataforma amplamente difundida e comumente usada por diversos esportes.
• Linguagem de programação Javascript no back e front.
• Framework angular por ser conhecido entre os possíveis envolvidos.
• Armazenamento na aws, pois estou estudando este ecossistema de tecnologias.
• Banco de dados dynamodb pelas mesmas razões da anterior
• Monorepo para simplificar o desenvolvimento
• Servidor lambda na AWS para webservice

- Quais os passos para chegar no objetivo?

- [x] Fazer login dos participantes no Strava via oauth. O que é necessário para capturar as atividades.
- [ ] Capturar atividades do mês atual.
- [ ] Registrar interesse em novas atividades através de um webhook do Strava.
- [ ] Receber notificações webhook
      https://developers.strava.com/docs/webhooks/
      https://developers.strava.com/docs/webhookexample/

- [ ] Buscar atividade com o código recebido pelo webhook

- [ ] Cadastrar dados do usuário, tais como peso, idade, sexo. Estes dados podem ser capturados através do login no Strava.
- [ ] Listar as atividades dos atletas e atribuir pontos para cada uma.
- [ ] Listar ranking dos atletas através da pontuação.
- [ ] Discutir métricas de pontuação.
- [ ] Cadastrar pontuação por período.
- [ ] criar front para listar participantes
- [ ] criar endpoint no ws para listar participantes

</details>
