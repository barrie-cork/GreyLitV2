import * as fs from 'fs';
import * as path from 'path';

const SERVICES_DIR = path.join(__dirname, '../packages/services');
const REQUIRED_CONFIG = {
  extends: '../tsconfig.base.json',
  compilerOptions: {
    outDir: './dist',
    rootDir: './src',
  },
  include: ['src/**/*'],
  exclude: ['**/__tests__/**/*', 'dist'],
  references: [
    { path: '../../shared/types' },
    { path: '../../shared/utils' },
  ],
};

const services = [
  'document-processor',
  'report-generator',
  'result-processor',
  'search-config',
  'search-executor',
  'search-strategy',
  'service-template',
  'web-crawler',
];

function verifyTsConfig() {
  let hasError = false;

  services.forEach(service => {
    const configPath = path.join(SERVICES_DIR, service, 'tsconfig.json');
    
    if (!fs.existsSync(configPath)) {
      console.error(`❌ Missing tsconfig.json for ${service}`);
      hasError = true;
      return;
    }

    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const isValid = validateConfig(config, service);
      
      if (isValid) {
        console.log(`✓ Valid tsconfig.json for ${service}`);
      } else {
        hasError = true;
      }
    } catch (error) {
      console.error(`❌ Error reading/parsing tsconfig.json for ${service}:`, error);
      hasError = true;
    }
  });

  if (hasError) {
    process.exit(1);
  }
}

function validateConfig(config: any, service: string): boolean {
  let isValid = true;

  if (config.extends !== REQUIRED_CONFIG.extends) {
    console.error(`❌ ${service}: Invalid 'extends' value`);
    isValid = false;
  }

  if (!config.compilerOptions?.outDir || !config.compilerOptions?.rootDir) {
    console.error(`❌ ${service}: Missing required compiler options`);
    isValid = false;
  }

  if (!config.include || !Array.isArray(config.include)) {
    console.error(`❌ ${service}: Missing or invalid 'include'`);
    isValid = false;
  }

  if (!config.exclude || !Array.isArray(config.exclude)) {
    console.error(`❌ ${service}: Missing or invalid 'exclude'`);
    isValid = false;
  }

  if (!config.references || !Array.isArray(config.references)) {
    console.error(`❌ ${service}: Missing or invalid 'references'`);
    isValid = false;
  }

  return isValid;
}

verifyTsConfig();
