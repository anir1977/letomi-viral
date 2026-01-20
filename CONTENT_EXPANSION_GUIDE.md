# Content Expansion Guidelines for CurioSpark

## Implemented Changes

### ✅ Technical Infrastructure (COMPLETED)
1. **Markdown Rendering**: Installed `react-markdown` and `remark-gfm`
2. **MarkdownContent Component**: Created with proper styling for all markdown elements
3. **Table of Contents Component**: Auto-generates from H2/H3 headings, mobile-responsive
4. **Post Page Updated**: Now uses MarkdownContent and TableOfContents components

### ✅ First Article Fully Expanded (EXAMPLE)
**"Your Brain Uses 20% of Your Body's Energy"**
- Expanded from ~200 words to ~1,100 words
- Added proper heading hierarchy (H2, H3)
- Expanded FAQs from 3 to 8 questions
- Included introduction, explanations, examples, and conclusion
- Added internal links to related articles
- Optimized for SEO and readability

## Pattern for Remaining Articles

### Content Structure Template

Every article should follow this structure:

```markdown
[Opening paragraph: Hook + key fact + context, 2-3 sentences]

## [Main Section Title]

[2-3 paragraphs explaining the concept]

### [Subsection if needed]

[Details, examples, or elaboration]

## [Why This Happens / The Science]

[Explanation of mechanisms, causes, or reasons]

### [Subsection with specific aspect]

[Detailed information]

## [Real-World Examples / Implications]

[Practical applications, relatable scenarios]

- Bullet point 1
- Bullet point 2
- Bullet point 3

## [How to Apply / Practical Takeaways]

[Actionable advice or interesting facts]

## [Additional Perspective - Optional]

[Historical context, evolutionary angle, or related research]

## Conclusion

[Summary + key takeaway + final thought]
```

### Target Metrics Per Article
- **Word Count**: 800-1,200 words
- **Paragraphs**: 2-4 sentences max each
- **Sections**: 5-7 H2 headings
- **Subsections**: 2-4 H3 headings
- **Lists**: 2-3 bulleted/numbered lists
- **Internal Links**: 2-3 contextual links
- **FAQs**: 6-8 questions

### FAQ Expansion Pattern

Transform from 3 basic FAQs to 6-8 comprehensive ones:

**Original FAQ (3)**:
1. Basic definition/why question
2. How it works
3. Practical tip

**Expanded FAQ (6-8)**:
1. Core concept (expanded)
2. Mechanism/process (more detail)
3. Practical application (expanded)
4. Common concern/myth
5. Comparison question
6. Advanced/related topic
7. Personal application
8. Optimization/improvement tip

### Example FAQ Expansion

**Before**:
```
Q: Why does X happen?
A: Because Y causes Z.
```

**After**:
```
Q: Why does X happen?
A: X happens because Y causes Z through a specific mechanism. This process involves [details], which explains why [elaboration]. For example, [real-world example]. This is significant because [importance].
```

## Priority Articles to Expand Next

### High Priority (Trending/Featured)
1. ✅ Brain Energy Consumption (DONE)
2. Placebo Effect Awareness (Featured - 21.7K views)
3. Honey Never Expires (Trending - 18.2K views)
4. Decision Fatigue & Hunger (Featured - 15.6K views)
5. Tongue Print Uniqueness (Trending - 15.3K views)

### Medium Priority (High Views)
6. Neuroplasticity Lifelong (18.9K views)
7. Octopus Three Hearts (13.9K views)
8. Morning Honesty (13.4K views)

### Standard Priority (All Others)
- Complete remaining 12 articles with same pattern

## SEO Optimization Checklist

For each article, ensure:

### Content SEO
- [ ] Strong opening paragraph with main keyword
- [ ] H2/H3 hierarchy properly structured  
- [ ] Target keyword in first H2
- [ ] Internal links with descriptive anchor text
- [ ] Natural keyword variations throughout
- [ ] Conclusion summarizes key points

### Technical SEO
- [ ] Proper markdown syntax
- [ ] Heading IDs for TOC linking
- [ ] Alt text on images (already done)
- [ ] Meta description in excerpt
- [ ] Reading time updated

### E-E-A-T Signals
- [ ] Expert explanation (Author Box)
- [ ] Real-world examples
- [ ] Scientific backing mentioned
- [ ] Practical takeaways
- [ ] FAQ addressing user intent
- [ ] Recent date showing freshness

## Content Writing Guidelines

### Tone & Style
- **Conversational**: Write like explaining to a curious friend
- **Clear**: One idea per paragraph
- **Engaging**: Use "you" and ask rhetorical questions
- **Accessible**: Explain technical terms simply
- **Factual**: No exaggeration, stick to science

### Sentence Structure
- **Vary length**: Mix short punchy sentences with longer explanatory ones
- **Active voice**: "Your brain uses energy" not "Energy is used by your brain"
- **Transitions**: Use "however," "additionally," "for example," etc.

### Paragraph Guidelines
- **Length**: 2-4 sentences maximum
- **Focus**: One main idea per paragraph
- **Flow**: Each paragraph leads logically to the next
- **White space**: Break up dense information

### Example Good Paragraph
```
Your brain's energy consumption is fascinating. Despite weighing only about three pounds, it burns through 20% of your daily calories. This means that even when you're sitting still, your brain is working as hard as your muscles do during moderate exercise. Pretty remarkable for an organ you can't even feel working.
```

## Internal Linking Strategy

### Link Placement
- **Natural**: Only where contextually relevant
- **Descriptive**: Use meaningful anchor text
- **Valuable**: Link adds value to reader
- **Balanced**: 2-3 links per article, not more

### Link Examples
❌ Bad: "Click here to learn more"
❌ Bad: "Read this article"
✅ Good: "how hunger affects decision-making"
✅ Good: "your brain's ability to rewire itself"

### Linking Opportunities
- Psychology ↔ Psychology (same category)
- Brain topics ↔ Cognitive topics
- Behavior ↔ Psychology
- Science ↔ Life Facts (when relevant)

## Next Steps

### Immediate Actions
1. Expand Placebo Effect article (Featured, high priority)
2. Expand Honey Never Expires (Trending, science category)
3. Expand Decision Fatigue article (Featured, behavior)
4. Update reading times for expanded articles
5. Test rendering on multiple articles

### Validation
1. Check markdown rendering on all updated articles
2. Verify TOC generates correctly
3. Ensure internal links work
4. Confirm FAQ schema displays properly
5. Test mobile responsiveness

### Performance Monitoring
- Page load time should remain <2s
- Core Web Vitals should stay green
- Build time should not significantly increase
- No JavaScript errors in console

## Status Tracking

### Completed (1/20)
- ✅ Brain Energy Consumption

### In Progress (0/20)
- ⏳ (Next: Placebo Effect)

### Pending (19/20)
- All other articles awaiting expansion

---

**Implementation Note**: Due to the large scale of this update (20 articles × ~1,000 words each), this document serves as the blueprint. The pattern established in Article #1 should be replicated across all articles while maintaining unique, relevant content for each topic.
