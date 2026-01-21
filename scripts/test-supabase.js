#!/usr/bin/env node

/**
 * Supabase Admin Test Script
 * 
 * This script tests the Supabase connection and helps debug authentication issues.
 * Run with: node scripts/test-supabase.js
 */

const fs = require('fs');
const path = require('path');

// Simple .env.local parser
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      process.env[key] = value;
    }
  });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Configuration\n');
console.log('=================================\n');

// Test 1: Check environment variables
console.log('📋 Environment Variables:');
console.log(`   NEXT_PUBLIC_SUPABASE_URL: ${SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`   Value: ${SUPABASE_URL || 'Not set'}\n`);
console.log(`   NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`   Value: ${SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.substring(0, 20) + '...' : 'Not set'}\n`);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase environment variables are missing!');
  console.error('   Please create .env.local with:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL=your-url');
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key\n');
  process.exit(1);
}

// Test 2: Try to create client
console.log('🔌 Testing Supabase Client Creation...');
try {
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('   ✅ Supabase client created successfully\n');

  // Test 3: Test connection
  console.log('🌐 Testing Connection...');
  supabase.auth.getSession()
    .then(({ data, error }) => {
      if (error) {
        console.error('   ❌ Connection error:', error.message);
      } else {
        console.log('   ✅ Connection successful');
        console.log(`   📝 Current session: ${data.session ? 'Active' : 'None'}\n`);
      }

      // Instructions
      console.log('📖 Next Steps:\n');
      console.log('To create an admin user in Supabase:');
      console.log('1. Go to https://app.supabase.com');
      console.log('2. Select your project');
      console.log('3. Go to Authentication → Users');
      console.log('4. Click "Add user"');
      console.log('5. Enter email: yuba1977@gmail.com (or your preferred admin email)');
      console.log('6. Set a strong password');
      console.log('7. Click "Create user"\n');
      console.log('Then you can login at http://localhost:3000/admin/login\n');
    })
    .catch((err) => {
      console.error('   ❌ Unexpected error:', err);
    });

} catch (err) {
  console.error('   ❌ Failed to create client:', err.message);
  console.error('   Make sure @supabase/supabase-js is installed\n');
  process.exit(1);
}
