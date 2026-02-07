import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/app/components/ArticleLayout";

export const articles: Record<
  string,
  {
    title: string;
    description: string;
    content: JSX.Element;
  }
> = {
  "you-remember-events-wrong": {
    title: "You Remember Events Wrong (and It's Not Your Fault)",
    description:
      "Your memories feel real, but they are stitched together. Discover why your brain rewrites events and how it changes your life.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          Think of your memory like a great storyteller, not a perfect recorder. It
          fills in gaps, edits scenes, and sometimes swaps details without asking.
          The result? You can feel 100% certain about moments that never happened
          the way you recall.
        </p>

        <h2>The Focus Keyword: memory distortion</h2>
        <p>
          Memory distortion is not a glitch; it is a feature that helps your brain
          work fast and keep you safe. But it can also lead you to swear by details
          that are wrong. Understanding why that happens makes you more accurate,
          not less confident.
        </p>

        <h2>Your Brain Is a Prediction Machine</h2>
        <p>
          Your brain is built to predict, not to archive. That sounds dramatic, but
          it makes daily life smoother:
        </p>
        <ul>
          <li>It uses patterns to fill in missing details.</li>
          <li>It compresses experiences into easy-to-recall "gist" memories.</li>
          <li>It trades precision for speed because speed kept us alive.</li>
        </ul>
        <p>
          That is great when you are walking through a crowded street and need to
          react quickly. It is not great when you are trying to remember exactly
          what someone said in a tense conversation.
        </p>

        <h3>The "Gist vs. Detail" Trade-Off</h3>
        <p>
          You remember the plot, not the script. Over time, the "gist" gets
          stronger, and the details fade. That is why siblings can tell the same
          family story but disagree on the specifics.
        </p>

        <h2>Why Confidence Doesn't Equal Accuracy</h2>
        <p>
          Confidence is a feeling, not a fact. You can be totally confident and
          still mistaken. Researchers have found that confidence often rises when:
        </p>
        <ul>
          <li>You have rehearsed a memory by telling it often.</li>
          <li>The memory matches your beliefs about yourself.</li>
          <li>You've seen photos or heard other people's versions.</li>
        </ul>
        <p>
          The story becomes smoother and more vivid, which feels like truth, even
          when parts have shifted.
        </p>

        <h2>The Sneaky Role of Suggestion</h2>
        <p>
          Memory is surprisingly easy to nudge. Ask a question with one extra word
          and the memory can change. For example, "How fast was the car going when
          it smashed into the other car?" makes people remember higher speeds than
          "when it bumped into."
        </p>

        <h3>Why This Matters in Real Life</h3>
        <p>Suggestion doesn't only show up in labs:</p>
        <ul>
          <li>Leading questions in interviews can reshape what a witness recalls.</li>
          <li>Social media threads can create a shared story that feels personal.</li>
          <li>
            Family storytelling can merge multiple people's memories into one
            "official" version.
          </li>
        </ul>

        <h2>You Actually Update a Memory Every Time You Recall It</h2>
        <p>
          When you remember something, it becomes flexible for a short window
          before it "re-saves." That means each recall can edit it. A new detail
          gets stitched in, or a missing detail gets replaced by something
          plausible.
        </p>
        <p>
          Think of it like opening a file, making small changes, and saving over
          the original. Your brain is doing the same thing, every time you replay
          a moment.
        </p>

        <h2>Emotion Makes Memories Feel Clearer (But Not Always Truer)</h2>
        <p>
          Strong emotion makes memories <em>feel</em> vivid. That is why we have
          "flashbulb" memories of major events. But vivid doesn't mean accurate.
          Under stress, your attention narrows. You might remember the loud sound
          or the face, but miss the surrounding details.
        </p>

        <h3>The Tunnel Effect</h3>
        <p>
          When emotions spike, your brain zooms in on the main threat or goal.
          That helps survival. It also means your memory of the full scene can be
          blurry or warped.
        </p>

        <h2>Practical Ways to Be a More Reliable Rememberer</h2>
        <p>You do not need to distrust your brain. You just need to work with it.</p>
        <ul>
          <li>
            <strong>Write it down fast.</strong> Journaling within a day helps
            preserve details.
          </li>
          <li>
            <strong>Avoid leading questions.</strong> Ask "What happened?" not
            "Did he yell?"
          </li>
          <li>
            <strong>Compare sources.</strong> If the memory matters, verify it
            with texts, photos, or other people.
          </li>
          <li>
            <strong>Pause before arguing.</strong> Treat a memory dispute as an
            investigation, not a trial.
          </li>
        </ul>

        <h2>The Social Side of Memory Distortion</h2>
        <p>
          Memory distortion shapes arguments, relationships, and even the stories
          we tell about ourselves. When two people disagree about the past, it is
          not always because someone is lying. They might be reconstructing the
          same event differently.
        </p>
        <p>
          That can be freeing. It means you can be wrong without being dishonest.
          It also means you can be right without being cruel.
        </p>

        <h2>Conclusion</h2>
        <p>
          Your memory is not a camera. It is a living story that changes with
          every retelling. That is not a failure; it is a feature that helps you
          navigate the world. The win is knowing this and being a little gentler
          with yourself and others when your memories do not align.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>Memory distortion is common and normal.</li>
          <li>Confidence does not guarantee accuracy.</li>
          <li>Suggestion can reshape what you remember.</li>
          <li>Emotion makes memories vivid, not necessarily precise.</li>
          <li>Writing things down quickly preserves details.</li>
        </ul>
      </>
    ),
  },
  "banana-radiation-myth": {
    title: "The Banana Radiation Myth Is True (But Don't Panic)",
    description:
      "Bananas really are radioactive. Learn the science, the banana equivalent dose, and why it is more fun than scary.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          Yes, bananas are radioactive. That sounds like a prank until you hear
          the reason: potassium. But the bigger surprise is how safe they are and
          why scientists turned this quirky fact into a teaching tool.
        </p>

        <h2>The Focus Keyword: banana radiation</h2>
        <p>
          Banana radiation comes from potassium-40, a natural isotope that exists
          in the bananas you eat every day. It is real, measurable, and completely
          harmless in normal amounts.
        </p>

        <h2>The Science in Plain English</h2>
        <p>
          Potassium is essential for life. Your body needs it to regulate nerves
          and muscles. Most potassium is the stable kind, but a tiny fraction is
          potassium-40. That isotope gives off a small amount of radiation as it
          decays.
        </p>

        <h3>So How Much Radiation Is That?</h3>
        <p>Not much. A banana has around 0.1 microsieverts of radiation. For context:</p>
        <ul>
          <li>A dental X-ray: about 5 microsieverts</li>
          <li>A cross-country flight: 30 to 40 microsieverts</li>
          <li>Natural background radiation per day: 10 microsieverts</li>
        </ul>
        <p>
          You would need to eat millions of bananas at once to approach anything
          dangerous. And at that point, your stomach would have far bigger issues.
        </p>

        <h2>The Banana Equivalent Dose (Yes, That's a Real Thing)</h2>
        <p>
          Scientists use "banana equivalent dose" as a playful way to explain
          radiation. It makes a scary topic feel more relatable. Instead of saying
          "40 microsieverts," they can say "about 400 bananas."
        </p>

        <h3>Why It Sticks</h3>
        <ul>
          <li>It turns a scary idea into a silly one.</li>
          <li>It creates a concrete mental image.</li>
          <li>It teaches scale, which is the real story in radiation.</li>
        </ul>

        <h2>Why This Doesn't Build Up in Your Body</h2>
        <p>
          The body is smart. When you eat potassium, it balances levels by
          excreting extra. So even if you eat bananas daily, the potassium-40
          doesn't keep stacking like a comic book villain.
        </p>
        <p>
          In short: your body regulates potassium, and your potassium levels stay
          steady.
        </p>

        <h2>The Bigger Lesson: Natural Doesn't Mean Zero</h2>
        <p>
          Many people assume "natural" equals "no radiation." But the world is
          full of gentle, natural radiation:
        </p>
        <ul>
          <li>You are radioactive (thanks, potassium and carbon-14).</li>
          <li>Granite countertops emit tiny amounts.</li>
          <li>The air contains radon in low concentrations.</li>
        </ul>
        <p>The key is dose. A tiny amount is normal and expected.</p>

        <h2>The Psychology of Fun Facts</h2>
        <p>
          Why do people love this? Because it's surprising and safe. "Bananas are
          radioactive" flips a mental switch. It makes science feel alive, not
          sterile.
        </p>
        <p>
          This is the kind of fact that gets shared because it sparks curiosity
          without fear.
        </p>

        <h2>Should You Worry About Eating Bananas?</h2>
        <p>
          No. Bananas are nutritious, affordable, and safe. The radiation angle is
          just a fun way to highlight how the physical world works.
        </p>
        <p>
          If anything, it is a reminder to question scary headlines and look for
          the numbers behind them.
        </p>

        <h2>Conclusion</h2>
        <p>
          Banana radiation is real, but it is tiny. The fact is entertaining
          because it is true, but also because it teaches scale, perspective, and
          how easily we misunderstand risk.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>
            Your body naturally contains about 4,000 "banana doses" worth of
            potassium-40.
          </li>
          <li>A flight across the ocean equals hundreds of bananas in radiation.</li>
          <li>Radiation is measured in <em>dose</em>, not just presence.</li>
        </ul>
      </>
    ),
  },
  "overthinking-loop": {
    title: "Overthinking Isn't a Personality Trait. It's a Loop.",
    description:
      "Overthinking feels like problem-solving, but it traps you in a loop. Learn the psychology and how to break free.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          Overthinking can feel productive. You replay the conversation, analyze the
          tone, plan the response. But instead of clarity, you get stuck. The loop
          tightens, and you call it "being thorough."
        </p>

        <h2>The Focus Keyword: overthinking psychology</h2>
        <p>
          Overthinking psychology looks at why the brain keeps circling the same
          thoughts. It is not a personality flaw. It is a learned pattern that can
          be changed.
        </p>

        <h2>Why the Brain Loves Loops</h2>
        <p>
          Your brain hates uncertainty. When something feels unresolved, it keeps
          it open like a browser tab. The goal is safety: find the right answer,
          avoid regret, prevent a mistake.
        </p>

        <h3>The Problem</h3>
        <p>
          Not all problems have a neat solution. The loop keeps spinning even when
          there is nothing new to add.
        </p>

        <h2>The Difference Between Reflection and Rumination</h2>
        <p>
          Reflection is useful. It has an end point. Rumination doesn't. It feels
          like analysis, but it is mostly repeating the same content with a rising
          emotional charge.
        </p>
        <p>Ask yourself:</p>
        <ul>
          <li>Am I moving toward a decision?</li>
          <li>Am I generating new options?</li>
          <li>Do I feel calmer or more tense?</li>
        </ul>
        <p>If tension keeps rising, you are likely ruminating.</p>

        <h2>The Hidden Triggers</h2>
        <p>Overthinking often spikes after:</p>
        <ul>
          <li>Social interactions ("Did I say something weird?")</li>
          <li>Big decisions (career, relationships, money)</li>
          <li>Low sleep or high stress</li>
        </ul>
        <p>
          When your body is stressed, your mind becomes sticky. It clings to worries
          because it thinks vigilance equals safety.
        </p>

        <h2>The "Control Illusion"</h2>
        <p>
          Overthinking gives you the <em>feeling</em> of control. If you analyze long
          enough, you might prevent a bad outcome. But real control comes from action,
          not endless mental rehearsal.
        </p>

        <h3>Small Action Beats Perfect Thought</h3>
        <p>
          A tiny action breaks the loop: send the email, make the call, decide a
          boundary. Action closes the mental tab.
        </p>

        <h2>How to Break the Cycle (Without Going Blank)</h2>
        <p>You do not need to "stop thinking." You need to shift the pattern.</p>
        <ul>
          <li><strong>Name the loop.</strong> "I'm ruminating." It creates distance.</li>
          <li><strong>Set a timer.</strong> Give yourself 10 minutes to think, then decide or park it.</li>
          <li><strong>Externalize.</strong> Write it down. The brain relaxes when it sees the problem stored.</li>
          <li><strong>Ask one concrete question.</strong> "What is the next smallest step?"</li>
        </ul>

        <h2>The Role of Self-Compassion</h2>
        <p>
          Overthinking thrives on self-criticism. The more you judge yourself, the
          more you analyze. A gentler inner voice reduces the need to "prove" you
          are safe.
        </p>
        <p>You are not behind. You are just human in a world that is loud and uncertain.</p>

        <h2>Conclusion</h2>
        <p>
          Overthinking feels like protection, but it can become a trap. The way out
          is not willpower; it is pattern change. Name it, externalize it, and take
          a small action. That is how the loop loosens.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>Overthinking is a loop, not a trait.</li>
          <li>Rumination repeats; reflection resolves.</li>
          <li>Stress and uncertainty make the loop stronger.</li>
          <li>Action closes open mental tabs.</li>
        </ul>
      </>
    ),
  },
  "eye-color-personality": {
    title: "Your Eye Color and Your Personality: What Science Actually Says",
    description:
      "Do blue eyes mean you are calmer? Brown eyes more trustworthy? Here's what research shows about eye color and personality.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          Eye color is one of the first things people notice. It feels like it should
          mean something about you. But does it? Science has looked at this question,
          and the answers are more nuanced than the internet claims.
        </p>

        <h2>The Focus Keyword: eye color personality</h2>
        <p>
          The idea of eye color personality is popular because it is easy to remember.
          But research suggests any links are small and often shaped by culture,
          stereotypes, and perception.
        </p>

        <h2>What the Studies Really Find</h2>
        <p>
          Some studies show mild correlations between eye color and traits like
          assertiveness or risk-taking. But correlation is not destiny. The effects
          are usually weak and depend on the sample.
        </p>

        <h3>Why Findings Are Inconsistent</h3>
        <ul>
          <li>Eye color varies by region and ancestry.</li>
          <li>Personality is influenced by environment, not just biology.</li>
          <li>People treat you differently based on appearance, which shapes behavior.</li>
        </ul>

        <h2>The Power of Stereotypes</h2>
        <p>
          If a culture believes light eyes are "softer" and dark eyes are "stronger,"
          people might respond to you differently. Over time, those responses can shape
          your self-image and behavior.
        </p>
        <p>This is not magic. It is social feedback loops.</p>

        <h2>Perception vs. Reality</h2>
        <p>
          Studies on perceived trustworthiness show that faces with light eyes are often
          rated as "gentler," while dark eyes are rated as "stronger." But these are
          <em>perceptions</em>, not truths.
        </p>

        <h3>Your Eyes Don't Dictate Your Choices</h3>
        <p>Personality grows from:</p>
        <ul>
          <li>Early environment</li>
          <li>Family dynamics</li>
          <li>Social learning</li>
          <li>Personal experiences</li>
        </ul>
        <p>Eye color can influence first impressions. It does not write your life story.</p>

        <h2>The Genetics Angle (A Quick, Clean Version)</h2>
        <p>
          Eye color is influenced by multiple genes, not a single switch. That is why
          two brown-eyed parents can sometimes have a blue-eyed child and vice versa.
          It is complex and beautiful, but it doesn't map neatly to behavior.
        </p>

        <h2>So Why Does This Topic Go Viral?</h2>
        <p>
          Because it is personal. People want to feel seen and understood. A simple
          "eyes = personality" story is easy to share, even if it is shaky.
        </p>
        <p>
          The reality is more interesting: you are shaped by a mix of biology, culture,
          and your own choices.
        </p>

        <h2>Conclusion</h2>
        <p>
          Eye color can influence how people perceive you, but it is not a personality
          predictor. If you enjoy the fun of the idea, keep it playful. If you want
          truth, remember that personality is far more layered than pigment.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>The same eye color can look different in different light.</li>
          <li>Cultural stereotypes change across countries, altering perception.</li>
          <li>Most traits are influenced by dozens of genes and years of experience.</li>
        </ul>
      </>
    ),
  },
  "dream-beginnings": {
    title: "Why You Never Remember the Beginning of Your Dreams",
    description:
      "You can recall the weird middle of a dream but never the start. Here's why your brain loses the opening scene.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You wake up with a dream in your head, but it feels like you jumped into it
          halfway. The opening scene is gone. That is normal and there is a real reason
          your brain drops it.
        </p>

        <h2>The Focus Keyword: dream memory</h2>
        <p>
          Dream memory is fragile because it depends on how the brain stores information
          during sleep. The beginning is the first part to fade.
        </p>

        <h2>Your Brain Is Not Recording During Sleep</h2>
        <p>
          Memory storage relies on certain brain regions working together. During REM
          sleep, the part that handles logical sequencing is less active. That makes
          dreams rich and emotional, but harder to file into stable memory.
        </p>

        <h3>The "Wake-Up Gate" Problem</h3>
        <p>
          The moment you wake up, your brain switches modes. If you don't grab the dream
          right away, it evaporates fast.
        </p>

        <h2>The Beginning Is the Weakest Link</h2>
        <p>
          The start of the dream happened earlier in the sleep cycle. That makes it more
          distant by the time you wake. The end is fresher, so you remember it more easily.
        </p>
        <p>Think of it like a conversation you overheard: you remember the last sentence, not the first.</p>

        <h2>Sleep Cycles Matter</h2>
        <p>
          Dreams are strongest in late-night REM periods. If you wake during one of those,
          you remember more. If you wake between cycles, the dream memory slips away.
        </p>

        <h3>Why Alarm Clocks Wreck Dream Recall</h3>
        <p>
          Alarms jolt you out of REM. Your brain shifts into alert mode and drops the dream
          file to handle the new task: get up.
        </p>

        <h2>How to Remember Dreams Better</h2>
        <p>If you want to capture them:</p>
        <ul>
          <li><strong>Stay still on wake-up.</strong> Movement disrupts recall.</li>
          <li><strong>Repeat the dream.</strong> Say it in your head before grabbing your phone.</li>
          <li><strong>Write it down fast.</strong> Even a few words anchor the memory.</li>
        </ul>

        <h2>The Emotional Glue</h2>
        <p>
          Emotions are strong in dreams. That's why you may remember the feeling even when
          the plot is missing. Your brain stores the emotion as a shortcut, but the storyline
          fades.
        </p>

        <h2>Conclusion</h2>
        <p>
          You don't remember the beginning of your dreams because your brain isn't built to
          file them in order. It stores emotion and fragments, not full scripts. If you want
          more, catch them quickly or they will slip away.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>Dream memory is fragile and fast-fading.</li>
          <li>The beginning happens earlier and fades first.</li>
          <li>Alarms and quick movement erase recall.</li>
          <li>Writing down fragments helps preserve them.</li>
        </ul>
      </>
    ),
  },
  "face-memory-myth": {
    title: "The Face Memory Myth: Why You Forget People You Just Met",
    description:
      "You are not rude - you are human. Learn why face memory fails and how to remember names and faces better.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You meet someone, smile, say their name, and five minutes later it's gone. It
          feels embarrassing. But your brain wasn't built to store every new face on command.
        </p>

        <h2>The Focus Keyword: face memory</h2>
        <p>
          Face memory is a specialized system, but it is selective. It prioritizes relevance,
          emotion, and repetition - none of which are strong during a casual introduction.
        </p>

        <h2>The Brain's Face System Is Powerful but Picky</h2>
        <p>
          Humans are excellent at recognizing familiar faces. But we are not great at
          <em>encoding</em> new faces. That requires attention, context, and time.
        </p>

        <h3>The "One-Glance" Myth</h3>
        <p>
          We assume one glance is enough. It usually isn't. If you are distracted or nervous,
          encoding gets worse.
        </p>

        <h2>Why Names Are Even Harder</h2>
        <p>
          Names are abstract. There is no visual hook. Unless you connect the name to something
          meaningful, it slips away.
        </p>
        <p>Try:</p>
        <ul>
          <li>Repeating the name aloud.</li>
          <li>Linking the name to a visual cue.</li>
          <li>Using the name in a sentence right away.</li>
        </ul>

        <h2>The Role of Stress and Social Pressure</h2>
        <p>
          Social settings can make you hyper-aware. That stress steals attention from memory.
          You are thinking about what to say next, not the face in front of you.
        </p>

        <h2>How to Improve Face Memory (Without Tricks)</h2>
        <p>These are simple but effective:</p>
        <ul>
          <li><strong>Slow down the introduction.</strong> A few extra seconds matter.</li>
          <li><strong>Notice a unique feature.</strong> A scar, a smile, a voice pattern.</li>
          <li><strong>Create a mini-story.</strong> "Jake with the red backpack who loves hiking."</li>
        </ul>

        <h2>It's Not Rude to Forget</h2>
        <p>
          Most people forget names and faces. The difference is how they handle it. A quick,
          honest "Sorry, I forgot your name" is better than faking it.
        </p>

        <h2>Conclusion</h2>
        <p>
          Face memory is not broken. It just needs attention and context. When you slow down
          and make the moment meaningful, your brain can store it.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>
            People are worse at recognizing faces of unfamiliar groups, a bias called the
            "other-race effect."
          </li>
          <li>Repeated exposure builds face memory quickly.</li>
          <li>Sleep consolidates face recognition after social events.</li>
        </ul>
      </>
    ),
  },
  "time-feels-faster": {
    title: "The Science of Why Time Feels Faster as You Age",
    description:
      "Time didn't speed up - your brain changed. Discover the psychology of time perception and how to slow it down.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          As a kid, summers felt endless. As an adult, a year can fly by. It feels like time
          is accelerating, but the clock isn't changing - your brain is.
        </p>

        <h2>The Focus Keyword: time perception</h2>
        <p>
          Time perception depends on attention, novelty, and memory density. As these change
          with age, time starts to feel faster.
        </p>

        <h2>The "Novelty Effect"</h2>
        <p>
          New experiences create more memories. More memories make a period feel longer in
          hindsight. When life becomes routine, you form fewer distinct memories, so months
          compress.
        </p>

        <h3>Why Childhood Felt Huge</h3>
        <p>
          Childhood is packed with "firsts." Each first creates a rich memory chunk, which
          makes the past feel long and detailed.
        </p>

        <h2>Attention Shapes Time in the Moment</h2>
        <p>
          When you are bored or anxious, time drags. When you are engaged, time flies. That is
          because attention is the core of time perception.
        </p>

        <h2>The Memory Density Trick</h2>
        <p>
          In retrospect, time feels longer when you can recall many events. So the way to
          "slow time" is to increase memory density.
        </p>

        <h2>How to Make Time Feel Slower</h2>
        <p>You can shift your perception with simple choices:</p>
        <ul>
          <li><strong>Add novelty.</strong> Try a new route, recipe, or hobby.</li>
          <li><strong>Break routines.</strong> Even small changes create new memory anchors.</li>
          <li><strong>Journal highlights.</strong> Writing down moments makes them easier to recall.</li>
        </ul>

        <h2>The Hidden Role of Stress</h2>
        <p>
          Stress makes time feel weird. In the moment, it can slow time, but in hindsight it
          can blur memories. Chronic stress often reduces novelty and makes weeks feel merged.
        </p>

        <h2>Conclusion</h2>
        <p>
          Time isn't speeding up. Your attention and memory patterns are shifting. If you want
          life to feel longer, make it richer in experiences, even in small ways.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>Time perception is shaped by attention and novelty.</li>
          <li>More memories make time feel longer in hindsight.</li>
          <li>Small changes can "slow" your sense of time.</li>
        </ul>
      </>
    ),
  },
  "cocktail-party-effect": {
    title: "Why Your Brain Hears Your Name in a Noisy Room",
    description:
      "The cocktail party effect explains why your name cuts through noise. Here's the science behind selective attention.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You're in a loud room, half-listening, when suddenly you hear your name. It
          feels like magic, but it is actually a feature of attention called the
          cocktail party effect.
        </p>

        <h2>The Focus Keyword: cocktail party effect</h2>
        <p>
          The cocktail party effect is your brain's ability to focus on one signal while
          still monitoring the background for important cues - like your name.
        </p>

        <h2>Attention Is a Filter, Not a Wall</h2>
        <p>
          Your brain filters most noise, but it keeps a small channel open for high-priority
          information. That is why you can be deep in conversation and still notice your name.
        </p>

        <h2>Why Names Are Special</h2>
        <p>
          Your name is linked to identity and social relevance. Your brain assigns it a higher
          priority tag. So even when you are not "listening," it still pops through.
        </p>

        <h2>The Survival Angle</h2>
        <p>
          In ancestral environments, ignoring background noise would be dangerous. Your brain
          evolved to scan for threats and social cues while focusing on one task.
        </p>

        <h2>The Limits of This Superpower</h2>
        <p>
          Selective attention is not perfect. If you are exhausted, stressed, or distracted,
          the filter weakens. That is why you can miss your name sometimes.
        </p>

        <h2>Can You Train This?</h2>
        <p>You can sharpen attention by:</p>
        <ul>
          <li>Practicing mindfulness or focused listening.</li>
          <li>Reducing multitasking.</li>
          <li>Getting enough sleep, which resets attention systems.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Hearing your name in a noisy room is not magic. It is your brain's way of keeping
          you socially aware and safe, even when you think you are tuned out.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>People are more likely to notice their name than other words of the same length.</li>
          <li>Sleep deprivation weakens selective attention significantly.</li>
          <li>The effect fades if your name is overused in spammy contexts.</li>
        </ul>
      </>
    ),
  },
  "left-brain-right-brain-myth": {
    title: "The Left Brain vs. Right Brain Myth That Won't Die",
    description:
      "Are you logical or creative? The left brain vs. right brain story is more myth than science. Here's what's real.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You have probably been told you are a "right-brain creative" or a "left-brain logical"
          person. It is catchy and simple. It is also mostly wrong.
        </p>

        <h2>The Focus Keyword: left brain right brain myth</h2>
        <p>
          The left brain right brain myth suggests that one hemisphere dominates your personality.
          Modern neuroscience shows that both sides work together on almost everything.
        </p>

        <h2>Where the Myth Came From</h2>
        <p>
          Early research found that certain functions are more <em>localized</em>. Language is often
          more left-lateralized, for example. But that does not mean your left side runs your life.
        </p>

        <h2>The Brain Is a Team Sport</h2>
        <p>
          Most tasks involve networks across both hemispheres. Creativity uses logic. Logic uses
          creativity. When you solve a problem, both sides cooperate.
        </p>

        <h2>Why the Myth Persists</h2>
        <p>
          It is simple and flattering. It offers people a quick identity label. But it can also limit
          you by implying you are "not the type" for certain skills.
        </p>

        <h2>What You Can Say Instead</h2>
        <p>If you want to be accurate:</p>
        <ul>
          <li>Talk about <em>skills</em> rather than brain sides.</li>
          <li>Mention that different tasks activate different networks.</li>
          <li>Focus on practice and growth, not fixed labels.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          You are not trapped in a left-brain or right-brain identity. Your brain is flexible and
          networked. The myth is catchy, but the truth is better and more empowering.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>The left/right brain story oversimplifies neuroscience.</li>
          <li>Most tasks use both hemispheres.</li>
          <li>Labels can limit growth more than help it.</li>
        </ul>
      </>
    ),
  },
  "cleaning-buzz": {
    title: "The Strange Reason You Feel a Buzz When You Clean",
    description:
      "Cleaning can feel oddly satisfying. Learn the psychology behind the cleaning buzz and why it calms the mind.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          Have you ever cleaned your room and suddenly felt lighter, calmer, maybe even energized?
          That feeling is real. There are deep psychological reasons why cleaning can feel so good.
        </p>

        <h2>The Focus Keyword: cleaning psychology</h2>
        <p>
          Cleaning psychology explores why order and control affect mood. It is about stress, reward,
          and your brain's love of clear signals.
        </p>

        <h2>Order Gives Your Brain a Rest</h2>
        <p>
          Clutter creates low-level stress. Your brain keeps noticing the mess, even if you are not
          consciously thinking about it. When you clean, the noise drops.
        </p>

        <h3>Visual Load Matters</h3>
        <p>
          Every object in your field of view pulls a tiny bit of attention. Fewer objects mean fewer
          micro-decisions, which means more mental space.
        </p>

        <h2>The Reward Loop of Completion</h2>
        <p>
          Cleaning gives you a fast win. You can see the result. Your brain loves visible progress,
          and it rewards you with a hit of satisfaction.
        </p>

        <h2>Control in an Uncertain World</h2>
        <p>
          When life feels chaotic, cleaning gives you a pocket of control. It is a small, manageable
          task with clear boundaries. That sense of control can reduce anxiety.
        </p>

        <h2>Why Music Makes It Even Better</h2>
        <p>
          Music turns cleaning into a rhythm. It reduces friction and increases focus. It is a simple
          way to make the task feel less like a chore and more like a ritual.
        </p>

        <h2>How to Use Cleaning as a Mental Reset</h2>
        <p>Try this:</p>
        <ul>
          <li>Set a 10-minute timer.</li>
          <li>Pick one small area.</li>
          <li>Focus on clearing surfaces first.</li>
          <li>Stop when the timer ends.</li>
        </ul>
        <p>You get a win without burnout.</p>

        <h2>Conclusion</h2>
        <p>
          Cleaning feels good because it lowers visual stress, gives you control, and delivers a quick
          reward. It is not just about a tidy room - it is about a calmer mind.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>Studies show cluttered environments increase cortisol.</li>
          <li>Short cleaning bursts can improve mood within minutes.</li>
          <li>Visible progress activates reward pathways in the brain.</li>
        </ul>
      </>
    ),
  },
  "phantom-vibration-phenomenon": {
    title: "The Phantom Vibration Phenomenon: Why You Feel Your Phone Buzz",
    description:
      "You feel a phone buzz that never happened. Learn the psychology behind phantom vibrations and why they are so common.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You swear your phone buzzed. You reach for it. Nothing. You are not losing it - phantom
          vibrations are extremely common, especially in the age of constant notifications.
        </p>

        <h2>The Focus Keyword: phantom vibration</h2>
        <p>
          Phantom vibration is a sensory misfire caused by attention, expectation, and habit. Your
          brain is primed to detect alerts, so it sometimes invents one.
        </p>

        <h2>The Brain's Prediction Habit</h2>
        <p>
          Your brain predicts signals based on patterns. If you get many notifications, your brain
          starts expecting them. That expectation can trigger a false sensation.
        </p>

        <h2>Why It Feels So Real</h2>
        <p>
          The sensation is vague and brief, which makes it easy to misinterpret. Clothing pressure,
          muscle twitches, or slight movements can feel like a buzz.
        </p>

        <h2>Anxiety and Anticipation Make It Worse</h2>
        <p>
          If you are waiting for a message, you are more likely to feel phantom alerts. That is your
          brain on high alert, scanning for cues.
        </p>

        <h2>It's Not a Disorder</h2>
        <p>
          Phantom vibrations are not a diagnosis. They are a normal byproduct of modern life. The
          brain adapts quickly to habits, even digital ones.
        </p>

        <h2>How to Reduce It</h2>
        <p>If it bothers you:</p>
        <ul>
          <li>Turn off nonessential notifications.</li>
          <li>Change where you keep your phone.</li>
          <li>Take short breaks from your device.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>
          Phantom vibrations happen because your brain is tuned to your phone. It is a modern illusion,
          not a personal flaw. Changing habits can quiet it down.
        </p>

        <h2>Quick Recap</h2>
        <ul>
          <li>Phantom vibration is common and normal.</li>
          <li>Expectation and habit drive the sensation.</li>
          <li>Reducing notifications reduces false alerts.</li>
        </ul>
      </>
    ),
  },
  "hidden-bias-people-watching": {
    title: "The Hidden Bias in People Watching: Your Brain's Fast Judgments",
    description:
      "We judge strangers in seconds. Discover the psychology behind snap judgments and how to make them more accurate.",
    content: (
      <>
        <h2>Introduction</h2>
        <p>
          You see someone across the room and instantly form an opinion. It feels natural. It is
          also biased. Your brain is built to make fast judgments, and speed often beats accuracy.
        </p>

        <h2>The Focus Keyword: snap judgments</h2>
        <p>
          Snap judgments are quick impressions based on limited cues - like posture, facial
          expressions, and style. They help you navigate social life, but they can mislead you.
        </p>

        <h2>Why Your Brain Does This</h2>
        <p>
          Fast judgments save energy. They also helped our ancestors detect threats. The issue is
          that modern social life is more complex, and the same shortcuts can create unfair assumptions.
        </p>

        <h2>The Halo Effect</h2>
        <p>
          If someone looks confident or attractive, we often assume they are also competent or kind.
          That is the halo effect. It is powerful and mostly unconscious.
        </p>

        <h2>The Dangers of First Impressions</h2>
        <p>
          First impressions shape how we interpret later behavior. Once you decide someone is "cold,"
          you notice evidence that confirms it and miss evidence that doesn't.
        </p>

        <h2>How to Slow the Bias</h2>
        <p>You can't shut off snap judgments, but you can correct them:</p>
        <ul>
          <li><strong>Pause.</strong> Notice the first impression without acting on it.</li>
          <li><strong>Ask a new question.</strong> What might I be missing?</li>
          <li><strong>Collect more data.</strong> One conversation is not a full picture.</li>
        </ul>

        <h2>Why This Matters in Real Life</h2>
        <p>
          Snap judgments affect hiring, friendships, and even how we treat strangers. A small pause
          can reduce a big bias.
        </p>

        <h2>Conclusion</h2>
        <p>
          Your brain is fast, not always fair. Snap judgments are normal, but you can learn to soften
          their edge and see people more clearly.
        </p>

        <h2>Did You Know?</h2>
        <ul>
          <li>People form first impressions in under 100 milliseconds.</li>
          <li>Smiling faces are judged as more trustworthy, even when unrelated to behavior.</li>
          <li>Awareness alone reduces the strength of the halo effect.</li>
        </ul>
      </>
    ),
  },
};

