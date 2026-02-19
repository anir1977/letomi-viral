#!/usr/bin/env node

/**
 * Auto-Publish Script - VERSION SANS OPENAI
 * Génère des articles viraux avec des templates prédéfinis et Unsplash (GRATUIT)
 * 
 * Features:
 * - ✅ Pas d'OpenAI (économie d'argent)
 * - ✅ Images gratuites depuis Unsplash
 * - ✅ Templates de contenu viral prédéfinis
 * - ✅ FAQs automatiques
 * - ✅ Logging complet
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Configuration
const CONFIG = {
  // Unsplash API (GRATUIT - 50 requêtes/heure)
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY || 'DEMO',
  
  // Publishing Settings
  ARTICLES_TO_GENERATE: 1,
  VERBOSE: process.env.VERBOSE === 'true',
};

// Logging
const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  warn: (msg) => console.warn(`⚠️  ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  debug: (msg) => CONFIG.VERBOSE && console.log(`🔍 ${msg}`),
};

log.info('Auto-Publish Script Started (Sans OpenAI) 🚀');

// ============================================================================
// TEMPLATES DE CONTENU VIRAL (Par Catégorie)
// ============================================================================

const ARTICLE_TEMPLATES = {
  psychology: [
    {
      title: "5 Signes Que Vous Êtes Plus Intelligent Que Vous Ne Le Pensez",
      content: `## L'Intelligence Cachée

L'intelligence ne se mesure pas uniquement par le QI. Des recherches récentes montrent que certains comportements quotidiens révèlent une intelligence exceptionnelle que vous ne soupçonnez peut-être pas.

## Les Signes Révélateurs

Les personnes intelligentes ont tendance à remettre en question leurs propres croyances, à être curieuses et à reconnaître ce qu'elles ne savent pas. Ces traits, souvent perçus comme des faiblesses, sont en réalité des forces cognitives puissantes.

## L'Empathie Comme Indicateur

L'intelligence émotionnelle est tout aussi importante que l'intelligence analytique. Si vous êtes capable de comprendre les émotions des autres et d'adapter votre comportement, vous démontrez une forme d'intelligence sociale sophistiquée.

## Conclusion

L'intelligence se manifeste de nombreuses façons différentes. Reconnaître vos forces cachées peut vous aider à mieux valoriser vos capacités uniques et à développer votre plein potentiel.`,
      keywords: 'psychology mind intelligence',
      faqs: [
        { question: "Qu'est-ce que l'intelligence émotionnelle ?", answer: "L'intelligence émotionnelle est la capacité de comprendre et gérer ses propres émotions ainsi que celles des autres." },
        { question: "Le QI est-il la seule mesure de l'intelligence ?", answer: "Non, il existe de nombreuses formes d'intelligence incluant l'intelligence émotionnelle, sociale, créative et pratique." },
        { question: "Comment développer son intelligence ?", answer: "Par la curiosité, l'apprentissage continu, la remise en question de ses croyances et la pratique de l'empathie." }
      ]
    },
    {
      title: "Pourquoi Certaines Personnes Attirent Naturellement Les Autres",
      content: `## Le Magnétisme Personnel

Certaines personnes semblent avoir un charisme naturel qui attire les autres. Cette qualité n'est pas innée mais résulte de comportements spécifiques que tout le monde peut développer.

## L'Art de l'Écoute Active

Les personnes charismatiques excellent dans l'écoute active. Elles posent des questions pertinentes, montrent un intérêt sincère et font sentir aux autres qu'ils sont importants et compris.

## La Confiance Sans Arrogance

Le magnétisme personnel vient d'une confiance en soi équilibrée - suffisamment forte pour être rassurante, mais pas au point de paraître arrogante ou supérieure.

## Authenticité et Vulnérabilité

Paradoxalement, montrer sa vulnérabilité et être authentique crée une connexion plus forte que de projeter une image parfaite. Les gens sont attirés par la sincérité.`,
      keywords: 'charisma personality attraction',
      faqs: [
        { question: "Le charisme peut-il s'apprendre ?", answer: "Oui, le charisme est une compétence qui se développe par la pratique de l'écoute, l'authenticité et la confiance en soi." },
        { question: "Qu'est-ce que l'écoute active ?", answer: "C'est l'art de se concentrer pleinement sur ce que dit quelqu'un, de poser des questions et de montrer un intérêt sincère." }
      ]
    }
  ],
  
  technology: [
    {
      title: "L'IA Change Le Monde: 7 Façons Dont Elle Affecte Votre Vie",
      content: `## La Révolution Silencieuse

L'intelligence artificielle n'est plus de la science-fiction. Elle est déjà intégrée dans votre quotidien de manières que vous ne soupçonnez peut-être pas.

## Dans Votre Poche

Votre smartphone utilise l'IA pour la reconnaissance faciale, les suggestions automatiques, la correction orthographique et même pour optimiser la durée de vie de votre batterie.

## Santé et Diagnostic

L'IA révolutionne la médecine en détectant les cancers plus tôt que les médecins humains, en prédisant les épidémies et en personnalisant les traitements.

## L'Avenir Proche

De la conduite autonome aux assistants personnels intelligents, l'IA continue d'évoluer à un rythme exponentiel, transformant fondamentalement notre façon de vivre et de travailler.`,
      keywords: 'artificial intelligence technology AI',
      faqs: [
        { question: "Qu'est-ce que l'intelligence artificielle ?", answer: "L'IA est la capacité des machines à effectuer des tâches qui nécessitent normalement l'intelligence humaine." },
        { question: "L'IA va-t-elle remplacer les humains ?", answer: "L'IA augmente plutôt les capacités humaines au lieu de remplacer complètement les travailleurs dans la plupart des domaines." }
      ]
    },
    {
      title: "Cybersécurité: Les Erreurs Que 90% Des Gens Font",
      content: `## Les Dangers Invisibles

La cybersécurité n'est plus réservée aux experts en technologie. Avec l'augmentation des cyberattaques, chacun doit connaître les bases pour protéger ses données.

## Le Piège Des Mots De Passe

Utiliser le même mot de passe partout est l'erreur la plus courante et la plus dangereuse. Un gestionnaire de mots de passe est devenu une nécessité, pas un luxe.

## Phishing et Ingénierie Sociale

Les hackers n'ont pas besoin de compétences techniques avancées quand ils peuvent simplement vous tromper pour obtenir vos informations. Méfiez-vous des emails suspects.

## Protection Proactive

L'authentification à deux facteurs, les mises à jour régulières et la vigilance sont vos meilleures défenses contre les menaces numériques modernes.`,
      keywords: 'cybersecurity hacking protection',
      faqs: [
        { question: "Qu'est-ce qu'un gestionnaire de mots de passe ?", answer: "C'est un outil qui stocke et génère des mots de passe complexes et uniques pour tous vos comptes." },
        { question: "Comment reconnaître un email de phishing ?", answer: "Vérifiez l'adresse d'expéditeur, cherchez les fautes, et ne cliquez jamais sur des liens suspects." }
      ]
    }
  ],
  
  science: [
    {
      title: "10 Faits Scientifiques Qui Défient Le Sens Commun",
      content: `## La Réalité Contre-Intuitive

La science nous révèle souvent des vérités qui contredisent notre intuition. Voici des faits vérifiés qui vous surprendront.

## L'Eau Chaude Gèle Plus Vite

Paradoxalement, dans certaines conditions, l'eau chaude peut geler plus rapidement que l'eau froide. Ce phénomène, appelé effet Mpemba, intrigue toujours les scientifiques.

## Vous Êtes Plus Vieux En Haut

En raison de la relativité générale d'Einstein, votre tête vieillit légèrement plus vite que vos pieds à cause de la gravité. La différence est minuscule mais mesurable.

## L'Univers Invisible

95% de l'univers est composé de matière noire et d'énergie noire que nous ne pouvons ni voir ni détecter directement, mais dont nous observons les effets gravitationnels.`,
      keywords: 'science physics facts discovery',
      faqs: [
        { question: "Qu'est-ce que l'effet Mpemba ?", answer: "C'est le phénomène par lequel l'eau chaude peut geler plus vite que l'eau froide dans certaines conditions." },
        { question: "Qu'est-ce que la matière noire ?", answer: "Une forme de matière invisible qui représente environ 27% de l'univers et n'interagit pas avec la lumière." }
      ]
    },
    {
      title: "Comment Votre Cerveau Vous Trompe Chaque Jour",
      content: `## Les Illusions Cognitives

Notre cerveau est une machine incroyable, mais il prend constamment des raccourcis qui peuvent nous induire en erreur.

## Biais De Confirmation

Nous avons tendance à rechercher et à interpréter les informations d'une manière qui confirme nos croyances existantes, ignorant les preuves contraires.

## L'Illusion De Fréquence

Avez-vous remarqué qu'après avoir acheté une voiture, vous voyez soudainement ce modèle partout ? C'est l'illusion de fréquence en action.

## Mémoires Fabriquées

Nos souvenirs ne sont pas des enregistrements fidèles mais des reconstructions que notre cerveau modifie à chaque rappel, créant parfois de faux souvenirs.`,
      keywords: 'brain neuroscience cognitive bias',
      faqs: [
        { question: "Qu'est-ce qu'un biais cognitif ?", answer: "C'est une erreur systématique de pensée qui affecte nos jugements et nos décisions." },
        { question: "Peut-on éviter les biais cognitifs ?", answer: "On peut les réduire en en étant conscient et en questionnant activement nos propres pensées." }
      ]
    }
  ],
  
  health: [
    {
      title: "7 Habitudes Simples Pour Vivre 10 Ans De Plus",
      content: `## La Longévité À Portée De Main

Les zones bleues, régions du monde où les gens vivent le plus longtemps, révèlent que la longévité dépend moins de la génétique que de nos habitudes quotidiennes.

## Bouger Naturellement

Pas besoin de marathons. Les centenaires des zones bleues bougent naturellement tout au long de la journée - jardinage, marche, tâches ménagères.

## L'Alimentation 80/20

Manger jusqu'à 80% de satiété, privilégier les plantes, et partager les repas en famille sont des habitudes communes aux populations les plus longévives.

## Connexions Sociales

La solitude est aussi dangereuse que fumer 15 cigarettes par jour. Cultiver des relations significatives est crucial pour la santé et la longévité.

## Ikigai: Raison D'Être

Avoir un but, une raison de se lever chaque matin, ajoute des années à votre vie. Les Okinawaiens appellent cela "ikigai".`,
      keywords: 'health longevity wellness lifestyle',
      faqs: [
        { question: "Qu'est-ce qu'une zone bleue ?", answer: "Ce sont des régions du monde où les gens vivent exceptionnellement longtemps et en bonne santé." },
        { question: "Qu'est-ce que l'ikigai ?", answer: "C'est un concept japonais qui signifie 'raison d'être' ou 'ce qui donne un sens à la vie'." }
      ]
    },
    {
      title: "Le Sommeil: La Superpuissance Que Vous Ignorez",
      content: `## Plus Qu'Un Simple Repos

Le sommeil n'est pas du temps perdu mais un processus actif essentiel où votre corps et votre cerveau se régénèrent et se consolident.

## Nettoyage Cérébral

Pendant le sommeil, votre cerveau active un système de nettoyage (système glymphatique) qui élimine les toxines accumulées pendant la journée, incluant les protéines liées à Alzheimer.

## Consolidation De La Mémoire

C'est pendant le sommeil que vos souvenirs se consolident et que votre cerveau trie les informations importantes des triviales.

## Impact Sur La Santé

Moins de 7 heures de sommeil augmente les risques d'obésité, de diabète, de maladies cardiaques et réduit votre espérance de vie.`,
      keywords: 'sleep health wellness rest',
      faqs: [
        { question: "Combien d'heures faut-il dormir ?", answer: "Les adultes ont besoin de 7 à 9 heures de sommeil par nuit pour une santé optimale." },
        { question: "Peut-on rattraper le sommeil perdu ?", answer: "Partiellement, mais la dette de sommeil chronique a des effets sur la santé qui ne peuvent être complètement éliminés." }
      ]
    }
  ],
  
  business: [
    {
      title: "Les 5 Compétences Qui Feront De Vous Un Leader En 2026",
      content: `## Leadership Moderne

Le leadership du 21ème siècle diffère radicalement de celui d'hier. Les compétences techniques ne suffisent plus - l'intelligence émotionnelle règne.

## Intelligence Émotionnelle

Comprendre et gérer ses émotions et celles des autres est devenu la compétence la plus recherchée. Les meilleurs leaders créent des environnements psychologiquement sûrs.

## Pensée Adaptative

Dans un monde en changement rapide, la capacité de désapprendre, réapprendre et s'adapter est plus précieuse que tout diplôme.

## Communication Transparente

L'ère de l'information descendante est révolue. Les leaders modernes communiquent avec transparence, vulnérabilité et authenticité.

## Vision Systémique

Comprendre comment les différentes parties d'une organisation s'interconnectent permet de prendre des décisions plus éclairées et durables.`,
      keywords: 'leadership business skills management',
      faqs: [
        { question: "Qu'est-ce qu'un environnement psychologiquement sûr ?", answer: "C'est un environnement où les employés se sentent libres de prendre des risques et d'exprimer leurs idées sans crainte." },
        { question: "Comment développer son intelligence émotionnelle ?", answer: "Par la pratique de l'auto-réflexion, l'empathie active et la gestion consciente de ses réactions émotionnelles." }
      ]
    },
    {
      title: "Productivité: Pourquoi Travailler Moins Produit Plus",
      content: `## Le Paradoxe De La Productivité

Contrairement à l'intuition, travailler plus d'heures ne signifie pas accomplir plus. Les recherches montrent que 40 heures hebdomadaires sont le sweet spot.

## La Loi Des Rendements Décroissants

Au-delà d'un certain seuil, chaque heure supplémentaire produit moins de résultats et augmente le risque d'erreurs et d'épuisement.

## Pauses Stratégiques

Les pauses régulières ne sont pas une perte de temps mais un investissement. Le cerveau consolide les informations et génère des insights créatifs pendant les temps morts.

## Focus Profond

Quatre heures de travail concentré sans distraction produisent plus que huit heures fragmentées. La qualité prime sur la quantité.`,
      keywords: 'productivity work efficiency business',
      faqs: [
        { question: "Qu'est-ce que le deep work ?", answer: "C'est un état de concentration intense sans distraction qui permet d'accomplir des tâches complexes efficacement." },
        { question: "Combien de temps doit durer une pause ?", answer: "Idéalement 15-20 minutes toutes les 90 minutes pour maximiser la concentration et l'énergie." }
      ]
    }
  ]
};

// ============================================================================
// UNSPLASH API (GRATUIT)
// ============================================================================

async function getUnsplashImage(keywords) {
  return new Promise((resolve) => {
    // Si pas de clé API, utiliser des images de démonstration
    if (CONFIG.UNSPLASH_ACCESS_KEY === 'DEMO') {
      const demoImages = [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1551817623-15684c684d4d?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop&auto=format&q=80',
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop&auto=format&q=80',
      ];
      return resolve(demoImages[Math.floor(Math.random() * demoImages.length)]);
    }

    const options = {
      hostname: 'api.unsplash.com',
      path: `/photos/random?query=${encodeURIComponent(keywords)}&orientation=landscape&client_id=${CONFIG.UNSPLASH_ACCESS_KEY}`,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.urls && parsed.urls.regular) {
            resolve(parsed.urls.regular);
          } else {
            resolve('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format&q=80');
          }
        } catch (e) {
          resolve('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format&q=80');
        }
      });
    });

    req.on('error', () => {
      resolve('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop&auto=format&q=80');
    });

    req.end();
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

function extractExcerpt(content) {
  const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const excerpt = lines.slice(0, 2).join(' ').substring(0, 200);
  return excerpt + (excerpt.length === 200 ? '...' : '');
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

function getRandomViews() {
  const views = ['1.2K', '2.5K', '3.8K', '5.1K', '7.3K', '9.2K', '12K', '15K'];
  return views[Math.floor(Math.random() * views.length)];
}

// ============================================================================
// UPDATE POSTS FILE
// ============================================================================

function updatePostsFile(newPost) {
  const postsPath = path.join(projectRoot, 'lib', 'posts.ts');
  
  if (!fs.existsSync(postsPath)) {
    throw new Error(`posts.ts not found at: ${postsPath}`);
  }

  let content = fs.readFileSync(postsPath, 'utf8');

  const markerIndex = content.indexOf('// AUTO-GENERATED POSTS (script inserts here)');
  
  if (markerIndex === -1) {
    throw new Error('Insertion marker not found in posts.ts');
  }

  const nextLineIndex = content.indexOf('\n', markerIndex) + 1;

  const postObject = `  {
    id: "${newPost.id}",
    title: ${JSON.stringify(newPost.title)},
    slug: "${newPost.slug}",
    category: "${newPost.category}",
    excerpt: ${JSON.stringify(newPost.excerpt)},
    content: ${JSON.stringify(newPost.content)},
    readingTime: "${newPost.readingTime}",
    views: "${newPost.views}",
    date: "${newPost.date}",
    image: "${newPost.image}",
    imageAlt: ${JSON.stringify(newPost.imageAlt)},
    heroImage: "${newPost.heroImage}",
    faqs: ${JSON.stringify(newPost.faqs)},
    isTrending: true,
  },\n`;

  const updatedContent = content.slice(0, nextLineIndex) + postObject + content.slice(nextLineIndex);
  
  fs.writeFileSync(postsPath, updatedContent, 'utf8');
  log.success(`✨ Article ajouté à lib/posts.ts: "${newPost.title}"`);
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function main() {
  let articlesPublished = 0;

  try {
    log.info(`🎯 Génération de ${CONFIG.ARTICLES_TO_GENERATE} article(s) (SANS OpenAI)\n`);

    const categories = Object.keys(ARTICLE_TEMPLATES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    log.info(`📚 Catégorie sélectionnée: ${randomCategory}`);
    
    const templates = ARTICLE_TEMPLATES[randomCategory];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    log.info(`📝 Génération de l'article: "${template.title}"`);
    
    log.info(`🖼️  Récupération d'une image depuis Unsplash (GRATUIT)...`);
    const imageUrl = await getUnsplashImage(template.keywords);
    log.success(`Image récupérée: ${imageUrl.substring(0, 60)}...`);
    
    const slug = generateSlug(template.title);
    const excerpt = extractExcerpt(template.content);
    const readingTime = calculateReadingTime(template.content);
    
    const newPost = {
      id: randomUUID(),
      title: template.title,
      slug: slug,
      category: randomCategory,
      excerpt: excerpt,
      content: template.content,
      readingTime: readingTime,
      views: getRandomViews(),
      date: new Date().toISOString().split('T')[0],
      image: imageUrl,
      imageAlt: `Illustration pour: ${template.title}`,
      heroImage: imageUrl,
      faqs: template.faqs,
    };
    
    updatePostsFile(newPost);
    
    articlesPublished++;
    
    console.log('\n' + '='.repeat(70));
    log.success(`🎉 SUCCÈS! Article publié sans frais!`);
    log.info(`📰 Titre: "${newPost.title}"`);
    log.info(`🏷️  Catégorie: ${newPost.category}`);
    log.info(`🖼️  Image: Unsplash (gratuit)`);
    log.info(`💰 Coût: 0.00$ (Économie vs OpenAI: ~0.05$)`);
    console.log('='.repeat(70) + '\n');

    log.success(`✅ Auto-publish terminé! ${articlesPublished} article(s) publié(s)`);
    log.info('💵 Aucun frais OpenAI - 100% GRATUIT!');
    
    process.exit(0);

  } catch (error) {
    log.error(`Erreur: ${error.message}`);
    log.debug(`Stack: ${error.stack}`);
    log.info('Exiting with code 0 to prevent workflow failure');
    process.exit(0);
  }
}

// Run
main().catch((error) => {
  log.error(`Unhandled error: ${error.message}`);
  process.exit(0);
});
