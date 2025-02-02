import fs from 'fs';
import path from 'path';

describe('Project Configuration Files', () => {
  const rootDir = path.resolve(__dirname, '../../../../');

  describe('.editorconfig', () => {
    const editorConfigPath = path.join(rootDir, '.editorconfig');
    const editorConfig = fs.readFileSync(editorConfigPath, 'utf8');

    it('should exist and have required settings', () => {
      expect(fs.existsSync(editorConfigPath)).toBe(true);
      expect(editorConfig).toContain('root = true');
      expect(editorConfig).toContain('end_of_line = lf');
      expect(editorConfig).toContain('indent_style = space');
      expect(editorConfig).toContain('indent_size = 2');
    });

    it('should have TypeScript/JavaScript specific settings', () => {
      expect(editorConfig).toContain('[*.{ts,js}]');
      expect(editorConfig).toContain('quote_type = single');
    });
  });

  describe('VS Code settings', () => {
    const vscodePath = path.join(rootDir, '.vscode/settings.json');
    const vscodeSettings = JSON.parse(fs.readFileSync(vscodePath, 'utf8'));

    it('should have required editor settings', () => {
      expect(vscodeSettings['editor.formatOnSave']).toBe(true);
      expect(vscodeSettings['editor.defaultFormatter']).toBe('esbenp.prettier-vscode');
      expect(vscodeSettings['files.eol']).toBe('\n');
    });

    it('should have TypeScript settings', () => {
      expect(vscodeSettings['typescript.tsdk']).toBe('node_modules/typescript/lib');
      expect(vscodeSettings['typescript.preferences.importModuleSpecifier']).toBe('non-relative');
    });
  });
});
