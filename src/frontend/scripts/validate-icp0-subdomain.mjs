#!/usr/bin/env node

/**
 * Validates an icp0.io subdomain against the required rules:
 * - Length: 5-50 characters
 * - Characters: only letters (a-z, A-Z), numbers (0-9), and hyphens (-)
 * 
 * Usage: node validate-icp0-subdomain.mjs <subdomain>
 * Example: node validate-icp0-subdomain.mjs Romanticproposal
 */

const MIN_LENGTH = 5;
const MAX_LENGTH = 50;
const ALLOWED_PATTERN = /^[a-zA-Z0-9-]+$/;

function validateSubdomain(subdomain) {
  const errors = [];

  // Check if subdomain is provided
  if (!subdomain || subdomain.trim() === '') {
    return {
      valid: false,
      errors: ['No subdomain provided. Please provide a subdomain to validate.']
    };
  }

  const trimmed = subdomain.trim();

  // Check length
  if (trimmed.length < MIN_LENGTH) {
    errors.push(`Subdomain is too short (${trimmed.length} characters). Minimum length is ${MIN_LENGTH} characters.`);
  }

  if (trimmed.length > MAX_LENGTH) {
    errors.push(`Subdomain is too long (${trimmed.length} characters). Maximum length is ${MAX_LENGTH} characters.`);
  }

  // Check allowed characters
  if (!ALLOWED_PATTERN.test(trimmed)) {
    const invalidChars = trimmed.split('').filter(char => !char.match(/[a-zA-Z0-9-]/));
    const uniqueInvalid = [...new Set(invalidChars)];
    errors.push(`Subdomain contains invalid characters: ${uniqueInvalid.map(c => `'${c}'`).join(', ')}. Only letters, numbers, and hyphens are allowed.`);
  }

  // Check for leading/trailing hyphens (common mistake)
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    errors.push('Subdomain should not start or end with a hyphen.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: No subdomain provided\n');
    console.log('Usage: node validate-icp0-subdomain.mjs <subdomain>\n');
    console.log('Example: node validate-icp0-subdomain.mjs Romanticproposal\n');
    console.log('Validation Rules:');
    console.log(`  • Length: ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    console.log('  • Characters: only letters (a-z, A-Z), numbers (0-9), and hyphens (-)');
    console.log('  • No leading or trailing hyphens\n');
    console.log('Your configured subdomain: Romanticproposal');
    process.exit(1);
  }

  const subdomain = args[0];
  const result = validateSubdomain(subdomain);

  if (result.valid) {
    console.log(`✅ Valid subdomain: "${subdomain}"`);
    console.log(`\n   Your site will be accessible at: https://${subdomain}.icp0.io`);
    console.log('\n✨ Next steps:');
    console.log('   1. Deploy your canister: dfx deploy frontend');
    console.log('   2. Configure the subdomain in your Internet Computer dashboard');
    console.log('   3. Wait for DNS propagation (usually 10-15 minutes)');
    process.exit(0);
  } else {
    console.error(`❌ Invalid subdomain: "${subdomain}"\n`);
    console.error('Validation Errors:');
    result.errors.forEach(error => {
      console.error(`  • ${error}`);
    });
    console.error('\nValidation Rules:');
    console.error(`  • Length: ${MIN_LENGTH}-${MAX_LENGTH} characters`);
    console.error('  • Characters: only letters (a-z, A-Z), numbers (0-9), and hyphens (-)');
    console.error('  • No leading or trailing hyphens');
    console.error('\nExamples of valid subdomains:');
    console.error('  • my-valentine-2026');
    console.error('  • RomanticProposal');
    console.error('  • love4ever');
    process.exit(1);
  }
}

main();
