# Construtor de Currículo 📝

Aplicativo de console para montar currículos personalizados usando padrões de design.

## Padrões Utilizados

### 1. Builder 🧱

**Classe**: ResumeBuilder  
**Motivo**: Permitir construção passo a passo do currículo com interface fluente, facilitando a criação de objetos complexos  
**Implementação**: `ResumeBuilder` permite construção fluente do objeto `Resume`

### 2. Strategy ♟️

**Interface**: FormatStrategy  
**Implementações**: TextFormatStrategy, JsonFormatStrategy  
**Motivo**: Permitir diferentes algoritmos de formatação serem intercambiáveis em tempo de execução  
**Implementação**: `FormatStrategy` interface com implementações específicas

### 3. Factory Method 🏭

**Classe**: FormatStrategyFactory  
**Motivo**: Centralizar a criação das estratégias de formatação baseadas no tipo solicitado  
**Implementação**: `FormatStrategyFactory` cria estratégias de formatação

### 4. Singleton 🌐

**Classe**: ConfigManager  
**Motivo**: Garantir uma única instância do gerenciador de configurações (diretório de saída)  
**Implementação**: `ConfigManager` para configurações de diretório de saída

## Como Executar

1. Instalar dependências:

```bash
npm install
```

2. Compilar TypeScript:

```bash
npm run build
```

3. Executar aplicação:

```bash
npm start
```

## Funcionalidades

- Interface interativa para entrada de dados
- Construção fluente do currículo usando Builder
- Salvamento automático em formato TXT e JSON
- Saída do programa digitando "sair"
- Validação de dados obrigatórios

## Estrutura do Projeto

```
src/
├── models/          # Modelos de dados
├── builders/        # Padrão Builder
├── strategies/      # Padrão Strategy
├── factories/       # Padrão Factory Method
├── singletons/      # Padrão Singleton
├── services/        # Serviços de negócio
└── index.ts         # Aplicação principal
```
