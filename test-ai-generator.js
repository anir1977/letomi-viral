/**
 * Test script pour vérifier la génération AI
 */

// Simuler la fonction de génération AI
async function testAIGeneration() {
  console.log('🧪 Testing AI Generation Function...\n');

  const testInput = {
    topic: 'The Future of Technology',
    keywords: ['AI', 'machine learning', 'innovation'],
    category: 'Technology',
    mode: 'viral',
    tone: 'casual',
    length: 'medium'
  };

  console.log('📝 Test Input:', testInput);

  // Import et test de la fonction
  try {
    // Simuler l'import dynamique
    const { generateAIArticle } = await import('./lib/ai-generator.ts');
    
    console.log('\n🚀 Calling generateAIArticle...');
    const article = await generateAIArticle(testInput);
    
    console.log('\n✅ Success! Article generated:');
    console.log('Title:', article.title);
    console.log('Slug:', article.slug);
    console.log('Content Length:', article.content.length, 'characters');
    console.log('Keywords:', article.keywords);
    console.log('Tags:', article.tags);
    console.log('SEO Title:', article.seoTitle);
    console.log('FAQ Items:', article.faqSection.length);
    
    return article;
  } catch (error) {
    console.error('\n❌ Error during generation:', error);
    throw error;
  }
}

// Exécuter le test
testAIGeneration()
  .then(() => {
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
