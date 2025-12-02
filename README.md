# Cookup Mobile  Instruções de execução

Este projeto é um app React Native criado com Expo. As instruções abaixo estão adaptadas para Windows (PowerShell).

**Pré-requisitos**
- Node.js (recomenda-se LTS atual)
- npm (vem com Node) ou yarn
- Expo CLI (opcional): `npm install -g expo-cli` ou usar `npx expo` diretamente
- (Para Android) Android Studio + AVD configurado ou um dispositivo Android com modo desenvolvedor ativado

**Instalação**
No PowerShell, dentro da pasta do projeto:

```powershell
cd 'C:\Users\gbize\OneDrive\Documentos\Development\cookup-mobile'
npm install
```

**Rodando em desenvolvimento (Expo / Metro)**

```powershell
# Inicia o servidor Metro / Expo
npm start

# Limpar cache (se encontrar problemas)
npx expo start -c

# Iniciar e abrir no emulador Android (se AVD estiver executando)
npm run android

# Rodar na web
npm run web

# Usar tunnel (útil para testar em dispositivo físico quando não estiver na mesma rede)
npx expo start --tunnel
```

**Observações sobre URLs do backend e 'localhost'**
- No código há chamadas para `http://localhost:3000`. Em muitos casos, o emulador ou dispositivo não interpreta `localhost` como a máquina host.
- Use um destes padrões dependendo do caso:
  - Emulador Android (Android Studio): `http://10.0.2.2:3000`
  - Genymotion: `http://10.0.3.2:3000`
  - Dispositivo físico: use o IP da sua máquina na LAN (ex.: `http://192.168.1.100:3000`) OU rode `npx expo start --tunnel`

**Comandos importantes (resumo rápido)**
- `npm install`  instala dependências
- `npm start` / `npx expo start`  inicia o Metro / Expo Dev Server
- `npx expo start -c`  inicia limpando cache
- `npm run android`  inicia app no emulador Android (se disponível)
- `npm run web`  executa versão web (react-native-web)
- `npx expo start --tunnel`  habilita tunnel para testes remotos
- `adb reverse tcp:19000 tcp:19000` e `adb reverse tcp:19001 tcp:19001`  redireciona portas do dispositivo Android para host (quando necessário)

**Correções seguras aplicadas automaticamente**
- `src/utils/asyncStorage.js`:
  - Corrigido `deleteObjectData` para usar `AsyncStorage.removeItem(key)` em vez de `setItem(key, null)`.
- Estilos com valores CSS (px) convertidos para números em React Native:
  - `src/components/Header.js`: `logo.width` e `logo.height` alterados para números.
  - `src/app/login.js`: `fontSize` e `marginBottom` convertidos para números; removido `fontFamily` fallback incompatível.
  - `src/app/(tabs)/profile.js`: margens do `avatar` convertidas para números; removidos `width`/`height: 'auto'` no background.

Essas mudanças são seguras e alinham o projeto com as convenções do React Native para estilos e armazenamento local.

**Próximos passos recomendados**
- Substituir URLs "hard-coded" por uma constante de configuração (ex.: `src/config.js`) para alternar entre `localhost`, IP de desenvolvimento e produção.
- Adicionar `try/catch` e tratamento de erros nas chamadas `fetch` para evitar crashes inesperados.
- Verificar endpoints de refresh token no backend para garantir que o fluxo de refresh implementado em `src/utils/fetchAuth.js` está correto.

Se quiser, eu aplico:
- a criação de `src/config.js` com `API_BASE_URL` e atualizo chamadas que usam `http://localhost:3000` para usar essa constante;
- mais correções automáticas de estilos semelhantes em outros arquivos.

----
Arquivo atualizado com instruções: `README.md`.
