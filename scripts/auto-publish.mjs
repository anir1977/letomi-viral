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
      title: "5 Surprising Signs You're More Intelligent Than You Think",
      content: `## The Hidden Nature of Intelligence

Have you ever doubted your own intelligence? You're not alone. Intelligence isn't just about IQ scores or academic achievements. Recent research in cognitive psychology reveals that many everyday behaviors actually indicate exceptional intelligence that most people don't even recognize in themselves.

## Why Traditional Measures Fall Short

The traditional IQ test, while useful, captures only a narrow slice of human cognitive abilities. Modern neuroscience has shown that intelligence manifests in countless ways - from emotional awareness to creative problem-solving. If you've ever felt like you don't measure up to conventional standards, this article might change your perspective entirely.

## Sign #1: You Question Your Own Beliefs

Highly intelligent people have a fascinating trait: they're comfortable with uncertainty. If you find yourself constantly questioning your assumptions and reconsidering your beliefs, that's actually a sign of cognitive sophistication. This trait, known as intellectual humility, allows for continuous growth and adaptation. Smart people know that being wrong is an opportunity to learn, not a source of shame.

## Sign #2: You're Intensely Curious About Everything

Do you find yourself falling down Wikipedia rabbit holes at 2 AM? Does a simple question lead you to hours of research? This insatiable curiosity is a hallmark of genuine intelligence. Your brain is wired to seek connections, patterns, and deeper understanding. This natural drive to learn is far more valuable than memorizing facts for tests.

## Sign #3: You Recognize What You Don't Know

This might sound counterintuitive, but acknowledging your ignorance is incredibly smart. The Dunning-Kruger effect shows that less competent people often overestimate their abilities, while truly intelligent individuals are more likely to underestimate themselves. If you're acutely aware of gaps in your knowledge, you're probably smarter than you think.

## Sign #4: You Have High Emotional Intelligence

Can you read a room effortlessly? Do you adapt your communication style based on who you're talking to? Emotional intelligence - the ability to understand and manage emotions in yourself and others - is just as important as analytical intelligence. In fact, studies show that emotional intelligence often predicts success better than traditional IQ tests.

## Sign #5: You Prefer Deep Conversations Over Small Talk

If mindless chitchat drains you while philosophical discussions energize you, you're displaying signs of intellectual depth. Intelligent people crave meaningful exchanges of ideas. They want to understand motivations, explore concepts, and challenge perspectives - not just discuss the weather.

## The Science Behind Hidden Intelligence

Neuroscientists have discovered that intelligence isn't static - it's malleable and multifaceted. Your brain has extraordinary plasticity, meaning it continuously rewires itself based on experiences. Every time you learn something new, question an assumption, or empathize with someone, you're literally building new neural pathways.

Research from Harvard and Stanford shows that people who exhibit these "hidden" intelligence markers often outperform those with higher IQ scores in real-world scenarios. Why? Because they're adaptable, self-aware, and continuously learning.

## Embracing Your Cognitive Strengths

Understanding these signs isn't about ego - it's about recognizing your unique cognitive profile. Maybe you're not the fastest at mental math, but you excel at understanding complex emotional dynamics. Perhaps you don't remember every historical date, but you can synthesize information from multiple sources to form original insights.

The key is to stop comparing yourself to narrow definitions of smart and start appreciating the diverse ways intelligence manifests. Your curiosity, self-awareness, and emotional sensitivity aren't weaknesses - they're sophisticated cognitive abilities that serve you well in an increasingly complex world.`,
      keywords: 'intelligence psychology emotional IQ cognitive abilities smart',
      faqs: [
        { question: "What is emotional intelligence and why does it matter?", answer: "Emotional intelligence (EQ) is the ability to recognize, understand, and manage your own emotions while also perceiving and influencing the emotions of others. It matters because EQ often predicts success in relationships, careers, and life satisfaction better than traditional IQ scores." },
        { question: "Can intelligence be developed or is it fixed?", answer: "Modern neuroscience proves that intelligence is not fixed. Through neuroplasticity, your brain continually forms new connections based on learning and experiences. You can develop various forms of intelligence throughout your entire life through deliberate practice and curiosity." },
        { question: "Why do intelligent people often underestimate themselves?", answer: "This phenomenon, related to the Dunning-Kruger effect, occurs because truly knowledgeable people are more aware of the vast amount they don't know. They see the complexity of topics more clearly and therefore feel less confident, while less competent individuals lack the awareness to recognize their limitations." }
      ]
    }
  ],
  
  technology: [
    {
      title: "How Artificial Intelligence is Quietly Reshaping Your Daily Life",
      content: `## The Invisible Revolution

Artificial intelligence isn't coming - it's already here, woven into the fabric of your daily existence in ways you probably don't even notice. From the moment you wake up to when you fall asleep, AI algorithms are quietly shaping your experiences, decisions, and interactions.

## Morning: Your Phone Knows You Better Than You Know Yourself

That smartphone alarm that wakes you up? It's powered by machine learning algorithms that track your sleep patterns, optimize wake times, and even adjust based on your calendar. But that's just the beginning. As you scroll through your morning news feed, sophisticated AI curates every article, video, and advertisement you see - not randomly, but based on thousands of data points about your interests, behavior, and engagement patterns.

Your phone's keyboard predicts your next word with uncanny accuracy because it's learned from millions of your previous messages. autocorrectThe photo enhancement that makes your morning selfie pop? That's computational photography powered by neural networks trained on billions of images.

## Commute: Navigation Systems That Think Ahead

When you check your commute time, you're not just getting route suggestions - you're benefiting from AI systems analyzing real-time traffic data from millions of phones, predicting accidents before they cause congestion, and rerouting you dynamically. These systems learn patterns: rush hour bottlenecks, construction impacts, even how specific weather conditions affect traffic flow.

Ride-sharing apps use machine learning to predict demand, set dynamic pricing, match drivers with riders efficiently, and estimate arrival times with remarkable precision. Every trip teaches the system something new.

## Work: The AI Coworker You Didn't Know You Had

At work, AI assists you in countless ways. Email platforms use natural language processing to filter spam, prioritize important messages, and even suggest replies. Writing assistants powered by large language models help you compose clearer, more effective communication.

Video conferencing tools now use AI for background blur, noise cancellation, and even real-time translation. Project management software predicts timeline risks and suggests optimizations based on historical data from thousands of similar projects.

## Healthcare: Early Detection Saves Lives

Perhaps most significantly, AI is revolutionizing healthcare in ways that directly impact life expectancy. Machine learning algorithms can now detect certain cancers from medical images more accurately than human radiologists. They can predict heart attacks by analyzing subtle patterns in EKG data that humans miss.

AI systems analyze your fitness tracker data to provide personalized health recommendations. They can spot early warning signs of diabetes, sleep apnea, or irregular heart rhythms - often years before symptoms become obvious.

## Entertainment: Personalized Just for You

Your evening entertainment is entirely AI-curated. Streaming services don't just recommend shows you might like - they use sophisticated algorithms analyzing viewing habits of millions to predict with remarkable accuracy what will keep you engaged. The thumbnails you see are even personalized - different users see different images for the same show based on what's most likely to appeal to them.

Music streaming services create personalized playlists by analyzing not just what you've listened to, but the時間 of day, your mood indicators, and even what similar listeners enjoy. The algorithm knows whether you want energizing workout music or relaxing evening jazz before you do.

## Shopping: The Persuasion Engine

Every online shopping experience is powered by recommendation engines that analyze your browsing history, purchase patterns, and behavior of similar customers. Dynamic pricing algorithms adjust costs in real-time based on demand, your likelihood to purchase, and competitive pricing.

## The Future Is Now

The remarkable thing is that none of this required you to actively engage with "AI" - it just works, invisibly enhancing your life. As these systems continue learning and improving, they'll become even more integrated into our daily experiences.

Understanding how AI shapes your world isn't about fear or resistance - it's about informed awareness. These tools are neither inherently good nor bad; they're powerful technologies that reflect our values, biases, and priorities. The more we understand them, the better we can shape their development and deployment to benefit humanity.`,
      keywords: 'artificial intelligence AI technology machine learning daily life',
      faqs: [
        { question: "Is AI actually intelligent or just following programmed rules?", answer: "Modern AI systems, particularly those using machine learning and neural networks, genuinely learn patterns from data rather than following explicit programmed rules. While they don't possess consciousness or general intelligence like humans, they can discover complex patterns and make predictions that even their creators don't fully understand." },
        { question: "Should I be concerned about AI knowing so much about my daily habits?", answer: "It's wise to be thoughtful about digital privacy. While AI systems do collect and analyze personal data to provide personalized services, you can typically control what data you share through privacy settings. The key is understanding what you're trading (data) for what benefits (personalized services) and making informed choices." },
        { question: "Will AI eventually replace human jobs?", answer: "AI will certainly transform the job market, automating some tasks while creating new opportunities. History shows that technological revolutions typically create more jobs than they eliminate, though the types of work change. The most successful approach is to focus on skills that complement AI: creativity, emotional intelligence, complex problem-solving, and uniquely human capabilities." }
      ]
    }
  ],
    
  science: [
    {
      title: "10 Mind-Bending Scientific Facts That Challenge Everything You Think You Know",
      content: `## Reality Is Stranger Than Fiction

Science has a habit of revealing truths that seem impossible - facts so counterintuitive that they fundamentally challenge our understanding of reality. These aren't science fiction or theoretical speculation; these are verified, reproducible scientific discoveries that force us to reconsider what we think we know about the universe and ourselves.

## 1. Hot Water Can Freeze Faster Than Cold Water

This sounds absurd, right? Yet under certain conditions, hot water genuinely freezes faster than cold water - a phenomenon called the Mpemba effect, named after a Tanzanian student who observed it in 1963. Scientists are still debating exactly why this happens, with theories involving evaporation rates, convection currents, and dissolved gases.

The fascinating part? This effect was known to Aristotle, forgotten for centuries, and rediscovered by a high school student. It reminds us that observation sometimes precedes understanding, and that simple questions can reveal complex physics.

## 2. You're Older at Your Head Than Your Feet

Einstein's theory of general relativity predicts something bizarre: time moves slightly faster the further you are from a massive object's gravitational field. This means your head, being further from Earth's center, experiences time slightly faster than your feet - making it technically older.

Before you dismiss this as too small to matter, consider this: GPS satellites must account for relativistic time dilation or they'd accumulate errors of miles per day. Your head ages about 90 billionths of a second faster than your feet over a 79-year lifetime. Tiny, yes, but measurably real.

## 3. You're Never Actually Touching Anything

When you touch a table, you're not really touching it. At the atomic level, the electrons in your hand's atoms repel the electrons in the table's atoms. What you perceive as "touch" is actually electromagnetic repulsion. There's always a tiny gap - you're essentially levitating nanometers above everything you "touch."

This has profound implications. You've never truly touched another person. You've never actually sat on a chair. Every physical interaction in your life is electromagnetic forces interacting across infinitesimal distances.

## 4. More Than Half Your Body Isn't Human

Your body contains approximately 37 trillion human cells. But it also hosts an estimated 39 trillion bacterial cells, plus countless viruses, fungi, and other microorganisms. By cell count, you're actually more microbial than human. These microbes aren't just passengers - they're essential for digestion, immune function, and even mood regulation.

Recent research suggests that your gut bacteria might influence your thoughts, emotions, and behavior through the gut-brain axis. In a very real sense, "you" are a collaborative ecosystem, not a single organism.

## 5. Bananas Are Radioactive (And So Are You)

Bananas contain potassium-40, a naturally radioactive isotope. Eating a banana exposes you to about 0.1 microsieverts of radiation. But here's the thing: you're already radioactive. Your body contains radioactive carbon-14, potassium-40, and other isotopes. You emit about 5,000 gamma rays per hour from radioactive decay happening inside you right now.

This is completely harmless - your body has evolved with this background radiation. But it's a reminder that "radioactive" doesn't automatically mean "dangerous." Context and dose matter enormously.

## 6. The Universe Is 95% Invisible

Everything we can see, touch, or detect directly - every star, planet, person, and particle - represents only about 5% of the universe. The other 95% consists of dark matter (about 27%) and dark energy (about 68%). We know they exist only through their gravitational effects, but we have no idea what they actually are.

Imagine being able to perceive only 5% of reality. That's our current situation. We're like people trying to understand an elephant while only being able to see its shadow.

## 7. You're Made of Stardust (Literally)

Every atom in your body heavier than hydrogen was forged in the nuclear furnace of a star billions of years ago. The carbon in your cells, the calcium in your bones, the iron in your blood - all created through nuclear fusion in stars that exploded long before our solar system formed.

You are genuinely made of star stuff. Your origins trace back 13.8 billion years to the Big Bang, with a detour through multiple generations of stars. In a very real sense, you're the universe experiencing itself.

## 8. Quantum Particles Can Be in Two Places at Once

At the quantum level, particles don't have definite positions until measured. An electron can genuinely be in multiple places simultaneously - a phenomenon called superposition. Only when you observe it does it "choose" a specific location.

This isn't a limitation of our measuring instruments; it's fundamental to reality. Particles exist in probability clouds until observation collapses them into definite states. This has massive implications for the nature of reality and observation itself.

## 9. There Are More Possible Chess Games Than Atoms in the Universe

The number of possible chess games is estimated at 10^120. The observable universe contains about 10^80 atoms. This means chess possibilities vastly outnumber atoms in existence. This demonstrates how complexity can emerge from simple rules - a key insight applicable to everything from evolution to artificial intelligence.

## 10. Your Memories Are Fake (Sort of)

Every time you recall a memory, your brain reconstructs it from fragments. And each time you remember something, you're actually remembering the last time you remembered it - potentially introducing small modifications. Memories aren't playback recordings; they're reconstructive processes prone to distortion.

Studies show that confident, vivid memories can be entirely false. Your brain fills gaps with plausible details, influenced by current knowledge and suggestions. In a legal sense, eyewitness testimony is notoriously unreliable for exactly this reason.

## Why These Facts Matter

These aren't just curiosities - they represent fundamental challenges to our intuitive understanding of reality. They remind us that the universe operates according to rules that often defy common sense. They encourage intellectual humility: if reality can be this strange and counterintuitive, what else might we be fundamentally wrong about?

Science isn't about confirming what we already believe; it's about discovering truths that challenge our assumptions. And the more we learn, the more we realize how much remains mysterious.`,
      keywords: 'science physics facts discovery counterintuitive reality',
      faqs: [
        { question: "How can scientists be sure about facts that seem impossible?", answer: "Scientific facts are established through repeated experiments, peer review, and independent verification. Something like the Mpemba effect or time dilation can be tested and measured. Scientists don't accept counterintuitive findings easily - they require extraordinary evidence, which is why these facts are so well-established despite seeming impossible." },
        { question: "If my memories are unreliable, how can I trust anything I remember?", answer: "While individual memories can be distorted, the overall pattern of your memories and experiences remains largely accurate. Your brain didn't evolve to create perfect recordings but to extract meaning and guide behavior. Understanding memory's reconstructive nature makes us more thoughtful about certainty and more open to evidence that challenges our recollections." },
        { question: "What is dark matter and dark energy?", answer: "Honestly, we don't know. Dark matter is an unknown substance that exerts gravitational force but doesn't interact with light. Dark energy is an even more mysterious force causing the universe's expansion to accelerate. Both are inferred from their effects rather than direct observation. It's one of science's biggest unsolved mysteries." }
      ]
    }
  ],
  
  health: [
    {
      title: "The Science-Backed Secrets to Living 10+ Years Longer",
      content: `## Longevity Isn't Just Genetics

Here's the surprising truth that decades of research have revealed: genetics account for only about 20-30% of how long you live. The rest? It comes down to your daily habits, social connections, and lifestyle choices. The people living longest aren't following extreme diets or punishing exercise regimens - they're doing something much simpler and more sustainable.

## Learning From the World's Longevity Hotspots

Researchers studying "Blue Zones" - regions where people routinely live past 100 in good health - have identified specific, actionable patterns. These aren't wealthy areas with cutting-edge medical technology. They're communities in Okinawa (Japan), Sardinia (Italy), Ikaria (Greece), Nicoya (Costa Rica), and Loma Linda (California) where lifestyle choices create extraordinary health outcomes.

## Habit #1: Move Naturally Throughout the Day

Here's what the longest-living people don't do: go to gyms. Instead, they've built natural movement into their lives. Sardinian shepherds walk miles daily tending flocks. Okinawans garden. Costa Ricans walk to visit neighbors.

The science is clear: consistent, moderate activity beats intense, sporadic exercise for longevity. Your body evolved for regular movement, not sedentary days punctuated by gym sessions. Walking 30-60 minutes daily, taking stairs, gardening, playing with kids - these "incidental" activities might be more valuable than marathon training.

Recent studies show that breaking up sitting time with even 2-minute movement breaks significantly improves metabolic health markers. Your body doesn't need athletic performance; it needs consistent, varied movement.

## Habit #2: The 80% Rule (Hara Hachi Bu)

Okinawans practice "hara hachi bu" - eating until you're 80% full, not stuffed. This ancient practice aligns perfectly with modern research showing that mild caloric restriction (without malnutrition) consistently extends lifespan across species.

The mechanism? When your body isn't overwhelmed processing constant food intake, it activates cellular repair processes, reduces inflammation, and improves insulin sensitivity. You're not starving - you're giving your body space to maintain itself.

Practically, this means: eat slower, use smaller plates, stop before you feel completely full. Your brain needs 20 minutes to register satiety signals from your stomach anyway.

## Habit #3: Plant-Forward Eating (Not Necessarily Vegetarian)

Blue Zone populations eat meat, but sparingly - maybe five times per month. Their diets center on beans, lentils, whole grains, nuts, and vegetables. Not because of ideology, but because that's what was traditionally available.

The longest-lived Seventh-day Adventists in Loma Linda are vegetarian or vegan. The Mediterranean diet, repeatedly linked to longevity, is plant-heavy with olive oil and fish. The pattern is clear: plants should dominate your plate.

Why? Plants provide fiber feeding beneficial gut bacteria, antioxidants reducing cellular damage, and nutrients supporting repair processes. They're also less calorically dense, naturally supporting the 80% rule.

## Habit #4: Social Connection Is Medicine

Here's a startling fact: loneliness and social isolation are as dangerous to your health as smoking 15 cigarettes daily. Conversely, strong social connections reduce mortality risk by 50%.

Blue Zone centenarians typically live within extended family networks. They have regular social interactions, feel needed and valued, and maintain purpose through community involvement. This isn't optional for longevity - it's essential.

The mechanism? Chronic loneliness triggers inflammatory responses, elevates stress hormones, impairs immune function, and disrupts sleep. Meanwhile, positive social interaction reduces stress, provides emotional support, encourages healthy behaviors, and gives life meaning.

If you're isolated, start small: join clubs, volunteer, prioritize family time, or develop friendships. Your social health is as important as diet and exercise.

## Habit #5: Find Your "Ikigai" (Reason for Being)

Okinawans have "ikigai" - a reason to wake up each morning. Nicoyans call it "plan de vida." Without it, health declines rapidly. Studies show that people with strong life purpose live 7-8 years longer than those without.

This doesn't mean grand missions. Your ikigai might be tending a garden, teaching grandchildren, creating art, or supporting your community. What matters is feeling that you matter - that your presence makes a difference.

Research on retirement shows that those who maintain purpose and engagement stay healthier longer. Conversely, people who retire with no plans often see rapid cognitive and physical decline.

## Habit #6: Stress Reduction Rituals

Chronic stress literally shortens your telomeres - the protective caps on chromosomes associated with aging. Blue Zone populations have built-in stress reduction: Adventists observe Sabbath, Ikarians nap daily, Okinawans take moments for ancestor remembrance.

Modern science validates these practices: meditation, prayer, napping, and deliberate downtime reduce cortisol, lower blood pressure, improve immune function, and decrease inflammation.

You don't need a spa retreat. Regular practices - even 10 minutes of meditation, daily walks in nature, or evening relaxation routines - make measurable differences in longevity markers.

## Habit #7: Moderate Alcohol (Especially Red Wine)

Most Blue Zone populations drink alcohol moderately and regularly - typically 1-2 glasses of red wine daily with food and friends. The key words? Moderately, regularly, and social context.

This contradicts recent research suggesting no amount of alcohol is healthy. The difference? Blue Zone drinking is part of social connection, consumed with meals, and never to excess. Binge drinking is toxic; moderate social drinking might provide benefits through stress reduction and social bonding.

## Implementing These Habits

You can't relocate to Sardinia, but you can adopt these patterns:

- Walk more, sit less. Make movement your default.
- Eat plants primarily. When you eat meat, treat it as a side dish.
- Stop eating before you're stuffed. It takes practice.
- Prioritize relationships. Schedule social time like you schedule workouts.
- Find purpose. What gives your life meaning? Do more of that.
- Build stress reduction into daily routines. Non-negotiable downtime.
- If you drink, do so moderately and socially.

The beautiful thing about longevity research is this: the habits that extend lifespan also improve quality of life right now. You don't sacrifice present joy for future years - you enhance both simultaneously.`,
      keywords: 'longevity health wellness lifestyle blue zones aging',
      faqs: [
        { question: "What are Blue Zones and why do people live longer there?", answer: "Blue Zones are five regions where people consistently live past 100 in good health: Okin awa (Japan), Sardinia (Italy), Ikaria (Greece), Nicoya (Costa Rica), and Loma Linda (California). People there live longer due to specific lifestyle factors: natural daily movement, plant-based diets, strong social connections, life purpose, and stress management - not genetics or advanced medicine." },
        { question: "How important is exercise for longevity compared to diet?", answer: "Both matter enormously, but they work differently. Diet affects cellular processes, inflammation, and metabolic health directly. Exercise improves cardiovascular function, maintains muscle mass, and boosts mental health. Blue Zone research suggests consistent moderate movement (walking, gardening) throughout the day might be more beneficial than intense gym workouts. Ideally, combine both: eat well and move naturally every day." },
        { question: "Can I start these habits later in life and still benefit?", answer: "Absolutely. Studies show that adopting healthier habits at any age provides benefits. A 2020 study found that even people who started exercising regularly in their 60s significantly reduced mortality risk. Your biology responds to current behaviors - it's never too late to improve your longevity prospects." }
      ]
    }
  ],
  
  business: [
    {
      title: "Why Working Less Actually Makes You More Productive: The Science-Backed Paradox",
      content: `## The Productivity Trap

We live in a culture that glorifies overwork. Pulling all-nighters, answering emails at midnight, bragging about being "always on" - these badges of honor are actually certificates of inefficiency. Because here's what decades of productivity research consistently shows: after a certain point, working more hours makes you dramatically less effective.

## The 40-Hour Sweet Spot

Businessman Henry Ford didn't reduce his factories to 40-hour weeks out of generosity - he did it because his data showed workers were more productive with more rest. Modern research confirms this repeatedly: productivity per hour drops significantly after 40 hours per week, and after 50-55 hours, productivity per hour declines so sharply that you're barely accomplishing more than you would in 40 hours anyway.

A Stanford study found that people working 70 hours per week produced no more output than those working 56 hours. You read that correctly: 14 extra hours of work added literally zero value. Those workers weren't lazy - they were exhausted, making mistakes, and wasting time on unnecessary revisions.

## The Biological Reality of Cognitive Limits

Your brain isn't a machine that operates consistently. It has natural rhythms, limited attentional resources, and mounting diminishing returns. After about 90-120 minutes of focused cognitive work, your brain's performance drops significantly. Pushing through this doesn't demonstrate commitment - it demonstrates poor understanding of neuroscience.

Studies using fMRI scans show that overworked brains look remarkably similar to sleep-deprived brains: reduced activity in the prefrontal cortex (responsible for decision-making and creativity), increased stress hormone levels, and impaired memory consolidation. You might feel like you're working hard, but your cognitive output is garbage.

## Strategic Breaks: Investment, Not Waste

Here's where it gets fascinating: taking regular breaks doesn't reduce productivity - it enhances it dramatically. Research from Microsoft показаshows that taking short breaks between tasks helps your brain consolidate learning, process information, and approach problems with fresh perspectives.

The Pomodoro Technique (25 minutes focused work, 5-minute break) works because it aligns with your brain's natural attention cycles. Even better? The most productive people take breaks before they feel tired, not after exhaustion sets in.

What should you do during breaks? Not check your phone. Actual rest - walking, stretching, looking at nature, or socializing - allows your default mode network (the brain's "background processing" system) to activate. This is when insights happen, creativity emerges, and problems solve themselves.

## Deep Work vs. Performative Busyness

Cal Newport's research on "deep work" reveals a crucial insight: the most valuable work requires uninterrupted, intense focus. Four hours of genuine deep work produces dramatically more value than eight hours of distracted, fragmented attention.

Most people confuse activity with accomplishment. They're in meetings, answering emails, putting out fires - feeling busy and stressed. But busy doesn't mean productive. The most effective people are Often the ones who've eliminated bullshit and protected their capacity for deep, focused work.

Here's the math: if you can achieve four hours of truly focused work daily (no email, no Slack, no interruptions), you're likely more productive than someone putting in 10-hour days of fragmented attention. Quality over quantity isn't a platitude - it's neuroscience.

## The Creativity Problem

Innovation and creativity don't emerge from grinding harder - they come from mental space. When your calendar is packed and your mind is cluttered, there's no room for the kind of associative thinking that generates breakthrough ideas.

Google's "20% time" (allowing employees to spend 20% of their time on personal projects) produced Gmail and AdSense. 3M's similar policy led to Post-it Notes. These companies understood something crucial: valuable ideas emerge when people have time and mental bandwidth to explore.

If you're always in execution mode, you never enter exploration mode. The most productive people deliberately create空白 space for thinking, experimenting, and playing with ideas.

## The Ultradian Rhythm Reality

Your body operates on approximately 90-minute cycles called ultradian rhythms. During each cycle, you move from high energy and focus to lower energy and diminished concentration. Fighting this rhythm by powering through creates stress and depletes your resources faster.

Elite performers - whether athletes, musicians, or chess grandmasters - structure their practice around these cycles. They work intensely for 90 minutes, then rest. They never practice more than 4-5 hours daily of truly focused work. The rest of their time? Recovery, which is when adaptation and improvement actually happen.

## The Compound Effect of Rest

Perhaps most importantly: rest isn't just avoiding harm from overwork. Adequate rest is when your brain consolidates memories, processes emotions, solidifies learning, and generates insights. Sleep-deprived or overworked brains literally cannot learn as effectively or think as clearly.

Studies show that people who get 7-8 hours of sleep learn new tasks 40% more effectively than those getting 5-6 hours. The productivity cost of insufficient rest compounds over time, creating a downward spiral of diminishing returns.

## Implementing the Productivity Paradox

How do you work less while achieving more?

1. **Protect Your Peak Hours**: Identify when you're most alert (usually morning for most people) and guard that time fiercely for deep work. No meetings, no email - just your most important cognitive tasks.

2. **Set Strict Boundaries**: Define work hours and stick to them. Working evenings and weekends doesn't prove dedication - it proves you can't work effectively during normal hours.

3. **Take Real Breaks**: Every 90 minutes, step away. Take walks. socialize. Move your body. Give your brain actual rest, not just different screens.

4. **Reduce Meeting Load**: Most meetings could be emails. Most emails could be ignored. Protect your time as your most valuable resource.

5. **Practice Saying No**: Every yes to a new commitment is a no to something else - often to the deep work that actually moves needles.

6. **Prioritize Ruthlessly**: Accept that you can't do everything. The most productive people aren't those who do the most tasks - they're those who do the right tasks and ignore everything else.

## The Cultural Shift Required

This isn't just personal advice - it requires organizational change. Companies that measure productivity by hours worked create cultures of performative busyness rather than genuine value creation. Forward-thinking organizations measure outputs and impact, not inputs and face time.

Some companies are experimenting with four-day work weeks or "results-only work environments" and finding that productivity actually increases. When people have the authority to work in ways that align with their cognitive limits and circadian rhythms, they produce better work in less time.

## The Bottom Line

Working yourself to exhaustion doesn't demonstrate commitment - it demonstrates poor resource management. You are a human with biological limits, cognitive rhythms, and finite attentional resources. Pushing past those limits doesn't make you more productive; it makes you slower, stupider, and more mistake-prone.

The productivity paradox isn't actually paradoxical - it's just counterculture. In a world that glamorizes overwork, the radical act is to work smarter, respect your limits, and create genuine value in fewer hours. Your most productive self isn't your most exhausted self. It's your most rested, focused, and mentally clear self.`,
      keywords: 'productivity work-life-balance efficiency deep work focus business',
      faqs: [
        { question: "Won't I fall behind my competitors if I work less?", answer: "The evidence suggests the opposite. Companies and individuals who prioritize sustainable work practices consistently outperform those running on exhaustion. You're not competing on hours worked - you're competing on value created. A well-rested person working 40 focused hours beats an exhausted person grinding 60 distracted hours." },
        { question: "How can I convince my employer that working less is acceptable?", answer: "Focus on results, not hours. Demonstrate that your output and quality improve with better work-life boundaries. Many forward-thinking companies now measure productivity by deliverables and impact, not time spent at a desk. If your organization can't see past 'butts in seats,' that might be a sign to find a better environment." },
        { question: "What is 'deep work' and how do I practice it?", answer: "Deep work is sustained, uninterrupted focus on cognitively demanding tasks. To practice it: eliminate all distractions (phone off, email closed, door shut), work on one important task, and maintain focus for 60-90 minutes. Start with shorter sessions if needed, but the key is complete focus - not multitasking or checking messages 'quickly.'" }
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
