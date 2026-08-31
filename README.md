# Lua de mel · Florianópolis e Foz do Iguaçu

Roteiro interativo de 31 de agosto a 7 de setembro de 2026: mapa dia a dia,
agenda hora a hora, reservas, custos e avisos.

**Site publicado:** https://luiserh.github.io/Viagem/

## Como funciona

A página tem quatro seções, navegáveis por abas (e por link direto, via
`#mapa`, `#reservas`, `#custos`, `#avisos`):

- **Roteiro e mapa** — escolha um dia na trilha superior. O mapa enquadra
  sozinho os pontos daquele dia, numera a ordem do percurso e apaga o resto.
  Clicar num horário da agenda destaca o ponto no mapa, e clicar num ponto do
  mapa destaca o horário. Tudo navegável pelo teclado.
- **Reservas** — o que já está pago, o que falta reservar e como circular sem
  dirigir.
- **Custos** — estimativa item a item, divisão por categoria e onde comprar os
  ingressos.
- **Avisos** — riscos do roteiro e um checklist do que fazer antes de viajar.

## Rodando localmente

O site é estático, mas usa módulos ES, que o navegador não carrega pelo
protocolo `file://`. Sirva a pasta por HTTP:

```sh
python3 -m http.server 8000
# abra http://localhost:8000
```

Não há build, dependências instaladas nem passo de compilação.

## Estrutura

```
index.html                    Conteúdo estático das quatro seções
assets/
  favicon.svg
  css/
    tokens.css                Cores, tipografia e medidas
    base.css                  Reset, tipografia e utilitários
    layout.css                Hero, faixa de fatos, abas, painéis, rodapé
    components/               Um arquivo por componente
  js/
    main.js                   Liga trilha de dias, agenda e mapa
    data/
      places.js               Pontos do roteiro, com coordenadas reais
      itinerary.js            Os oito dias, com horários e custos
    lib/
      dates.js                Formatação de datas em pt-BR
      dom.js                  Escape de HTML e helpers de evento
    ui/
      day-rail.js             Trilha de dias
      schedule.js             Cartão de agenda do dia
      trip-map.js             Mapa Leaflet e marcadores
      tabs.js                 Abas das seções
      icons.js                Ícones de linha
```

Conteúdo e apresentação são separados de propósito: mudar um horário, um preço
ou um dia inteiro é editar `assets/js/data/itinerary.js`, sem tocar em nenhum
módulo de interface.

## Dependências externas

- [Leaflet 1.9.4](https://leafletjs.com/) via CDN, para o mapa. Se o script não
  carregar, a página mostra um aviso no lugar do mapa e todo o resto continua
  funcionando.
- Tiles do OpenStreetMap servidos pela CARTO.
- Fontes Fraunces, Archivo e JetBrains Mono, do Google Fonts, com fallbacks do
  sistema.
- Fotos do Wikimedia Commons, sob licenças Creative Commons.

## Publicação

Todo push para o branch padrão dispara o workflow
`.github/workflows/deploy.yml`, que publica a pasta inteira no GitHub Pages.
Para o site ficar no ar são necessários dois ajustes, uma única vez, em
*Settings*:

1. **Settings → General → Danger Zone → Change visibility**: deixar o
   repositório público (no plano gratuito, Pages só serve repositório público).
2. **Settings → Pages → Build and deployment → Source**: escolher
   **GitHub Actions**.

## Avisos sobre os dados

Voos, pousada em Canasvieiras e ônibus já estão pagos. Ingressos, transporte
local e hospedagem em Foz são estimativas de 2026 e precisam ser confirmados
antes de fechar.
