const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Erro ao executar o comando: ${command}`);
    process.exit(1);
  }
}

function createDomainStructure(domainName) {
  if (!domainName) {
    console.error('Por favor, forneça o nome do domínio.');
    process.exit(1);
  }

  // Define o caminho correto para "src/app/domain/<domainName>"
  const baseDomainPath = path.join('domain');
  const domainPath = path.join(baseDomainPath, domainName);

  console.log(`Criando estrutura de domínio para "${domainName}"`);

  try {
    // Gera o módulo principal do domínio com o Angular CLI
    runCommand(`ng generate module ${domainPath} --routing`);

    // Caminhos para as pastas adicionais
    const componentsPath = path.join('src', 'app', domainPath, 'components');
    const servicesPath = path.join('src', 'app', domainPath, 'services');
    const pagesPath = path.join('src', 'app', domainPath, 'pages');

    const servicePathNameForms = path.join(domainPath, 'services', `${domainName}-forms`);

    // Cria as pastas usando mkdirSync (evita dependência de shell)
    [componentsPath, servicesPath, pagesPath].forEach((folder) => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`\x1b[32mCREATE\x1b[0m ${folder}`);
        fs.writeFileSync(`${folder}/.gitkeep`, '', { encoding: 'utf8' });
      } else {
        console.warn(`Diretório já existe: ${folder}`);
      }
    });

    runCommand(`ng generate service ${servicePathNameForms}`);


    console.log('Estrutura de domínio criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar a estrutura de domínio:', error);
    process.exit(1);
  }
}

// Argumento do comando
const domainName = process.argv[2];
createDomainStructure(domainName);
