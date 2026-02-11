import { getAllPosts } from './posts';

interface InlineLinkSuggestion {
  keyword: string;
  slug: string;
  title: string;
}

/**
 * Generate contextual inline link suggestions based on post content
 * Returns keywords found in content that match other article titles/excerpts
 */
export function generateInlineLinkSuggestions(
  currentContent: string,
  currentSlug: string,
  category: string
): InlineLinkSuggestion[] {
  const posts = getAllPosts();
  const suggestions: InlineLinkSuggestion[] = [];
  
  // Filter posts from same or related categories
  const relatedPosts = posts.filter(
    post => post.slug !== currentSlug && 
    (post.category === category || isRelatedCategory(post.category, category))
  );

  // Extract key phrases from related posts
  relatedPosts.forEach(post => {
    // Check for title mentions
    const titleWords = post.title.toLowerCase();
    if (currentContent.toLowerCase().includes(titleWords.substring(0, 30))) {
      suggestions.push({
        keyword: post.title,
        slug: post.slug,
        title: post.title
      });
    }
    
    // Check for key topic words (simplified)
    const keyTopics = extractKeyTopics(post);
    keyTopics.forEach(topic => {
      const regex = new RegExp(`\\b${topic}\\b`, 'gi');
      if (regex.test(currentContent)) {
        suggestions.push({
          keyword: topic,
          slug: post.slug,
          title: post.title
        });
      }
    });
  });

  // Return unique suggestions, max 3
  const unique = suggestions
    .filter((item, index, self) => 
      index === self.findIndex(t => t.slug === item.slug)
    )
    .slice(0, 3);
    
  return unique;
}

function isRelatedCategory(cat1: string, cat2: string): boolean {
  const related: { [key: string]: string[] } = {
    'psychology': ['human-behavior', 'science'],
    'science': ['psychology', 'life-facts'],
    'human-behavior': ['psychology', 'life-facts'],
    'life-facts': ['human-behavior', 'science'],
    'technology': ['science', 'space', 'life-facts'],
    'space': ['science', 'technology'],
    'history': ['science', 'life-facts'],
    'nature': ['science', 'health'],
    'health': ['science', 'psychology']
  };
  
  return related[cat1]?.includes(cat2) || false;
}

function extractKeyTopics(post: any): string[] {
  const topics: string[] = [];
  
  // Extract from title
  const titleWords = post.title
    .toLowerCase()
    .split(' ')
    .filter((word: string) => word.length > 5); // Only substantial words
    
  topics.push(...titleWords);
  
  // Extract from excerpt
  const excerptWords = post.excerpt
    .toLowerCase()
    .split(' ')
    .filter((word: string) => word.length > 6)
    .slice(0, 3);
    
  topics.push(...excerptWords);
  
  return Array.from(new Set(topics)); // Remove duplicates
}

/**
 * Insert markdown links into content for suggested internal links
 */
export function insertInternalLinks(
  content: string,
  suggestions: InlineLinkSuggestion[]
): string {
  let updatedContent = content;
  
  suggestions.forEach(suggestion => {
    // Only replace first occurrence to avoid over-linking
    const regex = new RegExp(`\\b(${suggestion.keyword})\\b`, 'i');
    const match = updatedContent.match(regex);
    
    if (match) {
      const link = `[${match[1]}](/post/${suggestion.slug})`;
      updatedContent = updatedContent.replace(regex, link);
    }
  });
  
  return updatedContent;
}