const defaultArticleMeta = {
  image: "/images/article-hero.svg",
  imageAlt: "CurioSpark article illustration",
  readingTime: "6 min",
  dateLabel: "Feb 6, 2026",
  category: {
    name: "CurioSpark",
    href: "/articles",
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];

  if (!article) {
    return {
      title: "Article Not Found - CurioSpark",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} - CurioSpark`,
    description: article.description,
    openGraph: {
      title: `${article.title} - CurioSpark`,
      description: article.description,
      images: [defaultArticleMeta.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} - CurioSpark`,
      description: article.description,
      images: [defaultArticleMeta.image],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  const relatedItems = Object.keys(articles)
    .filter((slug) => slug !== params.slug)
    .slice(0, 3)
    .map((slug) => {
      const relatedArticle = articles[slug];
      return {
        slug,
        href: `/articles/${slug}`,
        title: relatedArticle.title,
        excerpt: relatedArticle.description,
        image: defaultArticleMeta.image,
        imageAlt: defaultArticleMeta.imageAlt,
        readingTime: defaultArticleMeta.readingTime,
        categoryLabel: defaultArticleMeta.category.name,
      };
    });

  return (
    <ArticleLayout
      title={article.title}
      excerpt={article.description}
      slug={params.slug}
      dateLabel={defaultArticleMeta.dateLabel}
      readingTime={defaultArticleMeta.readingTime}
      category={defaultArticleMeta.category}
      image={defaultArticleMeta.image}
      imageAlt={defaultArticleMeta.imageAlt}
      contentNode={article.content}
      relatedItems={relatedItems}
      relatedTitle="Related Articles"
      sharePath="/articles"
    />
  );
}
