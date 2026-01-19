const bcrypt = require('bcryptjs');

const password = 'Tomiko@6532';
const hash = bcrypt.hashSync(password, 12);

console.log('\n🔐 PASSWORD HASH GENERADO:\n');
console.log('Password original:', password);
console.log('\nHash para copiar en Supabase:');
console.log('─'.repeat(80));
console.log(hash);
console.log('─'.repeat(80));
console.log('\n✅ Copia el hash de arriba y pégalo en el campo "password" de Supabase\n');
