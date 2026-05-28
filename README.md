# Cookup Mobile

Este projeto é um app React Native de criação e organização de receitas, criado com Expo. As instruções para execução abaixo estão adaptadas para Windows (PowerShell).

**Pré-requisitos**
- Node.js (recomenda-se LTS atual)
- npm (vem com Node) ou yarn
- Expo CLI (opcional): `npm install -g expo-cli` ou usar `npx expo` diretamente
- (Para Android) Android Studio + AVD configurado ou um dispositivo Android com modo desenvolvedor ativado

**Instalação -**
No PowerShell, dentro da pasta do projeto:

```powershell
cd 'C:\working-directory'
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

**Comandos importantes**
- `npm install`  instala dependências
- `npm start` / `npx expo start`  inicia o Metro / Expo Dev Server
- `npx expo start -c`  inicia limpando cache
- `npm run android`  inicia app no emulador Android (se disponível)
- `npm run web`  executa versão web (react-native-web)
- `npx expo start --tunnel`  habilita tunnel para testes remotos
- `adb reverse tcp:19000 tcp:19000` e `adb reverse tcp:19001 tcp:19001`  redireciona portas do dispositivo Android para host (quando necessário)
